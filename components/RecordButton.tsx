'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Save } from 'lucide-react';
import { Language, EncounterRecord } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';
import { formatDuration, requestMediaPermissions, saveToLocalStorage, loadFromLocalStorage } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface RecordButtonProps {
  language: Language;
  variant?: 'primary' | 'destructive';
  onRecordingSaved?: (record: EncounterRecord) => void;
}

export function RecordButton({ language, variant = 'primary', onRecordingSaved }: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [notes, setNotes] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartTime = useRef<number>(0);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    // Check for existing permission
    navigator.permissions?.query({ name: 'microphone' as PermissionName })
      .then(result => {
        setHasPermission(result.state === 'granted');
      })
      .catch(() => {
        // Fallback: assume permission needed
        setHasPermission(false);
      });

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!hasPermission) {
        const granted = await requestMediaPermissions();
        if (!granted) {
          alert(t.permissionDenied);
          return;
        }
        setHasPermission(true);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        setShowSaveDialog(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
      recordingStartTime.current = Date.now();
      setDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Failed to start recording:', error);
      alert(t.error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const saveRecording = () => {
    if (audioChunksRef.current.length === 0) return;

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const recordId = `record_${Date.now()}`;
    
    // Create encounter record
    const encounterRecord: EncounterRecord = {
      recordId,
      userId: 'current_user', // In a real app, this would come from auth
      timestamp: recordingStartTime.current,
      duration,
      notes: notes.trim() || undefined,
    };

    // Save to localStorage (in a real app, this would go to a backend)
    const existingRecords = loadFromLocalStorage<EncounterRecord[]>('encounter_records', []);
    existingRecords.push(encounterRecord);
    saveToLocalStorage('encounter_records', existingRecords);

    // Save audio blob (in a real app, this would be uploaded to cloud storage)
    const reader = new FileReader();
    reader.onload = () => {
      saveToLocalStorage(`audio_${recordId}`, reader.result);
    };
    reader.readAsDataURL(audioBlob);

    // Reset state
    setShowSaveDialog(false);
    setNotes('');
    setDuration(0);
    audioChunksRef.current = [];

    // Notify parent component
    onRecordingSaved?.(encounterRecord);

    alert(t.saved);
  };

  const cancelSave = () => {
    setShowSaveDialog(false);
    setNotes('');
    setDuration(0);
    audioChunksRef.current = [];
  };

  if (showSaveDialog) {
    return (
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white text-center">
          {t.saved} ({formatDuration(duration)})
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            {t.notes} (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t.addNotes}
            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={saveRecording}
            className="flex-1 btn-primary flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{t.saveRecording}</span>
          </button>
          <button
            onClick={cancelSave}
            className="flex-1 btn-secondary"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 text-center space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg',
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 recording-pulse' 
              : variant === 'primary'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-red-500 hover:bg-red-600'
          )}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-1">
            {isRecording ? t.recording : t.startRecording}
          </h3>
          {isRecording && (
            <p className="text-red-300 font-mono text-xl">
              {formatDuration(duration)}
            </p>
          )}
          {!isRecording && (
            <p className="text-gray-300 text-sm">
              {t.tapToStart}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
