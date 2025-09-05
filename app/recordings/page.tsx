'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { Language, EncounterRecord } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/constants';
import { loadFromLocalStorage, saveToLocalStorage, formatDuration } from '@/lib/utils';
import { ArrowLeft, Play, Pause, Download, Trash2, FileAudio, Calendar, MapPin, Clock, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function RecordingsPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [recordings, setRecordings] = useState<EncounterRecord[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const savedLanguage = loadFromLocalStorage<Language>('preferred_language', 'en');
    const savedRecordings = loadFromLocalStorage<EncounterRecord[]>('encounter_records', []);
    
    setLanguage(savedLanguage);
    setRecordings(savedRecordings.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  const deleteRecording = (recordId: string) => {
    if (confirm('Are you sure you want to delete this recording?')) {
      const updatedRecordings = recordings.filter(r => r.recordId !== recordId);
      setRecordings(updatedRecordings);
      saveToLocalStorage('encounter_records', updatedRecordings);
      
      // Also remove the audio data
      localStorage.removeItem(`audio_${recordId}`);
    }
  };

  const downloadRecording = (recordId: string) => {
    const audioData = localStorage.getItem(`audio_${recordId}`);
    if (audioData) {
      const link = document.createElement('a');
      link.href = audioData;
      link.download = `recording_${recordId}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const playRecording = (recordId: string) => {
    const audioData = localStorage.getItem(`audio_${recordId}`);
    if (audioData) {
      if (playingId === recordId) {
        setPlayingId(null);
        // Stop audio playback
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => audio.pause());
      } else {
        setPlayingId(recordId);
        const audio = new Audio(audioData);
        audio.play();
        audio.onended = () => setPlayingId(null);
      }
    }
  };

  const saveNotes = (recordId: string) => {
    const updatedRecordings = recordings.map(r => 
      r.recordId === recordId ? { ...r, notes: editNotes.trim() || undefined } : r
    );
    setRecordings(updatedRecordings);
    saveToLocalStorage('encounter_records', updatedRecordings);
    setEditingId(null);
    setEditNotes('');
  };

  const startEditing = (record: EncounterRecord) => {
    setEditingId(record.recordId);
    setEditNotes(record.notes || '');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppShell variant="glass">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="flex items-center space-x-2">
            <FileAudio className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-bold text-white">{t.recordings}</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-white">{recordings.length}</p>
            <p className="text-gray-300 text-sm">Total {t.recordings}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-white">
              {Math.round(recordings.reduce((acc, r) => acc + r.duration, 0) / 60)}m
            </p>
            <p className="text-gray-300 text-sm">Total Duration</p>
          </div>
        </div>

        {/* Recordings List */}
        {recordings.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <FileAudio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Recordings Yet</h3>
            <p className="text-gray-300">
              Start recording encounters to see them here
            </p>
            <Link 
              href="/" 
              className="inline-block mt-4 btn-primary"
            >
              Start Recording
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recordings.map((record) => (
              <div key={record.recordId} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-300" />
                      <span className="text-white font-medium">
                        {formatDate(record.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(record.duration)}</span>
                      </div>
                      
                      {record.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{record.location.state}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => playRecording(record.recordId)}
                      className="p-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-all"
                    >
                      {playingId === record.recordId ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => downloadRecording(record.recordId)}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all"
                    >
                      <Download className="w-4 h-4 text-white" />
                    </button>
                    
                    <button
                      onClick={() => startEditing(record)}
                      className="p-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all"
                    >
                      <Edit3 className="w-4 h-4 text-white" />
                    </button>
                    
                    <button
                      onClick={() => deleteRecording(record.recordId)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Notes Section */}
                {editingId === record.recordId ? (
                  <div className="space-y-3">
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder={t.addNotes}
                      className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveNotes(record.recordId)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditNotes('');
                        }}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : record.notes ? (
                  <div className="mt-3 p-3 bg-white bg-opacity-5 rounded-lg">
                    <p className="text-gray-300 text-sm font-medium mb-1">{t.notes}:</p>
                    <p className="text-white text-sm">{record.notes}</p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button
                      onClick={() => startEditing(record)}
                      className="text-purple-300 hover:text-purple-200 text-sm flex items-center space-x-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Add notes</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-gray-400 text-xs">
            {t.educationalPurpose}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
