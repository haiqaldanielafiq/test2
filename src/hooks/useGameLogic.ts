import { useCallback } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useAudio } from '@/hooks/useAudio';
import { INITIAL_HEARTS } from '@/lib/constants';
import { ACHIEVEMENTS } from '@/data/achievements';

export const useGameLogic = () => {
  const {
    addScore, addCoin, loseHeart, hearts, timeLeft, coins, isGameOver, isVictory
  } = useGameStore();
  const { addAchievement, recordMistake, totalCoins, unlockedLevels } = useProgressStore();
  const audio = useAudio();

  const checkAchievements = useCallback((levelId: number) => {
    // Math Hero: Level 1 perfect
    if (levelId === 1 && hearts === INITIAL_HEARTS) {
      const a = ACHIEVEMENTS.find(ac => ac.id === 'math-hero');
      if (a) addAchievement(a);
    }

    // Money Master: All levels 1-5 unlocked
    if (unlockedLevels.length >= 5) {
      const a = ACHIEVEMENTS.find(ac => ac.id === 'money-master');
      if (a) addAchievement(a);
    }

    // Fast Thinker: Time left > 120s (2 mins)
    if (timeLeft > 120) {
      const a = ACHIEVEMENTS.find(ac => ac.id === 'fast-thinker');
      if (a) addAchievement(a);
    }

    // Perfect Player: No hearts lost
    if (hearts === INITIAL_HEARTS) {
      const a = ACHIEVEMENTS.find(ac => ac.id === 'perfect-player');
      if (a) addAchievement(a);
    }

    // Coin Collector: 100 total coins
    if (totalCoins + coins >= 100) {
        const a = ACHIEVEMENTS.find(ac => ac.id === 'coin-collector');
        if (a) addAchievement(a);
    }
  }, [hearts, timeLeft, totalCoins, coins, unlockedLevels, addAchievement]);

  const handleAnswer = (isCorrect: boolean, topic: string) => {
    if (isCorrect) {
      addScore(10);
      addCoin();
      audio.playSound('correct');
      return true;
    } else {
      loseHeart();
      recordMistake(topic);
      audio.playSound('wrong');
      return false;
    }
  };

  return { handleAnswer, checkAchievements };
};
