import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useGameStore } from '@/store/gameStore';

export default function Index() {
  const { currentSceneId } = useGameStore();
  
  // If the game has already started, go to the game screen
  // Otherwise, go to the start game screen
  return currentSceneId === 'start' ? 
    <Redirect href="/start-game" /> : 
    <Redirect href="/(tabs)" />;
}