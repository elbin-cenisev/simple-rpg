import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { CHANGE_MESSAGE } from '../../utils/actions';


import './style.css'

function BattleView() {
    const dispatch = useDispatch();

    // Since we manage a lot of states, just subscribe to the entire state
    let state = useSelector(state => state);

    const message = state.message; // The message informing the player of what is going on 
    const enemy = state.enemy;     // The enemy the player is fighting
    const [enemyHP, setEnemyHP] = useState(enemy.maxHP)

    console.log(enemyHP);

    // Testing vars
    let commandsAvailable = true; // Determines whether the player can choose an action from the command-bar
    const playerDamMod = 1; // The player's damage modifier (based on Strength)

    // The player decides to make an attack
    function attack() {
      console.log("attack");

      // Restrict command-bar
      commandsAvailable = false;

      // Calculate damage
      let damage = calculateDamage(playerDamMod);

      // Subtract damage from enemy HP
      setEnemyHP(enemyHP - damage);
      console.log(enemyHP);

      // Show message declaring the amount of damage dealt
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You dealt ${damage} points of damage to the ${enemy.name}`,
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

    // The player clicks the "Continue" button on the message-bar
    function progressTurn() {
      console.log("Test");
    }

    /* Pure function that returns product of randomly generated number between 1-10 
    and either the player's or enemy's damage modifier */
    function calculateDamage(modifier) {
      return (Math.floor(Math.random() * (10 - 1 + 1)) + 1) * modifier;
    }

  return (
    <div id="battleView">

      {/* The message-bar displays what is currently going on */}
      <div id="message-bar">
        <p id="message">{message}</p>
        {commandsAvailable ? (
          <span>(Select an action)</span>
        ) : (
          <button onClick={progressTurn}>Continue</button>
        )}
      </div>

      {/* The enemy-window just shows an image of the enemy you are fighting*/}
      <div id="enemy-window">
        <img src={'./images/slime.png'} />
      </div>

      {/* The command-bar shows all the commands a player can make durin their turn */}
      <div id="command-bar">

        {/* Only show buttons when it is the player's turn */}
        {commandsAvailable ? (
          <div id="actions">
            <button onClick={flee}>Flee</button>
            <button onClick={attack}>Attack</button>
            <button onClick={useItem}>Potion</button>
          </div>
        ) : (
          <span>It is not your turn yet</span>
        )}
      </div>
    </div>
  );
};

export default BattleView;
