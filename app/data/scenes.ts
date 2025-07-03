// scenes.ts
import fateLibrary from './fateLibrary';

const scenes = {
  camp_save_point: {
    id: 'camp_save_point',
    text: "You discover a small alcove off the main path where someone has set up a rudimentary camp. A small fire burns in a stone-ringed pit, casting a warm glow on the surrounding walls. Beside it lies a bedroll and a small stack of supplies. There is no sign of the camp's owner, but the fire seems recently tended. This might be a good place to rest and gather your strength. Do you make use of the camp?",
    choices: {
      yes: {
        text: "Yes, I will rest at the camp",
        nextSceneId: 'after_camp_rest',
      },
      no: {
        text: "No, whoever made this camp might return. I should move on",
        nextSceneId: 'leave_camp',
      },
      fate: fateLibrary.camp,
    },
    isSavePoint: true,
    savePointType: 'camp',
    music: 'safe_haven',
    tags: ['rest', 'lore'],
    difficulty: 'easy',
  },

  // ... more scenes can be added similarly
};

export default scenes;