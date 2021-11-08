import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MESSAGE, USE_POTION, GAIN_LOOT } from '../../utils/actions';

import './style.css'

function CityView() {

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const dispatch = useDispatch();

  const player = state.player;  // The player character
  const message = state.message;  // The message that informs players of what is going on

  const [storeVisit, setStoreVisit] = useState(false);
  const [innVisit, setInnVisit] = useState(false);

  function visitStore() {
    setStoreVisit(true);
  }

  function visitInn() {
    setInnVisit(true);
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `Where do you want to go?`,
    })
  }, []);

  return (

    <div id="cityView">

      {/* The message-bar displays what is currently going on */}
      <div id="message-bar">
        <p id="message">{message}</p>
      </div>

      {/* The city-window just shows an image of the inn you are in */}
      <div id="city-window">

      </div>

      {/* The command-bar shows what the player can do */}
      <div id="command-bar">
        <div id="actions">
          <button onClick={visitStore}>Go to Store</button>
          <button onClick={visitInn}>Go to Rest</button>
        </div>
      </div>

      {/* Shows player's current HP */}
      <div id="health-bar">
        {player.currentHP} / {player.maxHP}
      </div>

      {/* Shows how many potions the player has in their posession */}
      <div id="potion-bar">
        {player.potions} Potions
      </div>

      {storeVisit ? (
        <Redirect to="/store" />
      ) : (null)}
      {innVisit ? (
        <Redirect to="/inn" />
      ) : (null)}

    </div>
  );
};

export default CityView;
