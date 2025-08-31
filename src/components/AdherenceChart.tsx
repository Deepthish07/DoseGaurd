import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function AdherenceChart() {
  const weeklyData = [
    { day: 'Mon', adherence: 100, taken: 3, total: 3 },
    { day: 'Tue', adherence: 67, taken: 2, total: 3 },
    { day: 'Wed', adherence: 100, taken: 3, total: 3 },
    { day: 'Thu', adherence: 100, taken: 3, total: 3 },
    { day: 'Fri', adherence: 67, taken: 2, total: 3 },
    { day: 'Sat', adherence: 100, taken: 3, total: 3 },
    { day: 'Sun', adherence: 33, taken: 1, total: 3 },
  ];

  const weeklyAverage = Math.round(
    weeklyData.reduce((sum, day) => sum + day.adherence, 0) / weeklyData.length
  );

  const trend = weeklyAverage >= 85 ? 'improving' : 'declining';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-slate-600 text-sm">Weekly Average</p>
          <p className="text-3xl font-bold text-blue-600">{weeklyAverage}%</p>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
          trend === 'improving' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
        }`}>
          {trend === 'improving' ? (
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="font-medium text-sm capitalize">{trend}</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex items-end justify-between space-x-2 h-48">
          {weeklyData.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-600 rounded-t-md transition-all duration-500 hover:bg-blue-700"
                style={{ height: `${day.adherence * 1.5}px` }}
                role="img"
                aria-label={`${day.day}: ${day.adherence}% adherence, ${day.taken} of ${day.total} doses taken`}
              />
              <div className="mt-3 text-center">
                <p className="text-slate-900 font-semibold text-sm">{day.day}</p>
                <p className="text-slate-600 text-xs">{day.adherence}%</p>
                <p className="text-slate-500 text-xs">{day.taken}/{day.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-2">AI Insights</h4>
        <p className="text-slate-700 text-sm leading-relaxed">
          Your adherence pattern shows you're most consistent on weekdays. Consider setting additional 
          reminders for weekend doses. The system has adjusted voice tone to be more encouraging 
          based on your recent improvement.
        </p>
      </div>
    </div>
  );
}