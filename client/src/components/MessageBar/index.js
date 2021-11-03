import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { START_BATTLE } from '../../utils/actions';

import './style.css';


function MessageBar() {
  const dispatch = useDispatch();

  const message = useSelector(state => state.message);

  // Boolean that checks whether it is a player's turn (true) or not (false)
  const playerTurn = useSelector(state => state.playerTurn);

  function progressTurn() {

  }

  return (
    <div id="message-bar">
      <p id="message">{message}</p>
      {playerTurn ? (
        <span>(Select an action)</span>
      ) : (
        <button onClick={progressTurn}>Continue</button>
      )}
    </div>
  );
};

export default MessageBar;
