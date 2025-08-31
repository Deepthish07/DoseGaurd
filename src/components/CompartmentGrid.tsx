import React from 'react';
import { Package, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export function CompartmentGrid() {
  const compartments = [
    { id: 'A1', medication: 'Metformin', pills: 8, status: 'taken', braille: '⠍⠑⠞', lastAccess: '12:00 PM' },
    { id: 'A2', medication: 'Empty', pills: 0, status: 'empty', braille: '⠑⠍⠏', lastAccess: 'Never' },
    { id: 'A3', medication: 'Empty', pills: 0, status: 'empty', braille: '⠑⠍⠏', lastAccess: 'Never' },
    { id: 'B1', medication: 'Empty', pills: 0, status: 'empty', braille: '⠑⠍⠏', lastAccess: 'Never' },
    { id: 'B2', medication: 'Lisinopril', pills: 12, status: 'overdue', braille: '⠇⠊⠎', lastAccess: 'Yesterday' },
    { id: 'B3', medication: 'Empty', pills: 0, status: 'empty', braille: '⠑⠍⠏', lastAccess: 'Never' },
    { id: 'C1', medication: 'Empty', pills: 0, status: 'empty', braille: '⠑⠍⠏', lastAccess: 'Never' },
    { id: 'C2', medication: 'Empty', pills: 0, status: 'empty', braille: '⠑⠍⠏', lastAccess: 'Never' },
    { id: 'C3', medication: 'Atorvastatin', pills: 15, status: 'scheduled', braille: '⠁⠞⠕', lastAccess: 'Never' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-amber-600" />;
      default:
        return <Package className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'border-emerald-300 bg-emerald-50';
      case 'overdue':
        return 'border-red-300 bg-red-50';
      case 'scheduled':
        return 'border-amber-300 bg-amber-50';
      default:
        return 'border-slate-300 bg-slate-50';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="grid grid-cols-3 gap-4" role="grid" aria-label="Pillbox compartments">
        {compartments.map((compartment) => (
          <div
            key={compartment.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-sm ${getStatusColor(compartment.status)}`}
            role="gridcell"
            aria-labelledby={`compartment-${compartment.id}`}
            tabIndex={0}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-lg font-bold text-slate-900">
                {compartment.id}
              </span>
              {getStatusIcon(compartment.status)}
            </div>
            
            <div id={`compartment-${compartment.id}`}>
              <p className="font-semibold text-slate-900 text-sm mb-1">
                {compartment.medication}
              </p>
              <p className="text-slate-600 text-xs mb-2">
                Pills: {compartment.pills}
              </p>
              <div className="text-xs text-slate-500">
                <p>Braille: {compartment.braille}</p>
                <p>Last access: {compartment.lastAccess}</p>
              </div>
            </div>
            
            {compartment.status === 'overdue' && (
              <div className="mt-3 px-2 py-1 bg-red-100 text-red-800 text-xs rounded text-center font-medium">
                OVERDUE
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm font-medium mb-2">
          📱 Haptic Feedback Status
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-600">Vibration: </span>
            <span className="font-semibold">Active</span>
          </div>
          <div>
            <span className="text-blue-600">Intensity: </span>
            <span className="font-semibold">Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
}