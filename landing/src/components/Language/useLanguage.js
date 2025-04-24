'use client';

import { useState } from 'react';

export function useLanguage() {
  const [activeLanguage, setActiveLanguage] = useState(0);
  
  // Define supported languages with flags
  const languages = [
    { name: 'Bangla', code: 'bd', flag: '🇧🇩' },
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'Spanish', code: 'es', flag: '🇪🇸' },
    { name: 'French', code: 'fr', flag: '🇫🇷' },
    { name: 'German', code: 'de', flag: '🇩🇪' },
    { name: 'Italian', code: 'it', flag: '🇮🇹' },
    { name: 'Portuguese', code: 'pt', flag: '🇵🇹' },
    { name: 'Russian', code: 'ru', flag: '🇷🇺' },
    { name: 'Japanese', code: 'ja', flag: '🇯🇵' },
    { name: 'Korean', code: 'ko', flag: '🇰🇷' },
    { name: 'Chinese', code: 'zh', flag: '🇨🇳' },
    { name: 'Arabic', code: 'ar', flag: '🇸🇦' },
    { name: 'Dutch', code: 'nl', flag: '🇳🇱' },
    { name: 'Hindi', code: 'hi', flag: '🇮🇳' },
    { name: 'Turkish', code: 'tr', flag: '🇹🇷' },
    { name: 'Polish', code: 'pl', flag: '🇵🇱' },
    { name: 'Swedish', code: 'sv', flag: '🇸🇪' },
    { name: 'Norwegian', code: 'no', flag: '🇳🇴' },
    { name: 'Finnish', code: 'fi', flag: '🇫🇮' },
    { name: 'Danish', code: 'da', flag: '🇩🇰' },
    { name: 'Czech', code: 'cs', flag: '🇨🇿' },
    { name: 'Greek', code: 'el', flag: '🇬🇷' },
    { name: 'Hebrew', code: 'he', flag: '🇮🇱' },
    { name: 'Thai', code: 'th', flag: '🇹🇭' },
    { name: 'Vietnamese', code: 'vi', flag: '🇻🇳' }
  ];

  return {
    languages,
    activeLanguage,
    setActiveLanguage
  };
}