import { useEffect, useState, useRef } from 'react';
import { Audio } from 'expo-av';

const musicTracks = {
  intro: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  exploration: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 
  combat: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  safe_haven: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  death: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  victory: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
};

export function useAudio() {
  const [currentTrack, setCurrentTrack] = useState<keyof typeof musicTracks | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playTrack = async (trackName: keyof typeof musicTracks) => {
    try {
      const uri = musicTracks[trackName];
      if (!uri) return;

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true, isLooping: true });
      soundRef.current = sound;
      setCurrentTrack(trackName);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const stopTrack = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const pauseTrack = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeTrack = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  return {
    playTrack,
    stopTrack,
    pauseTrack,
    resumeTrack,
    isPlaying,
    currentTrack,
    audioEnabled,
  };
}
