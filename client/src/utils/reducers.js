import { useReducer } from 'react';
import {
  CHANGE_MESSAGE, USE_POTION, BUY_POTION, GAIN_LOOT, REST, ADJUST_HP, SET_STATISTICS
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
    maxHP: 20,
    currentHP: 20,
    damMod: 1,
    evaMod: .1,
    potions: 5,
    totalEXP: 0,
    totalGold: 100,
    statistics: {
      strength: 0,
      agility: 0,
      endurance: 0,
    }
  },

  message: "",
}

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SET_STATISTICS: 
    return {
      ...state,
      player: {
        ...state.player,
        maxHP: action.payload.maxHP,
        damMod: action.payload.damMod,
        evaMod: action.payload.evaMod,
        statistics: {
          ...state.player.statistics,
          strength: action.payload.strength,
          agility: action.payload.agility,
          endurance: action.payload.endurance,
        }
      }
    }

    case CHANGE_MESSAGE:
      return {
        ...state,
        message: action.payload,
      }

    case ADJUST_HP:
      return {
        ...state,
        player: {
          ...state.player,
          currentHP: action.payload
        },
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
          totalGold: action.payload.gold,
          totalExp: action.payload.exp,
          potions: action.payload.potions
        },
        message: action.payload.message
      }

    case REST:
      return {
        ...state,
        player: {
          ...state.player,
          currentHP: action.payload.hp,
          totalGold: action.payload.gold,
        },
        message: action.payload.message
      }

    case BUY_POTION:
      return {
        ...state,
        player: {
          ...state.player,
          potions: action.payload.potions,
          totalGold: action.payload.gold,
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
