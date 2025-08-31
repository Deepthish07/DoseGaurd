import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Play, Pause, RotateCcw } from 'lucide-react';

export function VoiceInterface() {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const voicePrompts = [
    "Good morning! It's time for your Lisinopril. Please open compartment B-2.",
    "Reminder: You have missed your morning Lisinopril dose. The compartment is B-2.",
    "Excellent! You've taken your medication on time for 5 days straight.",
    "Your Metformin is ready in compartment A-1. Please take with food.",
    "Alert: Your medication adherence has improved this week. Well done!"
  ];

  const playVoicePrompt = (message: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      setCurrentMessage(message);
      setIsPlaying(true);
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.7;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const simulateListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setCurrentMessage("I heard: 'When is my next dose?' Your next Metformin dose is at 2:00 PM.");
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="voice-heading">
        <h2 id="voice-heading" className="text-3xl font-bold text-slate-900 mb-6">
          Voice Interface Control
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Voice Assistant</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8 bg-slate-50 rounded-lg">
                {isListening ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                      <Mic className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <p className="text-blue-600 font-medium">Listening...</p>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-blue-600 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <button
                      onClick={simulateListening}
                      className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                      aria-label="Start voice listening"
                    >
                      <Mic className="h-8 w-8 text-white" aria-hidden="true" />
                    </button>
                    <p className="text-slate-600 font-medium">Tap to speak</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={voiceEnabled}
                    onChange={(e) => setVoiceEnabled(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    aria-describedby="voice-enabled-description"
                  />
                  <span className="text-slate-700">Voice output enabled</span>
                </label>
                <button
                  onClick={stopVoice}
                  disabled={!isPlaying}
                  className="p-2 text-slate-600 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Stop voice playback"
                >
                  <MicOff className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Sample Voice Prompts</h3>
            <div className="space-y-3">
              {voicePrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-slate-700 text-sm flex-1 leading-relaxed">
                      "{prompt}"
                    </p>
                    <button
                      onClick={() => playVoicePrompt(prompt)}
                      disabled={isPlaying}
                      className="ml-3 p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={`Play voice prompt: ${prompt.substring(0, 50)}...`}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Play className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {currentMessage && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Volume2 className="h-5 w-5 text-blue-600 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Current Voice Output</h4>
                <p className="text-blue-800">{currentMessage}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="voice-settings-heading">
        <h3 id="voice-settings-heading" className="text-2xl font-bold text-slate-900 mb-4">
          Voice Customization
        </h3>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="voice-speed" className="block text-sm font-medium text-slate-700 mb-2">
                Speech Speed
              </label>
              <input
                type="range"
                id="voice-speed"
                min="0.5"
                max="2"
                step="0.1"
                defaultValue="0.7"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-describedby="voice-speed-description"
              />
              <p id="voice-speed-description" className="text-xs text-slate-600 mt-1">
                Adjust how fast the voice speaks
              </p>
            </div>
            
            <div>
              <label htmlFor="voice-volume" className="block text-sm font-medium text-slate-700 mb-2">
                Volume Level
              </label>
              <input
                type="range"
                id="voice-volume"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.8"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-describedby="voice-volume-description"
              />
              <p id="voice-volume-description" className="text-xs text-slate-600 mt-1">
                Control voice output volume
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}