import { useReducer } from 'react';
import {
  START_BATTLE
} from './actions';

const initialState = {
  playerTurn: true,
  battleState: "START",
}

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
    case START_BATTLE:
      return {
        ...state,
        battleState: "PLAYER_TURN",
      }


    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
