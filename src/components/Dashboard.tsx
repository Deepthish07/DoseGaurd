import React from 'react';
import { MedicationCard } from './MedicationCard';
import { AdherenceChart } from './AdherenceChart';
import { TodaySchedule } from './TodaySchedule';

export function Dashboard() {
  const medications = [
    {
      id: 1,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      nextDose: '2:00 PM',
      compartment: 'A1',
      taken: true,
      brailleLabel: '⠍⠑⠞'
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      nextDose: '8:00 AM',
      compartment: 'B2',
      taken: false,
      brailleLabel: '⠇⠊⠎'
    },
    {
      id: 3,
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      nextDose: '10:00 PM',
      compartment: 'C3',
      taken: false,
      brailleLabel: '⠁⠞⠕'
    }
  ];

  return (
    <div className="space-y-8">
      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-3xl font-bold text-slate-900 mb-6">
          Today's Overview
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Doses Taken</p>
                <p className="text-3xl font-bold text-emerald-600">1/3</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-emerald-600 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Adherence Rate</p>
                <p className="text-3xl font-bold text-blue-600">87%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Next Dose</p>
                <p className="text-3xl font-bold text-amber-600">2:00 PM</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-labelledby="medications-heading">
          <h2 id="medications-heading" className="text-2xl font-bold text-slate-900 mb-4">
            Your Medications
          </h2>
          <div className="space-y-4">
            {medications.map((med) => (
              <MedicationCard key={med.id} medication={med} />
            ))}
          </div>
        </section>

        <section aria-labelledby="schedule-heading">
          <h2 id="schedule-heading" className="text-2xl font-bold text-slate-900 mb-4">
            Today's Schedule
          </h2>
          <TodaySchedule medications={medications} />
        </section>
      </div>

      <section aria-labelledby="adherence-heading" className="mt-8">
        <h2 id="adherence-heading" className="text-2xl font-bold text-slate-900 mb-4">
          7-Day Adherence Pattern
        </h2>
        <AdherenceChart />
      </section>
    </div>
  );
}