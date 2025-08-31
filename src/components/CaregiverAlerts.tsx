import React, { useState } from 'react';
import { AlertTriangle, Bell, Phone, Mail, CheckCircle, Clock, User } from 'lucide-react';

export function CaregiverAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'missed',
      message: 'Lisinopril dose missed this morning',
      time: '2 hours ago',
      severity: 'high',
      acknowledged: false,
      patient: 'Eleanor Thompson'
    },
    {
      id: 2,
      type: 'adherence',
      message: 'Adherence rate dropped to 75% this week',
      time: '1 day ago',
      severity: 'medium',
      acknowledged: false,
      patient: 'Eleanor Thompson'
    },
    {
      id: 3,
      type: 'refill',
      message: 'Metformin running low (3 pills remaining)',
      time: '2 days ago',
      severity: 'low',
      acknowledged: true,
      patient: 'Eleanor Thompson'
    }
  ]);

  const acknowledgeAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-300 bg-red-50';
      case 'medium':
        return 'border-amber-300 bg-amber-50';
      case 'low':
        return 'border-blue-300 bg-blue-50';
      default:
        return 'border-slate-300 bg-slate-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'low':
        return <Bell className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="alerts-heading">
        <h2 id="alerts-heading" className="text-3xl font-bold text-slate-900 mb-6">
          Caregiver Alert Center
        </h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-slate-600 text-sm">Active Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">87%</div>
              <div className="text-slate-600 text-sm">Weekly Adherence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-slate-600 text-sm">Patient</div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="patient-info-heading">
        <h3 id="patient-info-heading" className="text-xl font-bold text-slate-900 mb-4">
          Patient Information
        </h3>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-900">Eleanor Thompson</h4>
              <p className="text-slate-600">Age: 78 • Visually Impaired</p>
              <p className="text-slate-600 text-sm">Emergency Contact: (555) 123-4567</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="alerts-list-heading">
        <h3 id="alerts-list-heading" className="text-xl font-bold text-slate-900 mb-4">
          Recent Alerts
        </h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${getSeverityColor(alert.severity)} ${
                alert.acknowledged ? 'opacity-60' : 'hover:shadow-md'
              }`}
              role="alert"
              aria-labelledby={`alert-${alert.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1">
                    <p id={`alert-${alert.id}`} className="font-semibold text-slate-900 mb-1">
                      {alert.message}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span>{alert.time}</span>
                      <span>Patient: {alert.patient}</span>
                      <span className="capitalize">Severity: {alert.severity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {alert.acknowledged ? (
                    <div className="flex items-center space-x-2 text-emerald-600">
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm font-medium">Acknowledged</span>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="bg-slate-600 text-white px-3 py-1 rounded-md text-sm hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        aria-label={`Acknowledge alert: ${alert.message}`}
                      >
                        Acknowledge
                      </button>
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Call patient"
                      >
                        <Phone className="h-3 w-3" />
                      </button>
                      <button
                        className="bg-emerald-600 text-white px-3 py-1 rounded-md text-sm hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        aria-label="Send message"
                      >
                        <Mail className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}