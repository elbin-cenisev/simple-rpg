import { useReducer } from 'react';
import {
  CHANGE_MESSAGE, USE_POTION, GAIN_LOOT
} from './actions';

const initialState = {
  enemy: {
    name: "Slime",
    maxHP: 20,
    damMod: 1,
    evasMod: .1,
    goldVal: 5,
    expVal: 10
  },

  player: {
    name: "TestGuy",
    maxHP: 100,
    currentHP: 100,
    damMod: 1,
    evasMod: .1,
    potions: 5,
    totalEXP: 0,
    totalGold: 0,
  },

  message: "",
}

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MESSAGE:
      return {
        ...state,
        message: action.payload,
      }

    case USE_POTION:
      return {
        ...state,
        player: {
          ...state.player,
          potions: action.payload.potions
        },

        message: action.payload.message,
      }

    case GAIN_LOOT: 
      return {
        ...state,
        player: {
          ...state.player,
          gold: action.payload.gold,
          exp: action.payload.exp,
          potions: action.payload.potions
        },
        message: action.payload.message
      }
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
