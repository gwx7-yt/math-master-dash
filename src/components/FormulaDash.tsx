
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Star, Zap } from 'lucide-react';
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
  speed: number;
}

const FormulaDash = ({ onBack }: FormulaDashProps) => {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [playerY, setPlayerY] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState<Formula | null>(null);
  const [formulaBlocks, setFormulaBlocks] = useState<FormulaBlock[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameSpeed, setGameSpeed] = useState(0.8); // Much slower initial speed
  const [nextBlockId, setNextBlockId] = useState(1);

  // Generate new question and blocks
  const generateQuestion = useCallback(() => {
    const randomFormula = formulas[Math.floor(Math.random() * formulas.length)];
    setCurrentQuestion(randomFormula);
    
    const blocks: FormulaBlock[] = [];
    const correctAnswer = randomFormula.options[randomFormula.correct];
    
    // Add correct answer block at random height with more spacing
    blocks.push({
      id: nextBlockId,
      formula: correctAnswer,
      isCorrect: true,
      x: 120,
      y: 20 + Math.random() * 60,
      speed: gameSpeed
    });

    // Add 2 wrong answer blocks with much more spacing
    const wrongAnswers = randomFormula.options.filter((_, index) => index !== randomFormula.correct);
    wrongAnswers.slice(0, 2).forEach((answer, index) => {
      blocks.push({
        id: nextBlockId + index + 1,
        formula: answer,
        isCorrect: false,
        x: 120 + (index + 1) * 80 + Math.random() * 40, // More spacing between blocks
        y: 20 + Math.random() * 60,
        speed: gameSpeed
      });
    });
    
    setFormulaBlocks(blocks);
    setNextBlockId(prev => prev + 4);
  }, [gameSpeed, nextBlockId]);

  // Initialize game
  useEffect(() => {
    if (gameState === 'playing') {
      generateQuestion();
    }
  }, [generateQuestion, gameState]);

  // Game loop - move blocks and handle collisions (much slower)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFormulaBlocks(prevBlocks => {
        const updatedBlocks = prevBlocks.map(block => ({
          ...block,
          x: block.x - block.speed
        }));

        // Check for collisions
        const playerLeft = 8;
        const playerRight = 18;
        const playerTop = playerY - 4;
        const playerBottom = playerY + 4;

        let collision = false;
        let correctHit = false;

        updatedBlocks.forEach(block => {
          const blockLeft = block.x;
          const blockRight = block.x + 25;
          const blockTop = block.y - 3;
          const blockBottom = block.y + 3;

          // Check collision
          if (
            playerRight > blockLeft &&
            playerLeft < blockRight &&
            playerBottom > blockTop &&
            playerTop < blockBottom &&
            !collision
          ) {
            collision = true;
            if (block.isCorrect) {
              correctHit = true;
            }
          }
        });

        if (collision) {
          if (correctHit) {
            setScore(prev => prev + 1);
            setGameSpeed(prev => prev + 0.1); // Much smaller speed increase
            setTimeout(() => generateQuestion(), 1000); // Longer pause after correct answer
            return [];
          } else {
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameState('lost');
              }
              return newLives;
            });
            setTimeout(() => generateQuestion(), 1500); // Longer pause after wrong answer
            return [];
          }
        }

        // Remove blocks that are off screen and generate new ones
        const visibleBlocks = updatedBlocks.filter(block => block.x > -30);
        if (visibleBlocks.length === 0) {
          setTimeout(() => generateQuestion(), 1000); // Longer pause between questions
        }

        return visibleBlocks;
      });
    }, 32); // Slower game loop (was 16ms, now 32ms)

    return () => clearInterval(gameLoop);
  }, [gameState, playerY, gameSpeed, generateQuestion]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      event.preventDefault();
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setPlayerY(prev => Math.max(10, prev - 3)); // Slower movement
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setPlayerY(prev => Math.min(85, prev + 3)); // Slower movement
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  const handleRestart = () => {
    setGameState('playing');
    setPlayerY(50);
    setScore(0);
    setLives(3);
    setGameSpeed(0.8); // Reset to slower initial speed
    setNextBlockId(1);
  };

  if (gameState === 'lost') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-red-500 via-purple-600 to-pink-600">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <div className="mb-6">
            <p className="text-xl mb-2">Final Score: {score}</p>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < score ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleRestart}
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-400 via-blue-500 to-blue-600">
      {/* Animated Sky Background */}
      <div className="absolute inset-0">
        <div className="h-3/4 bg-gradient-to-b from-sky-300 to-blue-500 relative">
          {/* Animated Clouds */}
          <div className="absolute top-8 left-10 w-20 h-10 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute top-16 right-16 w-24 h-12 bg-white/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-24 left-1/3 w-16 h-8 bg-white/35 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-32 right-1/4 w-18 h-9 bg-white/25 rounded-full animate-pulse delay-1000"></div>
        </div>
        <div className="h-1/4 bg-gradient-to-b from-green-400 to-green-600 relative">
          {/* Ground decorations */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-700"></div>
        </div>
      </div>

      {/* Header UI */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all duration-200 text-white backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{score}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full ${
                  i < lives ? 'bg-red-500' : 'bg-gray-500/50'
                } shadow-lg`}
              >
                {i < lives && <span className="block w-full h-full text-center text-white text-xs leading-6">❤️</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question Display - Made larger and more prominent */}
      {currentQuestion && (
        <div className="absolute top-20 left-4 right-4 z-10">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 mx-auto max-w-3xl border border-white/30 shadow-2xl">
            <div className="text-white text-center">
              <div className="text-sm font-medium mb-3 text-yellow-300 uppercase tracking-wide">{currentQuestion.category}</div>
              <div className="text-xl md:text-2xl font-bold leading-relaxed">{currentQuestion.question}</div>
              <div className="text-sm mt-3 text-blue-100 opacity-75">Use ↑↓ arrows to collect the correct formula!</div>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="absolute inset-0 mt-44">
        {/* Player Rocket */}
        <div
          className="absolute w-16 h-16 transition-all duration-200 z-30 flex items-center justify-center"
          style={{
            left: '8%',
            top: `${playerY}%`,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-2xl animate-pulse">
            🚀
          </div>
          {/* Rocket trail */}
          <div className="absolute -right-4 w-8 h-2 bg-gradient-to-r from-orange-400 to-transparent rounded-full opacity-70"></div>
        </div>

        {/* Formula Blocks - Made larger for better readability */}
        {formulaBlocks.map(block => (
          <div
            key={block.id}
            className={`absolute p-4 rounded-2xl shadow-2xl text-sm font-mono text-white transition-all duration-100 border-2 ${
              block.isCorrect 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-300 shadow-green-400/50' 
                : 'bg-gradient-to-r from-red-500 to-pink-600 border-red-300 shadow-red-400/50'
            }`}
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              transform: 'translateY(-50%)',
              maxWidth: '320px',
              minWidth: '240px'
            }}
          >
            <div className="text-center font-bold break-words text-base leading-relaxed">
              {block.formula}
            </div>
            {block.isCorrect && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-4 right-4 text-center text-white z-10">
        <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="text-sm font-medium">
            Use ↑↓ arrow keys or WASD to move • Collect GREEN formulas • Avoid RED ones!
          </div>
          <div className="text-xs mt-1 opacity-75">
            Take your time to read the question and find the correct answer!
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaDash;
