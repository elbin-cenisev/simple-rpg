import { useReducer } from 'react';
import {
  CHANGE_MESSAGE, USE_POTION
} from './actions';

const initialState = {
  enemy: {
    name: "Slime",
    maxHP: 20,
    damMod: 1,
    evasMod: .1,
  },

  player: {
    name: "TestGuy",
    maxHP: 100,
    damMod: 1,
    evasMod: .1,
    potions: 5
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
    default:
  return state;
}
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
