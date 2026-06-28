import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useSettingsStore } from '@/store/useSettingsStore';

export const useAudio = () => {
  const { musicVolume, sfxVolume } = useSettingsStore();

  const sounds = useRef<Record<string, Howl>>({});

  useEffect(() => {
    sounds.current = {
      click: new Howl({ src: ['/assets/audio/click.mp3'], volume: sfxVolume }),
      correct: new Howl({ src: ['/assets/audio/correct.mp3'], volume: sfxVolume }),
      wrong: new Howl({ src: ['/assets/audio/wrong.mp3'], volume: sfxVolume }),
      coin: new Howl({ src: ['/assets/audio/coin.mp3'], volume: sfxVolume }),
      jump: new Howl({ src: ['/assets/audio/jump.mp3'], volume: sfxVolume }),
      victory: new Howl({ src: ['/assets/audio/victory.mp3'], volume: sfxVolume }),
      gameOver: new Howl({ src: ['/assets/audio/game-over.mp3'], volume: sfxVolume }),
      bgm: new Howl({ src: ['/assets/audio/bgm.mp3'], volume: musicVolume, loop: true }),
    };

    return () => {
      Object.values(sounds.current).forEach(s => s.unload());
    };
  }, []);

  useEffect(() => {
    if (sounds.current.bgm) sounds.current.bgm.volume(musicVolume);
    Object.keys(sounds.current).forEach(key => {
      if (key !== 'bgm') sounds.current[key].volume(sfxVolume);
    });
  }, [musicVolume, sfxVolume]);

  const playSound = (name: string) => {
    if (sounds.current[name]) {
      sounds.current[name].play();
    }
  };

  const stopSound = (name: string) => {
    if (sounds.current[name]) {
      sounds.current[name].stop();
    }
  };

  return { playSound, stopSound };
};
