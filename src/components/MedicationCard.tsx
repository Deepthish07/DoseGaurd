import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  compartment: string;
  taken: boolean;
  brailleLabel: string;
}

interface MedicationCardProps {
  medication: Medication;
}

export function MedicationCard({ medication }: MedicationCardProps) {
  const handleVoicePrompt = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${medication.name}, ${medication.dosage}, next dose at ${medication.nextDose}, compartment ${medication.compartment}`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
        medication.taken ? 'border-emerald-200' : 'border-slate-200'
      }`}
      role="article"
      aria-labelledby={`medication-${medication.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 id={`medication-${medication.id}`} className="text-xl font-bold text-slate-900 mb-1">
            {medication.name}
          </h3>
          <p className="text-slate-600 mb-2">{medication.dosage} • {medication.frequency}</p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">Compartment:</span>
              <span className="font-mono text-lg font-bold text-blue-600">
                {medication.compartment}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">Braille:</span>
              <span className="font-mono text-lg text-blue-600" aria-label={`Braille label: ${medication.brailleLabel}`}>
                {medication.brailleLabel}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          {medication.taken ? (
            <div className="flex items-center space-x-2 text-emerald-600">
              <CheckCircle className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Taken</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-amber-600">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Pending</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center space-x-2 text-slate-600">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>Next dose: {medication.nextDose}</span>
        </div>
        
        <button
          onClick={handleVoicePrompt}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Read aloud information for ${medication.name}`}
        >
          🔊 Read Aloud
        </button>
      </div>
    </div>
  );
}