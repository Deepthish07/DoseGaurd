import React from 'react';
import { Pill, Monitor, AlertTriangle, Mic, Settings as SettingsIcon } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'dashboard', label: 'Medication Dashboard', icon: Pill },
    { id: 'status', label: 'Pillbox Status', icon: Monitor },
    { id: 'alerts', label: 'Caregiver Alerts', icon: AlertTriangle },
    { id: 'voice', label: 'Voice Interface', icon: Mic },
    { id: 'settings', label: 'Accessibility Settings', icon: SettingsIcon },
  ];

  return (
    <header className="bg-blue-900 text-white shadow-lg" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-700 p-2 rounded-lg">
              <Pill className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">DoseGuard</h1>
              <p className="text-blue-200 text-sm">Smart Medication Management</p>
            </div>
          </div>
        </div>
        
        <nav role="navigation" aria-label="Main navigation">
          <ul className="flex flex-wrap -mb-px text-sm font-medium">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id} className="mr-2">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group transition-colors ${
                      activeTab === tab.id
                        ? 'text-white border-white bg-blue-800'
                        : 'text-blue-200 border-transparent hover:text-white hover:border-blue-300 hover:bg-blue-800'
                    }`}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                    aria-label={tab.label}
                  >
                    <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}