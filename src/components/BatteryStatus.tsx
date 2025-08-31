import React from 'react';
import { Battery, BatteryLow } from 'lucide-react';

export function BatteryStatus() {
  const batteryLevel = 78;
  const isLow = batteryLevel < 20;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
        {isLow ? (
          <BatteryLow className="h-5 w-5 text-red-600" aria-hidden="true" />
        ) : (
          <Battery className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        )}
        <span>Battery Status</span>
      </h3>
      
      <div className="space-y-4">
        <div className="relative">
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isLow ? 'bg-red-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${batteryLevel}%` }}
              role="progressbar"
              aria-valuenow={batteryLevel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Battery level: ${batteryLevel}%`}
            />
          </div>
          <p className="text-center mt-2 font-semibold text-slate-900">
            {batteryLevel}%
          </p>
        </div>
        
        <div className="text-sm text-slate-600">
          <p>Estimated time remaining: 5 days</p>
          <p>Last charged: 3 days ago</p>
        </div>
        
        {isLow && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium">
              ⚠️ Low battery! Please charge your DoseGuard device.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}