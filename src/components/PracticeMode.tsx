
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { formulas, Formula } from '../data/formulas';

interface PracticeModeProps {
  onBack: () => void;
}

const PracticeMode = ({ onBack }: PracticeModeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledFormulas, setShuffledFormulas] = useState<Formula[]>([]);

  useEffect(() => {
    // Shuffle formulas on component mount
    const shuffled = [...formulas].sort(() => Math.random() - 0.5);
    setShuffledFormulas(shuffled);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === shuffledFormulas[currentQuestion]?.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < shuffledFormulas.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    const shuffled = [...formulas].sort(() => Math.random() - 0.5);
    setShuffledFormulas(shuffled);
  };

  if (shuffledFormulas.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  const isLastQuestion = currentQuestion === shuffledFormulas.length - 1;
  const currentFormula = shuffledFormulas[currentQuestion];

  if (isLastQuestion && showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Great job!</h2>
          <p className="text-xl mb-6">
            You scored {score} out of {shuffledFormulas.length}!
          </p>
          <div className="space-y-4">
            <button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="text-center">
          <div className="text-sm text-blue-200">Question {currentQuestion + 1} of {shuffledFormulas.length}</div>
          <div className="text-sm text-blue-200">Score: {score}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / shuffledFormulas.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-sm font-medium mb-4">
              {currentFormula.category.toUpperCase()}
            </div>
            <h2 className="text-xl font-bold mb-6">{currentFormula.question}</h2>
          </div>

          <div className="space-y-4">
            {currentFormula.options.map((option, index) => {
              let buttonClass = "w-full p-4 rounded-xl font-medium text-left transition-all duration-200 ";
              
              if (!showResult) {
                buttonClass += "bg-white/20 hover:bg-white/30 hover:scale-105";
              } else {
                if (index === currentFormula.correct) {
                  buttonClass += "bg-green-500 text-white";
                } else if (index === selectedAnswer) {
                  buttonClass += "bg-red-500 text-white";
                } else {
                  buttonClass += "bg-white/10 text-white/60";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <span className="block text-sm font-mono">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {showResult && !isLastQuestion && (
            <button
              onClick={handleNext}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;
