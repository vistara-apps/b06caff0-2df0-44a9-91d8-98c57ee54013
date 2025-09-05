import { StateGuide } from './types';

export const STATE_GUIDES: Record<string, StateGuide> = {
  CA: {
    stateCode: 'CA',
    title: 'California Rights Guide',
    rightsSummary: 'You have the right to remain silent, refuse searches, and record police interactions in California.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I do not consent to any searches.',
      'Am I free to leave?',
      'I would like to speak to a lawyer.'
    ],
    dontSay: [
      'I didn\'t do anything wrong.',
      'You can search if you want.',
      'I don\'t have anything to hide.',
      'Just a few questions won\'t hurt.'
    ],
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record police interactions',
      'Right to ask if you are free to leave',
      'Right to an attorney'
    ],
    emergencyContacts: [
      'ACLU of California: (415) 621-2493',
      'Legal Aid: 211',
      'Emergency: 911'
    ]
  },
  NY: {
    stateCode: 'NY',
    title: 'New York Rights Guide',
    rightsSummary: 'In New York, you have constitutional rights during police encounters including the right to remain silent and refuse searches.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I do not consent to any searches.',
      'Am I being detained or am I free to go?',
      'I want to speak to a lawyer.'
    ],
    dontSay: [
      'I was just...',
      'You can look through my stuff.',
      'I have nothing to hide.',
      'Let me explain what happened.'
    ],
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to ask if you are being detained',
      'Right to record in public spaces',
      'Right to legal representation'
    ],
    emergencyContacts: [
      'NYCLU: (212) 607-3300',
      'Legal Aid Society: (212) 577-3300',
      'Emergency: 911'
    ]
  },
  TX: {
    stateCode: 'TX',
    title: 'Texas Rights Guide',
    rightsSummary: 'Texas law protects your constitutional rights during police encounters, including the right to remain silent and refuse searches.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I do not consent to searches.',
      'Am I free to leave?',
      'I want to contact my attorney.'
    ],
    dontSay: [
      'I was only...',
      'Go ahead and search.',
      'I don\'t mind if you look.',
      'Let me tell you what really happened.'
    ],
    keyRights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to ask if you are free to leave',
      'Right to record police interactions',
      'Right to an attorney'
    ],
    emergencyContacts: [
      'ACLU of Texas: (713) 942-8146',
      'Texas Legal Aid: 211',
      'Emergency: 911'
    ]
  }
};

export const TRANSLATIONS = {
  en: {
    appTitle: 'Know Your Rights Card',
    startRecording: 'Start Recording',
    stopRecording: 'Stop Recording',
    whatToSay: 'What to Say',
    whatNotToSay: 'What to Not Say',
    yourRights: 'Your Rights',
    emergencyContacts: 'Emergency Contacts',
    shareCard: 'Share Card',
    language: 'Language',
    location: 'Location',
    recording: 'Recording...',
    saved: 'Saved',
    error: 'Error',
    permissionDenied: 'Permission denied',
    locationUnavailable: 'Location unavailable'
  },
  es: {
    appTitle: 'Tarjeta de Derechos',
    startRecording: 'Comenzar Grabación',
    stopRecording: 'Detener Grabación',
    whatToSay: 'Qué Decir',
    whatNotToSay: 'Qué No Decir',
    yourRights: 'Sus Derechos',
    emergencyContacts: 'Contactos de Emergencia',
    shareCard: 'Compartir Tarjeta',
    language: 'Idioma',
    location: 'Ubicación',
    recording: 'Grabando...',
    saved: 'Guardado',
    error: 'Error',
    permissionDenied: 'Permiso denegado',
    locationUnavailable: 'Ubicación no disponible'
  }
};

export const US_STATES = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
};
