
import React from 'react';
import { Calculator, Gamepad2 } from 'lucide-react';

interface HomepageProps {
  onModeSelect: (mode: 'practice' | 'dash') => void;
}

const Homepage = ({ onModeSelect }: HomepageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center mb-12 animate-fade-in">
        <div className="mb-6 relative">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl mb-4 animate-scale-in">
            <Calculator className="w-10 h-10 text-purple-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
          Formula Master
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-md mx-auto">
          Master math formulas through practice and play!
        </p>
      </div>

      <div className="space-y-6 w-full max-w-md">
        <button
          onClick={() => onModeSelect('practice')}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <Calculator className="w-6 h-6" />
          <span className="text-lg">Practice Mode</span>
        </button>

        <button
          onClick={() => onModeSelect('dash')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <Gamepad2 className="w-6 h-6" />
          <span className="text-lg">Formula Dash</span>
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-blue-200 text-sm">
          Choose your learning adventure!
        </p>
      </div>
    </div>
  );
};

export default Homepage;
