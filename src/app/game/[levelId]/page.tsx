'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useGameLogic } from '@/hooks/useGameLogic';
import { questions } from '@/data/questions';
import { HUD } from '@/components/game/HUD';
import { Player } from '@/components/game/Player';
import { QuestionBlock } from '@/components/game/QuestionBlock';
import { Cloud } from '@/components/game/Cloud';
import { Castle } from '@/components/game/Castle';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Pause, Play, Home, RotateCcw } from 'lucide-react';
import Confetti from 'react-confetti';

export default function GamePage() {
  const { levelId } = useParams();
  const router = useRouter();
  const {
    score, hearts, coins, timeLeft, isGameOver, isVictory,
    resetGame, tickTimer, setGameState
  } = useGameStore();
  const { updateHighScore, unlockLevel, addTotalCoins } = useProgressStore();
  const { handleAnswer, checkAchievements } = useGameLogic();

  const levelQuestions = useMemo(() =>
    questions.filter(q => q.level === Number(levelId)),
    [levelId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playerState, setPlayerState] = useState<'idle' | 'run' | 'jump'>('idle');
  const [isWrong, setIsWrong] = useState(false);

  // Player Position Logic
  const startX = 15;
  const endX = 80;
  const [playerX, setPlayerX] = useState(0); // Start off-screen

  useEffect(() => {
    resetGame(Number(levelId));
    // Initial entrance animation
    setPlayerState('run');
    setPlayerX(startX);
    setTimeout(() => setPlayerState('idle'), 1000);

    const timer = setInterval(() => {
      if (!showQuestion && !isGameOver && !isVictory && !isPaused) {
        tickTimer();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [levelId, resetGame, tickTimer, showQuestion, isGameOver, isVictory, isPaused]);

  const currentQuestion = levelQuestions[currentIndex];

  const onQuestionClick = () => {
    if (!isGameOver && !isVictory && !isPaused) setShowQuestion(true);
  };

  const handleChoice = (choice: string) => {
    const correct = choice === currentQuestion.answer;
    const success = handleAnswer(correct, currentQuestion.topic);

    if (success) {
      setPlayerState('jump');

      // Move player forward slightly for each correct answer
      const progress = (currentIndex + 1) / levelQuestions.length;
      const nextX = startX + (endX - startX) * progress;

      setTimeout(() => {
        if (currentIndex < levelQuestions.length - 1) {
            setPlayerState('run');
            setPlayerX(nextX);
            setTimeout(() => setPlayerState('idle'), 500);
            setCurrentIndex(prev => prev + 1);
            setShowQuestion(false);
        } else {
            // Final Move to castle on win
            setPlayerState('run');
            setPlayerX(endX);
            setTimeout(() => {
                setPlayerState('idle');
                setGameState({ isVictory: true });
                checkAchievements(Number(levelId));
                updateHighScore(Number(levelId), score + 10);
                unlockLevel(Number(levelId) + 1);
                addTotalCoins(coins + 1);
            }, 1000);
            setShowQuestion(false);
        }
      }, 500);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  const togglePause = () => setIsPaused(!isPaused);

  return (
    <main className={`relative w-full h-screen bg-game-sky overflow-hidden ${isWrong ? 'animate-shake' : ''}`}>
      {isVictory && <Confetti />}
      <HUD />

      {/* Pause Button */}
      <div className="absolute top-24 left-6 z-40">
         <Button variant="glass" size="icon" onClick={togglePause}>
            <Pause className="w-6 h-6 text-white" />
         </Button>
      </div>

      {/* Background Decor */}
      <Cloud y="15%" duration={30} />
      <Cloud y="30%" duration={45} delay={10} />

      {/* Game World */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-5xl h-96">

          {/* Player */}
          <motion.div
            className="absolute bottom-12 z-20"
            animate={{ left: `${playerX}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
             <Player state={playerState} />
          </motion.div>

          {/* Question Block - Follows Player slightly ahead */}
          <AnimatePresence>
            {!isVictory && (
                <motion.div
                    key={currentIndex}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute bottom-40"
                    style={{ left: `${Math.min(playerX + 15, 75)}%`, transform: 'translateX(-50%)' }}
                >
                    <QuestionBlock onClick={onQuestionClick} />
                    <div className="text-white font-black text-center mt-4 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1 text-xs whitespace-nowrap shadow-lg">
                        Soalan {currentIndex + 1} / {levelQuestions.length}
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Castle */}
          <div className="absolute bottom-12 right-10">
            <Castle isOpen={isVictory} />
          </div>

          {/* Floor */}
          <div className="absolute bottom-0 w-full h-12 bg-game-grass border-t-4 border-green-600 rounded-t-xl shadow-2xl z-10" />
        </div>
      </div>

      {/* Question Modal */}
      <Modal isOpen={showQuestion} title={`Soalan ${currentIndex + 1}`}>
        <div className="text-center">
          <p className="text-xl font-bold text-white mb-8 drop-shadow-md">{currentQuestion?.question}</p>
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion?.choices.map((choice) => (
              <Button
                key={choice}
                variant="glass"
                className="py-4 text-lg hover:scale-105 transition-transform"
                onClick={() => handleChoice(choice)}
              >
                {choice}
              </Button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Pause Modal */}
      <Modal isOpen={isPaused} title="Permainan Dijeda">
        <div className="text-center flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Button variant="secondary" onClick={togglePause} className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> SAMBUNG
            </Button>
            <Button variant="glass" onClick={() => router.refresh()} className="flex items-center justify-center gap-2">
                <RotateCcw className="w-5 h-5" /> MULA SEMULA
            </Button>
            <Button variant="ghost" onClick={() => router.push('/menu')} className="flex items-center justify-center gap-2 text-white">
                <Home className="w-5 h-5" /> MENU UTAMA
            </Button>
          </div>
        </div>
      </Modal>

      {/* Game Over Modal */}
      <Modal isOpen={isGameOver} title="Permainan Tamat!">
        <div className="text-center flex flex-col gap-6">
          <p className="text-white text-lg font-medium">Jangan putus asa! Cuba lagi untuk menguasai topik Wang.</p>
          <div className="flex flex-col gap-3">
            <Button variant="secondary" onClick={() => router.refresh()}>CUBA LAGI</Button>
            <Button variant="ghost" onClick={() => router.push('/menu')} className="text-white">MENU UTAMA</Button>
          </div>
        </div>
      </Modal>

      {/* Victory Modal */}
      <Modal isOpen={isVictory} title="Tahniah! Anda Menang!">
        <div className="text-center flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-yellow-300 text-5xl font-black drop-shadow-lg">{score} MATA</p>
            <p className="text-white font-medium">Anda telah berjaya melepasi Level {levelId}!</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="secondary" onClick={() => router.push('/levels')}>LEVEL SETERUSNYA</Button>
            <Button variant="ghost" onClick={() => router.push('/menu')} className="text-white">MENU UTAMA</Button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </main>
  );
}
