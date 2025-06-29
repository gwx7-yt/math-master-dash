
import React from 'react';
import { Calculator, Gamepad2, Sparkles, Trophy } from 'lucide-react';

interface HomepageProps {
  onModeSelect: (mode: 'practice' | 'dash') => void;
}

const Homepage = ({ onModeSelect }: HomepageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-300/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Floating Math Symbols */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 text-white/20 text-4xl font-bold animate-pulse">∑</div>
        <div className="absolute top-1/2 right-1/6 text-white/20 text-3xl font-bold animate-pulse delay-500">π</div>
        <div className="absolute bottom-1/4 left-1/3 text-white/20 text-5xl font-bold animate-pulse delay-1000">∆</div>
        <div className="absolute top-1/6 right-1/3 text-white/20 text-3xl font-bold animate-pulse delay-700">∞</div>
      </div>

      <div className="text-center mb-12 animate-fade-in relative z-10">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-2xl mb-6 animate-scale-in relative">
            <Calculator className="w-12 h-12 text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          Formula Master
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Master 20 essential math formulas through interactive practice and exciting gameplay!
        </p>
      </div>

      <div className="space-y-8 w-full max-w-lg relative z-10">
        <button
          onClick={() => onModeSelect('practice')}
          className="group w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-500 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center space-x-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Calculator className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <div className="text-left">
            <div className="text-xl font-bold">Practice Mode</div>
            <div className="text-sm opacity-90">Learn step by step</div>
          </div>
          <Trophy className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <button
          onClick={() => onModeSelect('dash')}
          className="group w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center space-x-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Gamepad2 className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <div className="text-left">
            <div className="text-xl font-bold">Formula Dash</div>
            <div className="text-sm opacity-90">High-speed challenge</div>
          </div>
          <Sparkles className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      <div className="mt-12 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-lg">
          <p className="text-blue-200 text-lg font-medium mb-2">🎯 20 Essential Formulas</p>
          <p className="text-blue-100 text-sm">
            Trigonometry • Algebra • Identities • Conversions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
