import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PLAYER_ATTACK, END_TURN } from '../../utils/actions';

import './style.css';

function CommandBar() {
  const dispatch = useDispatch();

  const enemy = "Slime";

  // We reference a lot from the states in this component, so select the entire state
  const state = useSelector(state => state)

  const playerDamageMod = state.playerDamageMod;

  // The player decides to make an attack
  function attack() {
    console.log("attack");

    // Calculate the damage that the player will inflict
    let damage = calculateDamageNumber(playerDamageMod)

    // Change the battleState to "PLAYER_ATTACK"
    dispatch({ 
      type: PLAYER_ATTACK, 
      payload: `You attack the ${enemy} and deal ${damage} points of damage` 
    })
  }

  // The player decides to flee
  function flee() {
    console.log("flee")
  }

  // The player decides to use an item (currently only potion)
  function useItem() {
    console.log("use potion")
  }

  // Randomly generate number between 1-10 and multiply by player's damage modifier
  function calculateDamageNumber(modifier) {
    console.log("calculating damage number...");

    let damageRoll = Math.floor(Math.random() * (10 - 2));
    console.log(`Rolled a ${damageRoll}`);

    let damage = damageRoll * modifier;
    console.log(`Attack for ${damage}`)

    return damage;
  }

  return (
    <div id="command-bar">

      {/* Only show buttons when it is the player's turn */}
      {state.playerTurn ? (
        <div id="actions">
          <button onClick={flee}>Flee</button>
          <button onClick={attack}>Attack</button>
          <button onClick={useItem}>Potion</button>
        </div>
      ) : (
        <span>It is not your turn yet</span>
      )}
    </div>
  );
};

export default CommandBar;
