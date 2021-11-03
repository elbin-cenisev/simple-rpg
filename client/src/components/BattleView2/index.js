import React, { } from 'react';
import './style.css'

function BattleView() {

    let commandsAvailable = true;
    let message = "test";

    // The player decides to make an attack
    function attack() {
      console.log("attack");
    }
  
    // The player decides to flee
    function flee() {
      console.log("flee")
    }
  
    // The player decides to use an item (currently only potion)
    function useItem() {
      console.log("use potion")
    }

    function progressTurn() {
      console.log("Test");
    }

  return (
    <div id="battleView">
      <div id="message-bar">
        <p id="message">{message}</p>
        {commandsAvailable ? (
          <span>(Select an action)</span>
        ) : (
          <button onClick={progressTurn}>Continue</button>
        )}
      </div>
      <div id="enemy-window">
        <img src={'./images/slime.png'} />
      </div>
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
