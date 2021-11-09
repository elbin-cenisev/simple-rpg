import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MESSAGE, USE_POTION, GAIN_LOOT, ADJUST_HP } from '../../utils/actions';


import './style.css'

function BattleView() {
  const dispatch = useDispatch();

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const message = state.message; // The message informing the player of what is going on 
  const player = state.player;  // The player character
  const enemy = state.enemy;     // The enemy the player is fighting

  const [gameOver, setGameover] = useState(false); // This will only toggle a turn after isPlayerAlive was set to false. Once it toggles, player is redirected to /gameover.
  const [finished, setFinished] = useState(false); // This will only toggle a turn after isEnemyAlive was set to false. Once it toggles, player is redirected to /preparationScreen.
  const [isPlayerAlive, setPlayerAliveness] = useState(true); // This toggles when the player's HP reaches 0 
  const [isEnemyAlive, setEnemyAliveness] = useState(true); // This toggles when the enemy's HP reaches 0
  const [enemyHP, setEnemyHP] = useState(enemy.maxHP) // Tracks enemy's current HP
  const [commandsAvailable, setCommandAvailability] = useState(true); // Tracks whether user can use commands (does not mean it is their turn)
  const [playerTurn, setPlayerTurn] = useState(true); // Tracks whether it is the player's turn
  const [enemyTurn, setEnemyTurn] = useState(false); // Tracks whether it is the enemy's turn
  const [levelUp, setLevelUp] = useState(false) // Tracks whether the user has gained enough EXP for a level up

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
      let damage = calculateDamage(enemy.damMod);
      let newHP = player.currentHP - damage;

      // Subtract damage from enemy HP
      dispatch({
        type: ADJUST_HP,
        payload: newHP,
      })

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

    // Only use potion if the user has a potion to use
    if (player.potions > 0) {
      let restoredHP = 20;  // The default amount that a potion restores
      let newPotionNum = player.potions - 1;  // Reduce the amount of potions that the user has
      let newHP = player.currentHP + restoredHP;  // Realistically, the user's new HP (but gets adjusted below)

      // A player's HP should never exceed their max HP through potion use
      if (newHP > player.maxHP) {

        // Only restore as much HP as needed to reach the player's maxHP
        restoredHP = player.maxHP - player.currentHP;

        dispatch({
          type: ADJUST_HP,
          payload: player.maxHP,
        })

        // Otherwise, heal for the standard amount
      } else {
        // Subtract damage from enemy HP
        dispatch({
          type: ADJUST_HP,
          payload: newHP,
        })
      }

      dispatch({
        type: USE_POTION,
        payload: {
          message: `You used a potion and restored ${restoredHP} HP`,
          potions: newPotionNum
        }
      })

      // If the player has no potions to use, don't adjust any values and just change message
    } else {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You don't have any potions left!!!`,
      })
    }

    // Regardless, the player's turn ends (harsh, I know, but this makes it easier for now)
    setPlayerTurn(false);
    setCommandAvailability(false);

  }

  /* The player clicks the "Continue" button on the message-bar. This is where the bulk of the logic happens. 
  Do not change the order in which the checks are handled; it's based on priority. */
  function progressTurn() {

    // If the battle is finished(either due to the player or enemy dying), flip the switch to redirect to an appropriate screen
    if (finished) {
      setGameover(true);
    }

    // If the enemy died in the last turn, start tallying experience gains and such. 
    else if (!isEnemyAlive) {
      // Give player the gold for killing the enemy
      let goldGain = enemy.goldVal;
      let expGain = enemy.expVal;
      let potionGain = givePotion();

      let totalGold = player.totalGold + goldGain;
      let totalEXP = player.totalExp + expGain;
      let totalPotions = player.potions + potionGain;

      if (potionGain > 0) {
        dispatch({
          type: GAIN_LOOT,
          payload: {
            message: `You gained ${goldGain} gold, ${expGain} exp and found ${potionGain} potion(s)`,
            potions: totalPotions,
            gold: totalGold,
            exp: totalEXP
          }
        })
      } else {
        dispatch({
          type: GAIN_LOOT,
          payload: {
            message: `You gained ${goldGain} gold, ${expGain} exp`,
            potions: totalPotions,
            gold: totalGold,
            exp: totalEXP,
          }
        })
      }

      if (totalEXP > player.maxEXP) {
        setLevelUp(true);
      } else {
        setFinished(true);
      }
    }

    // Check if the player lost their HP during this turn. If they did, prepare for GameOver redirection.
    else if (checkForDeath(player.currentHP) == false) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `You have been defeated!!!`,
      })
      setCommandAvailability(false);
      setPlayerAliveness(false);
      setFinished(true);
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
    return (Math.round(Math.random() * (10 - 1 + 1)) + 1) * modifier;
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

  // Checks whether the defender lost all their health points
  function checkForDeath(defenderHP) {
    if (defenderHP <= 0) {
      return false;
    } else { return true }
  }

  // After winning a fight, you get the chance to win potions; this returns how many
  function givePotion() {
    // Works exactly like didEvade. There's a 10% chance to get a potion.
    var diceRoll = Math.random();
    var chanceForNothing = .9;
    if (diceRoll > chanceForNothing) {
      return 1;
    }
    else {
      return 0;
    }
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `A ${enemy.name} has appeared!`,
    })
  }, []);

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
        ) : (null)}
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
        {gameOver & isEnemyAlive ? (
          <Redirect to="/gameover" />
        ) : (null)}
        {gameOver & isPlayerAlive ? (
          <Redirect to="/city" />
        ) : (null)}
      </div>

      {/* Shows player's current HP */}
      <div id="health-bar">
        {player.currentHP} / {player.maxHP}
      </div>

      {/* Shows how many potions the player has in their posession */}
      <div id="potion-bar">
        {player.potions} Potions
      </div>

      {/* Shows how gold is in the player's possession' */}
      <div id="gold-bar">
        {player.totalGold} Gold
      </div>
    </div>
  );
};

export default BattleView;
