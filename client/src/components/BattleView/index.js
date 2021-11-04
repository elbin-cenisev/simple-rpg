import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
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
  
  const [endGame, setGameover] = useState(false); // This will only toggle a turn after isPlayerAlive was set to false. Once it toggles, player is redirected to /gameover.
  const [isPlayerAlive, setPlayerAliveness] = useState(true); // This toggles when the player's HP reaches 0 
  const [isEnemyAlive, setEnemyAliveness] = useState(true); // This toggles when the enemy's HP reaches 0
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
    let damage = calculateDamage(player.damMod);

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

  // The player clicks the "Continue" button on the message-bar. This is where the bulk of the logic happens.
  function progressTurn() {

    // If the player died in the last turn, the game is over
    if (!isPlayerAlive) {
      setGameover(true);
    }

    // If the enemy died in the last turn, start tallying experience gains and such
    else if (!isEnemyAlive) {
      console.log("The enemy is dead");

      // Calculate gold and experience gains
    }

    // Check if the player lost their HP during this turn. If they did, flip isPlayerAlive so that the next time the Continue is pressed, the game can end.
    else if (checkForDeath(playerHP) == false) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You have been defeated!!!`,
      })
      setCommandAvailability(false);
      setPlayerAliveness(false);
    }

    // Check whether enemy's HP has reached 0. If it has, toggle the flag to make image disappear. Next time Continue is pressed, it'll calculate gold and exp gains.
    else if (checkForDeath(enemyHP) == false) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You have defeated the ${enemy.name}!!`,
      })
      setCommandAvailability(false);
      setEnemyAliveness(false);
    }

    // If nobody died, check if it is the player's turn
    else if (playerTurn) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `It is your turn!`,
      })

      setCommandAvailability(true); // If it is, let them choose a command
    }

    // Check whether it is the enemy's turn. If it is, have the enemy attack by default.
    else if (enemyTurn) {
      enemyAttack()
    }

    /* This ONLY handles the transition from playerTurn to enemyTurn (not vice-versa as there is no need) 
    It might seem odd, but this in-between step allows for the message to be displayed informing the player
    that the enemy is attacking*/
    else {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `The ${enemy.name} is getting ready to attack you`,
      })

      setEnemyTurn(true);
    }
  }

  /* Pure function that returns the product of randomly generated number between 1-10 
  and the attacker's damage modifier */
  function calculateDamage(modifier) {
    return (Math.floor(Math.random() * (10 - 1 + 1)) + 1) * modifier;
  }

  // Checks whether player or enemy lost all their health points
  function checkForDeath(defenderHP) {
    if (defenderHP <= 0) {
      return false;
    } else { return true }
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

        {/* If enemy is alive, show their picture */}
        {isEnemyAlive ? (
        <img src={'./images/slime.png'} />
        ) : (
          console.log("The enemy is dead")
        )}
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
        {endGame ? (
          <Redirect to="/gameover" />
        ) : (console.log("It's not over yet"))}
      </div>

      <div id="health-bar">
        {playerHP} / {player.maxHP}
      </div>
    </div>
  );
};

export default BattleView;
