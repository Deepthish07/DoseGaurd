import React from 'react';
import { Activity, Weight, DoorOpen } from 'lucide-react';

export function SensorStatus() {
  const sensors = [
    {
      name: 'Load Cell Sensors',
      icon: Weight,
      status: 'active',
      description: 'Detecting pill removal',
      readings: [
        { compartment: 'A1', weight: '2.3g', change: '-0.5g' },
        { compartment: 'B2', weight: '3.1g', change: '0g' },
        { compartment: 'C3', weight: '4.2g', change: '0g' },
      ]
    },
    {
      name: 'Hall Effect Sensors',
      icon: DoorOpen,
      status: 'active',
      description: 'Monitoring lid access',
      readings: [
        { compartment: 'A1', status: 'Closed', lastOpened: '12:00 PM' },
        { compartment: 'B2', status: 'Closed', lastOpened: 'Yesterday' },
        { compartment: 'C3', status: 'Closed', lastOpened: 'Never' },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sensors.map((sensor) => {
        const Icon = sensor.icon;
        return (
          <div key={sensor.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{sensor.name}</h3>
                <p className="text-slate-600 text-sm">{sensor.description}</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true"></div>
                  <span className="text-emerald-600 text-sm font-medium">Active</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {sensor.readings.map((reading, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                  aria-labelledby={`sensor-${sensor.name}-${index}`}
                >
                  <span id={`sensor-${sensor.name}-${index}`} className="font-mono font-semibold text-slate-900">
                    {reading.compartment}
                  </span>
                  <div className="text-right text-sm">
                    {'weight' in reading ? (
                      <>
                        <p className="text-slate-900 font-semibold">{reading.weight}</p>
                        <p className="text-slate-600">Change: {reading.change}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-slate-900 font-semibold">{reading.status}</p>
                        <p className="text-slate-600">Last: {reading.lastOpened}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}