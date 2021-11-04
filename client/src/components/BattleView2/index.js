import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MESSAGE } from '../../utils/actions';


import './style.css'

function BattleView() {
  const dispatch = useDispatch();

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const message = state.message; // The message informing the player of what is going on 
  const player = state.player;  // The player character
  const enemy = state.enemy;     // The enemy the player is fighting
  const playerDamMod = 1; // The player's damage modifier (based on Strength)

  const [playerHP, setPlayerHP] = useState(player.maxHP) // Tracks enemy's current HP
  const [enemyHP, setEnemyHP] = useState(enemy.maxHP) // Tracks enemy's current HP
  const [commandsAvailable, setCommandAvailability] = useState(true); // Tracks whether user can use commands (does not mean it is their turn)
  const [playerTurn, setPlayerTurn] = useState(true); // Tracks whether it is the player's turn
  const [enemyTurn, setEnemyTurn] = useState(false); // Tracks whether it is the enemy's turn

  // The player decides to make an attack
  function playerAttack() {

    // Restrict command-bar
    setCommandAvailability(false);

    // Calculate damage
    let damage = calculateDamage(playerDamMod);

    // Subtract damage from enemy HP
    setEnemyHP(enemyHP - damage);

    // Show message declaring the amount of damage dealt
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `You dealt ${damage} points of damage to the ${enemy.name}`,
    })

    // End the player's turn
    setPlayerTurn(false);
  }

  // The enemy attacks
  function enemyAttack() {

    // Restrict command-bar. Should already be restricted, but just in case
    setCommandAvailability(false);

    // Calculate damage
    let damage = calculateDamage(enemy.damMod);

    // Subtract from player's HP
    setPlayerHP(playerHP - damage);

    // Display damage dealt
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `The ${enemy.name} hit you for ${damage} damage`,
    });

    // Toggle turns
    setEnemyTurn(false);
    setPlayerTurn(true);
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

    // Check whether someone died last turn
    if (isAlive(enemyHP) == false) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You have defeated the ${enemy.name}!!`,
      })
      setCommandAvailability(false);
      endBattle(enemy);
    }

    else if (isAlive(playerHP) == false) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You have been defeated!!!`,
      })
      setCommandAvailability(false);
      endBattle(player);
    }

    // Check whether it is the player's turn
    else if (playerTurn) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `It is your turn!`,
      })

      setCommandAvailability(true); // If it is, let them choose a command
      // }
    }

    // Check whether it is the enemy's turn
    else if (enemyTurn) {
      enemyAttack()
    }

    /* This handles the transition from playerTurn to enemyTurn. 
    Note that there is no need to handle the transition from enemyTurn to playerTurn, so don't confuse this */
    else {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `The ${enemy.name} is getting ready to attack you`,
      })

      setEnemyTurn(true);
    }
  }

  /* Pure function that returns product of randomly generated number between 1-10 
  and either the player's or enemy's damage modifier */
  function calculateDamage(modifier) {
    return (Math.floor(Math.random() * (10 - 1 + 1)) + 1) * modifier;
  }

  // Checks whether player or enemy is dead
  function isAlive(defenderHP) {
    if (defenderHP <= 0) {
      return false;
    } else { return true }
  }

  function endBattle(defeatedCombatant) {
    
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
            <button onClick={playerAttack}>Attack</button>
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
