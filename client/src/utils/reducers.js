import { useReducer } from 'react';
import {
  CHANGE_MESSAGE,
} from './actions';

const initialState = {
  enemy: {
    name: "Slime",
    maxHP: 20,
    damMod: 1,
  },

  player: {
    name: "TestGuy",
    maxHP: 100,
    damMod: 1,
  },

  message: "",
}

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MESSAGE: 
      return {
        ...state,
        message:action.payload,
      }

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
