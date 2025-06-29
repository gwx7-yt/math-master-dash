
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
}

const FormulaDash = ({ onBack }: FormulaDashProps) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [playerY, setPlayerY] = useState(50);
  const [currentQuestion, setCurrentQuestion] = useState<Formula | null>(null);
  const [formulaBlocks, setFormulaBlocks] = useState<FormulaBlock[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameSpeed, setGameSpeed] = useState(1.5);
  const [nextBlockId, setNextBlockId] = useState(1);
  const [showQuestion, setShowQuestion] = useState(true);

  // Generate new question and blocks - much slower spawn
  const generateQuestion = useCallback(() => {
    const randomFormula = formulas[Math.floor(Math.random() * formulas.length)];
    setCurrentQuestion(randomFormula);
    setShowQuestion(true);
    
    // Clear existing blocks first
    setFormulaBlocks([]);
    
    // Wait 3 seconds before spawning blocks so user can read question
    setTimeout(() => {
      const blocks: FormulaBlock[] = [];
      const correctAnswer = randomFormula.options[randomFormula.correct];
      
      // Create 3 blocks with much more vertical spacing
      const yPositions = [25, 50, 75]; // More spread out vertically
      const shuffledPositions = [...yPositions].sort(() => Math.random() - 0.5);
      
      // Add correct answer at random position
      const correctIndex = Math.floor(Math.random() * 3);
      blocks.push({
        id: nextBlockId,
        formula: correctAnswer,
        isCorrect: true,
        x: 100, // Start from right edge
        y: shuffledPositions[correctIndex]
      });

      // Add wrong answers
      const wrongAnswers = randomFormula.options.filter((_, index) => index !== randomFormula.correct);
      wrongAnswers.slice(0, 2).forEach((answer, index) => {
        const wrongIndex = index < correctIndex ? index : index + 1;
        blocks.push({
          id: nextBlockId + index + 1,
          formula: answer,
          isCorrect: false,
          x: 100,
          y: shuffledPositions[wrongIndex]
        });
      });
      
      setFormulaBlocks(blocks);
      setNextBlockId(prev => prev + 4);
      setShowQuestion(false); // Hide question when blocks appear
    }, 3000); // 3 second delay
  }, [nextBlockId]);

  // Initialize game
  useEffect(() => {
    if (gameState === 'playing' && !currentQuestion) {
      generateQuestion();
    }
  }, [generateQuestion, gameState, currentQuestion]);

  // Much slower game loop - inspired by Flappy Bird
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFormulaBlocks(prevBlocks => {
        if (prevBlocks.length === 0) return prevBlocks;

        const updatedBlocks = prevBlocks.map(block => ({
          ...block,
          x: block.x - gameSpeed // Much slower movement
        }));

        // Check for collisions - more forgiving hitbox
        const playerLeft = 5;
        const playerRight = 15;
        const playerTop = playerY - 8;
        const playerBottom = playerY + 8;

        let collision = false;
        let correctHit = false;

        updatedBlocks.forEach(block => {
          const blockLeft = block.x;
          const blockRight = block.x + 20;
          const blockTop = block.y - 8;
          const blockBottom = block.y + 8;

          // More forgiving collision detection
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
            setGameSpeed(prev => Math.min(prev + 0.2, 3)); // Slower speed increase
            // Generate new question after 2 seconds
            setTimeout(() => generateQuestion(), 2000);
            return [];
          } else {
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameState('lost');
              } else {
                // Generate new question after wrong answer
                setTimeout(() => generateQuestion(), 2000);
              }
              return newLives;
            });
            return [];
          }
        }

        // Remove blocks that are completely off screen
        const visibleBlocks = updatedBlocks.filter(block => block.x > -25);
        
        // If all blocks are gone, generate new question
        if (visibleBlocks.length === 0 && prevBlocks.length > 0) {
          setTimeout(() => generateQuestion(), 1500);
        }

        return visibleBlocks;
      });
    }, 50); // Much slower loop (50ms instead of 16ms)

    return () => clearInterval(gameLoop);
  }, [gameState, playerY, gameSpeed, generateQuestion]);

  // Smooth player movement
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      event.preventDefault();
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
        case ' ': // Spacebar like Flappy Bird
          setPlayerY(prev => Math.max(15, prev - 8)); // Bigger movement
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setPlayerY(prev => Math.min(85, prev + 8)); // Bigger movement
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setPlayerY(50);
    setScore(0);
    setLives(3);
    setGameSpeed(1.5);
    setNextBlockId(1);
    setCurrentQuestion(null);
    setFormulaBlocks([]);
  };

  const handleRestart = () => {
    setGameState('ready');
    setPlayerY(50);
    setScore(0);
    setLives(3);
    setGameSpeed(1.5);
    setNextBlockId(1);
    setCurrentQuestion(null);
    setFormulaBlocks([]);
  };

  // Ready screen
  if (gameState === 'ready') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-lg w-full text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl font-bold mb-6">Formula Dash</h2>
          <div className="text-lg mb-8 space-y-3">
            <p>🎯 Read the question carefully</p>
            <p>⏱️ Wait for answer blocks to appear</p>
            <p>🎮 Use ↑↓ arrows or spacebar to move</p>
            <p>✅ Collect GREEN (correct) formulas</p>
            <p>❌ Avoid RED (wrong) formulas</p>
          </div>
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Game
          </button>
          <button
            onClick={onBack}
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Menu</span>
          </button>
        </div>
      </div>
    );
  }

  // Game over screen
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

  // Main game screen
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-400 via-blue-500 to-blue-600">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="h-3/4 bg-gradient-to-b from-sky-300 to-blue-500 relative">
          {/* Slower moving clouds */}
          <div className="absolute top-8 left-10 w-20 h-10 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute top-16 right-16 w-24 h-12 bg-white/30 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-24 left-1/3 w-16 h-8 bg-white/35 rounded-full animate-pulse delay-700"></div>
        </div>
        <div className="h-1/4 bg-gradient-to-b from-green-400 to-green-600 relative">
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
                className={`w-8 h-8 rounded-full ${
                  i < lives ? 'bg-red-500' : 'bg-gray-500/50'
                } shadow-lg flex items-center justify-center`}
              >
                {i < lives && <span className="text-white">❤️</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question Display - Only show when blocks haven't spawned */}
      {currentQuestion && showQuestion && (
        <div className="absolute top-20 left-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 mx-auto max-w-4xl border border-white/30 shadow-2xl">
            <div className="text-gray-800 text-center">
              <div className="text-sm font-bold mb-4 text-blue-600 uppercase tracking-wide">{currentQuestion.category}</div>
              <div className="text-2xl md:text-3xl font-bold leading-relaxed mb-4">{currentQuestion.question}</div>
              <div className="text-lg text-gray-600">Get ready... blocks coming in 3 seconds!</div>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="absolute inset-0 mt-32">
        {/* Player Rocket - Bigger and more visible */}
        <div
          className="absolute w-20 h-20 transition-all duration-150 z-30 flex items-center justify-center"
          style={{
            left: '8%',
            top: `${playerY}%`,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-3xl animate-bounce">
            🚀
          </div>
          {/* Rocket trail */}
          <div className="absolute -right-6 w-12 h-3 bg-gradient-to-r from-orange-400 to-transparent rounded-full opacity-80"></div>
        </div>

        {/* Formula Blocks - Much larger and more readable */}
        {formulaBlocks.map(block => (
          <div
            key={block.id}
            className={`absolute p-6 rounded-3xl shadow-2xl text-lg font-mono text-white transition-all duration-100 border-4 ${
              block.isCorrect 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-300 shadow-green-400/50' 
                : 'bg-gradient-to-r from-red-500 to-pink-600 border-red-300 shadow-red-400/50'
            }`}
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              transform: 'translateY(-50%)',
              maxWidth: '400px',
              minWidth: '300px'
            }}
          >
            <div className="text-center font-bold break-words text-xl leading-relaxed">
              {block.formula}
            </div>
            {block.isCorrect && (
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-lg font-bold border-2 border-white">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-4 right-4 text-center text-white z-10">
        <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="text-lg font-medium">
            Use ↑↓ arrows, WASD, or SPACEBAR to move • Collect GREEN formulas • Avoid RED ones!
          </div>
          <div className="text-sm mt-2 opacity-75">
            Take your time to read the question - blocks appear after 3 seconds!
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaDash;
