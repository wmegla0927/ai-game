export type SavePointType = 'inn' | 'camp' | 'bonfire' | 'keep';

export type Choice = {
  text: string;
  nextSceneId: string;
  effect?: {
    type: 'addItem' | 'removeItem' | 'damage' | 'heal' | 'gold';
    value: string | number;
  };
};

export type Scene = {
  id: string;
  text: string;
  choices?: {
    yes: Choice;
    no: Choice;
    fate?: Choice[];
  };
  isSavePoint?: boolean;
  savePointType?: SavePointType;
  isEnding?: boolean;
  isDeath?: boolean;
  image?: string;
  music?: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  description: string;
  effect?: {
    type: 'damage' | 'heal' | 'protection';
    value: number;
  };
};

export type GameState = {
  currentSceneId: string;
  visitedScenes: string[];
  inventory: InventoryItem[];
  health: number;
  maxHealth: number;
  gold: number;
  lastSavePointId: string | null;
  isDead: boolean;
};