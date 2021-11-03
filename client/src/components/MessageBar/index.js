import React, { useEffect } from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { START_BATTLE } from '../../utils/actions';

import './style.css';


function MessageBar() {
  const dispatch = useDispatch();

  // Name of the enemy
  // This is currently hardcoded since I only have one enemy
  const enemy = "Slime";

  // Boolean that checks whether it is a player's turn (true) or not (false)
  const playerTurn = useSelector(state => state.playerTurn)

  // The message displayed within the Message Bar.
  let messageEl = document.getElementById("message");
  const [currentMessage, setMessage] = useState(`A ${enemy} has appeared!`);

  function progressTurn() {
    console.log("Test")
  }

  return (
    <div id="message-bar">
      <p id="message">{currentMessage}</p>
      {playerTurn ? (
        <button onClick={progressTurn}>Continue</button>
      ) : (
        <span>(Select an action)</span>
      )}
    </div>
  );
};

export default MessageBar;
