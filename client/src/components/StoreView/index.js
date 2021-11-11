import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BUY_POTION, CHANGE_MESSAGE } from '../../utils/actions';

import './style.css'

function StoreView() {

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const dispatch = useDispatch();

  const player = state.player;  // The player character
  const message = state.message;  // The message that informs players of what is going on

  const [cityVisit, setCityVisit] = useState(false);

  function returnToCity() {
    setCityVisit(true);
  }

  function sellItem() {
    if (player.totalGold < 50) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `Sorry, you need more money`,
      });
    } else {
      dispatch({
        type: BUY_POTION,
        payload: {
          gold: player.totalGold - 50,
          potions: player.potions + 1,
          message: "Thank you!",
        }
      });
    }
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `Welcome! What do you want to buy?`,
    })
  }, []);

  return (

    <div id="storeView">

      {/* The message-bar displays what is currently going on */}
      <div id="message-bar">
        <p id="message">{message}</p>
      </div>

      {/* The city-window just shows an image of the inn you are in */}
      <div id="store-window">

      </div>

      {/* The command-bar shows what the player can do */}
      <div id="command-bar">
        <div id="actions">
          <button onClick={returnToCity}>Leave</button>
          <button onClick={sellItem}>Buy Potion</button>
        </div>
      </div>

      {/* Shows player's current HP */}
      <div id="health-bar">
        {player.currentHP} / {player.maxHP}
      </div>

      {/* Shows how much gold is in the player's posession */}
      <div id="gold-bar">
        {player.gold} Gold
      </div>

      {/* Shows how many potions the player has in their posession */}
      <div id="potion-bar">
        {player.potions} Potions
      </div>

      {cityVisit ? (
        <Redirect to="/city" />
      ) : (null)}

    </div>
  );
};

export default StoreView;
