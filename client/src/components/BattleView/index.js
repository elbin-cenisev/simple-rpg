import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MESSAGE, USE_POTION } from '../../utils/actions';


import './style.css'

function BattleView() {
  const dispatch = useDispatch();

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const message = state.message; // The message informing the player of what is going on 
  const player = state.player;  // The player character
  const enemy = state.enemy;     // The enemy the player is fighting
  const potionNum = state.player.potions  // The amount of potions the player has ready for use

  const [endGame, setGameover] = useState(false); // This will only toggle a turn after isPlayerAlive was set to false. Once it toggles, player is redirected to /gameover.
  const [isPlayerAlive, setPlayerAliveness] = useState(true); // This toggles when the player's HP reaches 0 
  const [isEnemyAlive, setEnemyAliveness] = useState(true); // This toggles when the enemy's HP reaches 0
  const [playerHP, setPlayerHP] = useState(80) // Tracks enemy's current HP
  const [enemyHP, setEnemyHP] = useState(enemy.maxHP) // Tracks enemy's current HP
  const [commandsAvailable, setCommandAvailability] = useState(true); // Tracks whether user can use commands (does not mean it is their turn)
  const [playerTurn, setPlayerTurn] = useState(true); // Tracks whether it is the player's turn
  const [enemyTurn, setEnemyTurn] = useState(false); // Tracks whether it is the enemy's turn

  // The player decides to make an attack
  function playerAttack() {

    // Restrict command-bar
    setCommandAvailability(false);

    // Check if enemy will evade this attack. If they do, a message is displayed
    if (!didEvade(enemy.evasMod, enemy.name)) {
      // Calculate damage
      let damage = calculateDamage(player.damMod);

      // Subtract damage from enemy HP
      setEnemyHP(enemyHP - damage);

      // Show message declaring the amount of damage dealt
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You dealt ${damage} points of damage to the ${enemy.name}`,
      })
    }

    // End the player's turn regardless of whether it hit or missed
    setPlayerTurn(false);
  }

  // The enemy attacks
  function enemyAttack() {

    // Restrict command-bar. Should already be restricted, but just in case
    setCommandAvailability(false);

    // Check if enemy will evade this attack. If they do, a message is displayed
    if (!didEvade(player.evasMod, player.name)) {
      // Calculate damage
      let damage = calculateDamage(player.damMod);

      // Subtract damage from enemy HP
      setPlayerHP(playerHP - damage);

      // Show message declaring the amount of damage dealt
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `${enemy.name} dealt ${damage} points of damage to ${player.name}`,
      })
    }

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
    console.log("Potions");
    if (player.potions > 0) {
      let restoredHP = 20;
      let newPotionNum = player.potions - 1;
      let newHP = playerHP + restoredHP;

      if (newHP > player.maxHP) {
        restoredHP = player.maxHP - playerHP
        setPlayerHP(player.maxHP);
      } else {
        setPlayerHP(newHP);
      }

      dispatch({
        type: USE_POTION,
        payload: {
          message: `You used a potion and restored ${restoredHP} HP`,
          potions: newPotionNum
        }
      })
    } else {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You don't have any potions left!!!`,
      })
    }

    setPlayerTurn(false);
    setCommandAvailability(false);

  }

  // The player clicks the "Continue" button on the message-bar. This is where the bulk of the logic happens.
  function progressTurn() {

    // If the player died in the last turn, the game is over
    if (!isPlayerAlive) {
      setGameover(true);
    }

    // If the enemy died in the last turn, start tallying experience gains and such
    else if (!isEnemyAlive) {
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

  /* Returns whether the defender was able to evade the attack */
  function didEvade(modifier, defender) {
    console.log(modifier);
    var diceRoll = Math.random();
    let chanceToHit = 1 - modifier;
    console.log(`Chance to hit: ${chanceToHit}, roll: ${diceRoll}`);

    if (diceRoll > chanceToHit) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `${defender} evaded their attack`,
      })
      return true
    }
    else {
      return false
    }
  }


  // Pure function whether the defender lost all their health points
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

      {/* Shows player's current HP */}
      <div id="health-bar">
        {playerHP} / {player.maxHP}
      </div>

      {/* Shows how many potions the player has in their posession */}
      <div id="potion-bar">
        {player.potions}
      </div>
    </div>
  );
};

export default BattleView;
