import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  voiceReminders: boolean;
  hapticFeedback: boolean;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: true,
    largeText: true,
    voiceReminders: true,
    hapticFeedback: true,
    reducedMotion: false,
    screenReaderOptimized: true,
  });

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Apply accessibility changes to document
    if (key === 'largeText') {
      document.documentElement.style.fontSize = value ? '18px' : '16px';
    }
    
    if (key === 'highContrast') {
      document.documentElement.classList.toggle('high-contrast', value);
    }
    
    if (key === 'reducedMotion') {
      document.documentElement.style.setProperty(
        '--motion-preference', 
        value ? 'reduce' : 'auto'
      );
    }
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, announceToScreenReader }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}