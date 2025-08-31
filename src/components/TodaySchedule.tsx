import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

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

interface TodayScheduleProps {
  medications: Medication[];
}

export function TodaySchedule({ medications }: TodayScheduleProps) {
  const schedule = [
    { time: '8:00 AM', medication: 'Lisinopril', status: 'missed', compartment: 'B2' },
    { time: '12:00 PM', medication: 'Metformin', status: 'taken', compartment: 'A1' },
    { time: '2:00 PM', medication: 'Metformin', status: 'upcoming', compartment: 'A1' },
    { time: '6:00 PM', medication: 'Metformin', status: 'upcoming', compartment: 'A1' },
    { time: '10:00 PM', medication: 'Atorvastatin', status: 'upcoming', compartment: 'C3' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle className="h-5 w-5 text-emerald-600" aria-label="Taken" />;
      case 'missed':
        return <XCircle className="h-5 w-5 text-red-600" aria-label="Missed" />;
      case 'upcoming':
        return <Clock className="h-5 w-5 text-amber-600" aria-label="Upcoming" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-400" aria-label="Unknown" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-emerald-50 border-emerald-200';
      case 'missed':
        return 'bg-red-50 border-red-200';
      case 'upcoming':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="space-y-3">
        {schedule.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${getStatusColor(item.status)}`}
            role="listitem"
            aria-labelledby={`schedule-${index}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <p id={`schedule-${index}`} className="font-semibold text-slate-900">
                    {item.time}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {item.medication} • Compartment {item.compartment}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  item.status === 'taken' ? 'bg-emerald-100 text-emerald-800' :
                  item.status === 'missed' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}