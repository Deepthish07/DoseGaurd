import React, { useState } from 'react';
import { Toggle } from './Toggle';
import { Palette, Volume2, Vibrate, Clock, Eye, Headphones, Play } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    highContrast: true,
    largeText: true,
    voiceReminders: true,
    hapticFeedback: true,
    reducedMotion: false,
    screenReaderOptimized: true,
    adaptiveTone: true,
    emergencyContacts: true,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const voicePrompts = [
    "It's time for your morning medication. Please take your blood pressure pill from compartment A.",
    "Good job! You've been consistent with your medication schedule this week.",
    "Reminder: Your evening dose is due in 15 minutes. Compartment C contains your heart medication.",
    "Alert: You missed your afternoon dose. Please take it now if it's safe to do so.",
    "Your medication adherence is excellent this month. Keep up the great work!"
  ];

  const playVoicePrompt = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="settings-heading">
        <h2 id="settings-heading" className="text-3xl font-bold text-slate-900 mb-6">
          Accessibility Settings
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span>Visual Accessibility</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="high-contrast" className="font-medium text-slate-700">
                    High Contrast Mode
                  </label>
                  <p className="text-slate-600 text-sm">Enhanced colors for better visibility</p>
                </div>
                <Toggle
                  id="high-contrast"
                  checked={settings.highContrast}
                  onChange={(checked) => updateSetting('highContrast', checked)}
                  ariaLabel="Enable high contrast mode"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="large-text" className="font-medium text-slate-700">
                    Large Text
                  </label>
                  <p className="text-slate-600 text-sm">Increase font size for readability</p>
                </div>
                <Toggle
                  id="large-text"
                  checked={settings.largeText}
                  onChange={(checked) => updateSetting('largeText', checked)}
                  ariaLabel="Enable large text"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="reduced-motion" className="font-medium text-slate-700">
                    Reduced Motion
                  </label>
                  <p className="text-slate-600 text-sm">Minimize animations and transitions</p>
                </div>
                <Toggle
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onChange={(checked) => updateSetting('reducedMotion', checked)}
                  ariaLabel="Enable reduced motion"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Headphones className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span>Audio & Haptic</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="voice-reminders" className="font-medium text-slate-700">
                    Voice Reminders
                  </label>
                  <p className="text-slate-600 text-sm">Spoken medication alerts</p>
                </div>
                <Toggle
                  id="voice-reminders"
                  checked={settings.voiceReminders}
                  onChange={(checked) => updateSetting('voiceReminders', checked)}
                  ariaLabel="Enable voice reminders"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="haptic-feedback" className="font-medium text-slate-700">
                    Haptic Feedback
                  </label>
                  <p className="text-slate-600 text-sm">Physical vibration alerts</p>
                </div>
                <Toggle
                  id="haptic-feedback"
                  checked={settings.hapticFeedback}
                  onChange={(checked) => updateSetting('hapticFeedback', checked)}
                  ariaLabel="Enable haptic feedback"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="adaptive-tone" className="font-medium text-slate-700">
                    Adaptive Voice Tone
                  </label>
                  <p className="text-slate-600 text-sm">Voice tone adjusts based on adherence</p>
                </div>
                <Toggle
                  id="adaptive-tone"
                  checked={settings.adaptiveTone}
                  onChange={(checked) => updateSetting('adaptiveTone', checked)}
                  ariaLabel="Enable adaptive voice tone"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="voice-demo-heading">
        <h3 id="voice-demo-heading" className="text-2xl font-bold text-slate-900 mb-4">
          Voice Interface Demo
        </h3>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Sample Voice Prompts</h4>
              <div className="space-y-2">
                {voicePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => playVoicePrompt(prompt)}
                    disabled={isPlaying}
                    className="w-full text-left p-3 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Play voice prompt ${index + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 text-sm">{prompt}</span>
                      <Play className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Voice Controls</h4>
              <div className="space-y-3">
                <button
                  onClick={() => playVoicePrompt("DoseGuard voice interface is ready. Say 'help' for available commands.")}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Test Voice Output
                </button>
                
                <button
                  onClick={stopVoice}
                  disabled={!isPlaying}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Stop Voice
                </button>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">Voice Commands</h5>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>"What's my next dose?"</li>
                    <li>"Read my schedule"</li>
                    <li>"Repeat last message"</li>
                    <li>"Call my caregiver"</li>
                    <li>"Emergency help"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="emergency-heading">
        <h3 id="emergency-heading" className="text-2xl font-bold text-slate-900 mb-4">
          Emergency Contacts
        </h3>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div>
                <p className="font-semibold text-emerald-900">Primary Caregiver</p>
                <p className="text-emerald-700">Sarah Thompson - (555) 123-4567</p>
              </div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Call Now
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-semibold text-blue-900">Doctor</p>
                <p className="text-blue-700">Dr. Martinez - (555) 987-6543</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}