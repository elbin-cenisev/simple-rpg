import { useReducer } from 'react';
import {
  CHANGE_MESSAGE,
  PLAYER_ATTACK,
  READY_PLAYER,
  END_TURN
} from './actions';

const initialState = {
  playerTurn: true,
  playerDamageMod: 1,
  enemy: "Slime",
  message: "",
  battleState: "READY"
}

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MESSAGE: 
      return {
        ...state,
        message:action.payload,
      }
    case READY_PLAYER: 
      return {
        ...state,
        battleState: "READY",
      }
    case PLAYER_ATTACK:
      return {
        ...state,
        battleState: "PLAYER_ATTACK",
      }
    case END_TURN:
      return {
        ...state,
        playerTurn: !state.playerTurn,
      };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
