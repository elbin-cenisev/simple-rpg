import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { } from '../../utils/actions';

import './style.css';

function CommandBar() {
  // Boolean that checks whether it is a player's turn (true) or not (false)
  const playerTurn = useSelector(state => state.playerTurn)

  function attack() {
    console.log("attack");
  }

  function flee() {
    console.log("flee")
  }

  function useItem() {
    console.log("use potion")
  }

  return (
    <div id="command-bar">
      {playerTurn ? (
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
