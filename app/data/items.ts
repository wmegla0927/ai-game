import { InventoryItem } from '@/types/game';

const items: Record<string, InventoryItem> = {
  rusty_dagger: {
    id: 'rusty_dagger',
    name: 'Rusty Dagger',
    description: 'An ancient dagger with strange runes. Despite its appearance, it feels unnaturally sharp.',
    effect: {
      type: 'damage',
      value: 5,
    },
  },
  silver_amulet: {
    id: 'silver_amulet',
    name: 'Silver Amulet',
    description: 'A silver amulet that glows faintly in the presence of dark magic. It feels warm to the touch.',
    effect: {
      type: 'protection',
      value: 10,
    },
  },
  soul_crystal: {
    id: 'soul_crystal',
    name: 'Soul Crystal',
    description: 'A pulsing crystal that seems to beat in rhythm with your heart. It contains strange visions of a dark citadel.',
    effect: {
      type: 'heal',
      value: 15,
    },
  },
  crystal_shard: {
    id: 'crystal_shard',
    name: 'Crystal Shard',
    description: 'A fragment of a larger crystal. It pulses with arcane energy and occasionally whispers to you.',
    effect: {
      type: 'heal',
      value: 5,
    },
  },
  ancient_tome: {
    id: 'ancient_tome',
    name: 'Ancient Tome',
    description: 'A book bound in what appears to be human skin. The text shifts and changes when you try to read it.',
  },
  spectral_key: {
    id: 'spectral_key',
    name: 'Spectral Key',
    description: 'A key that seems to be made of solidified mist. It feels cold to the touch and occasionally becomes transparent.',
  },
  demon_bone: {
    id: 'demon_bone',
    name: 'Demon Bone',
    description: 'A blackened bone that radiates malevolent energy. Small runes are carved along its length.',
  },
  healing_potion: {
    id: 'healing_potion',
    name: 'Healing Potion',
    description: 'A small vial containing a glowing red liquid. It smells faintly of cinnamon and copper.',
    effect: {
      type: 'heal',
      value: 25,
    },
  },
};

export default items;