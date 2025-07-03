import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, InventoryItem } from '@/types/game';
import scenes from '@/data/scenes';
import items from '@/data/items';

interface GameStore extends GameState {
  initGame: () => void;
  goToScene: (sceneId: string) => void;
  addItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  useItem: (itemId: string) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  addGold: (amount: number) => void;
  saveGame: (sceneId: string) => void;
  die: () => void;
  respawn: () => void;
}

const initialState: GameState = {
  currentSceneId: 'start',
  visitedScenes: [],
  inventory: [],
  health: 100,
  maxHealth: 100,
  gold: 0,
  lastSavePointId: null,
  isDead: false,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      initGame: () => {
        set(initialState);
      },
      
      goToScene: (sceneId: string) => {
        const scene = scenes[sceneId];
        if (!scene) return;
        
        set((state) => ({
          currentSceneId: sceneId,
          visitedScenes: [...state.visitedScenes, sceneId],
          isDead: scene.isDeath || false,
        }));
        
        // If this is a save point, save the game
        if (scene.isSavePoint) {
          get().saveGame(sceneId);
        }
      },
      
      addItem: (itemId: string) => {
        const itemToAdd = items[itemId];
        if (!itemToAdd) return;
        
        set((state) => ({
          inventory: [...state.inventory, itemToAdd],
        }));
      },
      
      removeItem: (itemId: string) => {
        set((state) => ({
          inventory: state.inventory.filter(item => item.id !== itemId),
        }));
      },
      
      useItem: (itemId: string) => {
        const item = get().inventory.find(i => i.id === itemId);
        if (!item || !item.effect) return;
        
        switch (item.effect.type) {
          case 'heal':
            get().heal(item.effect.value);
            break;
          case 'damage':
            // This would be used for items that deal damage to enemies
            // Not implemented in this simple version
            break;
          case 'protection':
            // This would add temporary protection
            // Not implemented in this simple version
            break;
        }
        
        // Remove the item after use (for consumables)
        get().removeItem(itemId);
      },
      
      takeDamage: (amount: number) => {
        set((state) => {
          const newHealth = Math.max(0, state.health - amount);
          const isDead = newHealth <= 0;
          
          return {
            health: newHealth,
            isDead,
          };
        });
        
        // If the player died, trigger death sequence
        if (get().isDead) {
          get().die();
        }
      },
      
      heal: (amount: number) => {
        set((state) => ({
          health: Math.min(state.maxHealth, state.health + amount),
        }));
      },
      
      addGold: (amount: number) => {
        set((state) => ({
          gold: state.gold + amount,
        }));
      },
      
      saveGame: (sceneId: string) => {
        set({
          lastSavePointId: sceneId,
        });
      },
      
      die: () => {
        set({
          isDead: true,
          currentSceneId: 'death_scene',
        });
      },
      
      respawn: () => {
        const { lastSavePointId } = get();
        
        if (lastSavePointId) {
          set({
            currentSceneId: lastSavePointId,
            health: 100,
            inventory: [],
            isDead: false,
          });
        } else {
          // If no save point, restart from beginning
          set({
            ...initialState,
            visitedScenes: get().visitedScenes,
          });
        }
      },
    }),
    {
      name: 'adventure-game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);