import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PillboxStatus } from './components/PillboxStatus';
import { CaregiverAlerts } from './components/CaregiverAlerts';
import { VoiceInterface } from './components/VoiceInterface';
import { Settings } from './components/Settings';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'status':
        return <PillboxStatus />;
      case 'alerts':
        return <CaregiverAlerts />;
      case 'voice':
        return <VoiceInterface />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-slate-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main role="main" className="container mx-auto px-4 py-8">
          {renderContent()}
        </main>
      </div>
    </AccessibilityProvider>
  );
}

export default App;