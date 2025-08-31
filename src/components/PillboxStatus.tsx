import React from 'react';
import { CompartmentGrid } from './CompartmentGrid';
import { SensorStatus } from './SensorStatus';
import { BatteryStatus } from './BatteryStatus';

export function PillboxStatus() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="status-heading">
        <h2 id="status-heading" className="text-3xl font-bold text-slate-900 mb-6">
          Pillbox Device Status
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BatteryStatus />
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Connectivity</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true"></div>
              <span className="text-emerald-600 font-medium">Connected</span>
            </div>
            <p className="text-slate-600 text-sm mt-1">Last sync: 2 minutes ago</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Voice System</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" aria-hidden="true"></div>
              <span className="text-emerald-600 font-medium">Active</span>
            </div>
            <p className="text-slate-600 text-sm mt-1">Voice clarity: Excellent</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="compartments-heading">
        <h2 id="compartments-heading" className="text-2xl font-bold text-slate-900 mb-4">
          Compartment Status
        </h2>
        <CompartmentGrid />
      </section>

      <section aria-labelledby="sensors-heading">
        <h2 id="sensors-heading" className="text-2xl font-bold text-slate-900 mb-4">
          Sensor Monitoring
        </h2>
        <SensorStatus />
      </section>
    </div>
  );
}