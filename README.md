# Know Your Rights Card - Base Mini App

A mobile-first application that provides instant, state-specific legal rights information and police encounter recording tools, built as a Base Mini App.

## Features

- **State-Specific Rights Guides**: Automatically detects user location and displays relevant legal information
- **Quick Record Button**: Instant audio recording with secure local storage
- **Multilingual Support**: Available in English and Spanish
- **Location-Based Content**: Auto-selects appropriate state guide based on GPS location
- **Shareable Encounter Cards**: Generate and share encounter summaries
- **Mobile-First Design**: Optimized for mobile devices with responsive layout

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network via OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout
- **Storage**: Local storage for recordings and user preferences

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Add your OnchainKit API key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## Core Components

### StateGuideCard
Displays state-specific legal rights information with expandable sections for:
- What to say during police encounters
- What NOT to say
- Key constitutional rights
- Emergency contacts

### RecordButton
Provides one-tap audio recording functionality with:
- Permission handling
- Real-time duration display
- Secure local storage
- Optional note-taking

### LanguageSwitcher
Toggles between English and Spanish translations for:
- All UI text
- Legal guidance
- Rights information

### LocationDisplay
Shows current location and enables:
- Automatic state detection
- Manual location refresh
- Privacy-conscious GPS usage

## Data Model

### User
- `userId`: Unique identifier
- `farcasterId`: Optional Farcaster profile link
- `savedState`: User's preferred state
- `subscriptionStatus`: Free or premium tier

### StateGuide
- `stateCode`: Two-letter state abbreviation
- `title`: Display name for the guide
- `rightsSummary`: Overview of key rights
- `doSay`: Array of recommended phrases
- `dontSay`: Array of phrases to avoid
- `keyRights`: List of constitutional rights
- `emergencyContacts`: Relevant legal aid contacts

### EncounterRecord
- `recordId`: Unique recording identifier
- `userId`: Associated user
- `timestamp`: Recording start time
- `duration`: Length in seconds
- `filePath`: Storage location (local)
- `notes`: Optional user notes
- `location`: GPS coordinates and state

## Privacy & Security

- **Local Storage**: All recordings stored locally on device
- **No Cloud Upload**: Audio never leaves the user's device
- **Permission-Based**: Requires explicit user consent for location and microphone
- **Minimal Data**: Only essential information is collected

## Legal Disclaimer

This app is for educational purposes only and does not constitute legal advice. Users should consult with qualified attorneys for specific legal guidance. The information provided may not reflect the most current legal developments.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions:
- Create an issue on GitHub
- Contact: support@knowyourrightscard.com

Built with ❤️ on Base Network
