
import React, { useState } from 'react';
import Homepage from '../components/Homepage';
import PracticeMode from '../components/PracticeMode';
import FormulaDash from '../components/FormulaDash';

const Index = () => {
  const [currentMode, setCurrentMode] = useState<'home' | 'practice' | 'dash'>('home');

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'practice':
        return <PracticeMode onBack={() => setCurrentMode('home')} />;
      case 'dash':
        return <FormulaDash onBack={() => setCurrentMode('home')} />;
      default:
        return <Homepage onModeSelect={setCurrentMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {renderCurrentMode()}
    </div>
  );
};

export default Index;
