
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { formulas, Formula } from '../data/formulas';

interface FormulaDashProps {
  onBack: () => void;
}

interface FormulaBlock {
  id: number;
  formula: string;
  isCorrect: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

const FormulaDash = ({ onBack }: FormulaDashProps) => {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [playerY, setPlayerY] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState<Formula | null>(null);
  const [formulaBlocks, setFormulaBlocks] = useState<FormulaBlock[]>([]);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1.5);
  const [blocksClearedThisRound, setBlocksClearedThisRound] = useState(false);

  const generateQuestion = useCallback(() => {
    const randomFormula = formulas[Math.floor(Math.random() * formulas.length)];
    setCurrentQuestion(randomFormula);
    
    const blocks: FormulaBlock[] = [];
    const correctAnswer = randomFormula.options[randomFormula.correct];
    const wrongAnswers = randomFormula.options.filter((_, index) => index !== randomFormula.correct);
    
    // Add correct answer block
    blocks.push({
      id: 1,
      formula: correctAnswer,
      isCorrect: true,
      x: 120,
      y: 30 + Math.random() * 40,
      width: Math.max(200, correctAnswer.length * 8),
      height: 60
    });
    
    // Add wrong answer blocks with spacing
    wrongAnswers.forEach((answer, index) => {
      blocks.push({
        id: index + 2,
        formula: answer,
        isCorrect: false,
        x: 120 + (index + 1) * 300,
        y: 30 + Math.random() * 40,
        width: Math.max(200, answer.length * 8),
        height: 60
      });
    });
    
    setFormulaBlocks(blocks);
    setBlocksClearedThisRound(false);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFormulaBlocks(blocks => {
        const updatedBlocks = blocks.map(block => ({
          ...block,
          x: block.x - gameSpeed
        })).filter(block => block.x + block.width > -50);

        // Check if all blocks have moved off screen without collision
        if (updatedBlocks.length === 0 && !blocksClearedThisRound) {
          // Generate new question
          setTimeout(() => {
            generateQuestion();
          }, 100);
        }

        return updatedBlocks;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameState, gameSpeed, generateQuestion, blocksClearedThisRound]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setPlayerY(prev => Math.max(5, prev - 8));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setPlayerY(prev => Math.min(80, prev + 8));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  // Collision detection
  useEffect(() => {
    if (gameState !== 'playing' || blocksClearedThisRound) return;

    const playerLeft = 10;
    const playerRight = 18;
    const playerTop = playerY;
    const playerBottom = playerY + 8;

    formulaBlocks.forEach(block => {
      const blockLeft = block.x;
      const blockRight = block.x + (block.width / 5); // Convert percentage-based width
      const blockTop = block.y;
      const blockBottom = block.y + (block.height / 5); // Convert percentage-based height

      // Check collision with more precise detection
      if (
        playerRight > blockLeft &&
        playerLeft < blockRight &&
        playerBottom > blockTop &&
        playerTop < blockBottom &&
        block.x < 25 // Only check collision when block is near the player
      ) {
        setBlocksClearedThisRound(true);
        
        if (block.isCorrect) {
          setScore(prev => prev + 1);
          setGameSpeed(prev => prev + 0.3);
          setTimeout(() => {
            generateQuestion();
          }, 1000);
        } else {
          setGameState('lost');
        }
      }
    });
  }, [formulaBlocks, playerY, gameState, blocksClearedThisRound, generateQuestion]);

  const handleRestart = () => {
    setGameState('playing');
    setPlayerY(50);
    setBlocksClearedThisRound(false);
    generateQuestion();
    setGameSpeed(prev => prev + 0.2);
  };

  const handleNewGame = () => {
    setGameState('playing');
    setPlayerY(50);
    setScore(0);
    setGameSpeed(1.5);
    setBlocksClearedThisRound(false);
    generateQuestion();
  };

  if (gameState === 'won') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Correct!</h2>
          <p className="text-xl mb-6">Score: {score}</p>
          <div className="space-y-4">
            <button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Next Level
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'lost') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-red-400 via-purple-500 to-pink-600">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-6">Final Score: {score}</p>
          <div className="space-y-4">
            <button
              onClick={handleNewGame}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600">
      {/* Sky and Ground */}
      <div className="absolute inset-0">
        <div className="h-3/4 bg-gradient-to-b from-blue-300 to-blue-500"></div>
        <div className="h-1/4 bg-gradient-to-b from-green-400 to-green-600"></div>
      </div>

      {/* Clouds */}
      <div className="absolute top-10 left-10 w-16 h-8 bg-white/30 rounded-full"></div>
      <div className="absolute top-20 right-20 w-20 h-10 bg-white/20 rounded-full"></div>
      <div className="absolute top-32 left-1/3 w-12 h-6 bg-white/25 rounded-full"></div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all duration-200 text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="text-white font-bold text-lg">Score: {score}</div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="absolute top-16 left-4 right-4 z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mx-auto max-w-lg">
            <div className="text-white text-center">
              <div className="text-sm font-medium mb-2">{currentQuestion.category.toUpperCase()}</div>
              <div className="text-lg font-bold">{currentQuestion.question}</div>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="absolute inset-0 mt-32">
        {/* Player */}
        <div
          className="absolute w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-100 z-20"
          style={{
            left: '10%',
            top: `${playerY}%`,
            transform: 'translateY(-50%)'
          }}
        >
          🚀
        </div>

        {/* Formula Blocks */}
        {formulaBlocks.map(block => (
          <div
            key={block.id}
            className={`absolute p-3 rounded-xl shadow-lg text-xs font-mono text-white transition-all duration-100 ${
              block.isCorrect 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-red-500 to-pink-500'
            }`}
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              transform: 'translateY(-50%)',
              maxWidth: '300px',
              minWidth: '180px'
            }}
          >
            <div className="break-words text-center">
              {block.formula}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center text-white">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3">
          <div className="text-sm">Use ↑↓ arrow keys to move and collect the correct formula!</div>
        </div>
      </div>
    </div>
  );
};

export default FormulaDash;
