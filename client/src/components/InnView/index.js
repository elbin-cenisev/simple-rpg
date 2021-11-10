import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MESSAGE, REST } from '../../utils/actions';
import { useMutation } from '@apollo/client';

import { SAVE_CHARACTER } from '../../utils/mutations';

import './style.css'

function InnView() {

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const [save] = useMutation(SAVE_CHARACTER);

  const dispatch = useDispatch();

  const player = state.player;  // The player character
  const message = state.message;  // The message that informs players of what is going on

  const [cityVisit, setCityVisit] = useState(false);
  const [rested, setRest] = useState(false);

  function returnToCity() {
    setCityVisit(true);
  }

  function restInn() {
    if (player.totalGold < 50) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `Sorry, you need more money`,
      });
    } else {
      dispatch({
        type: REST,
        payload: {
          gold: player.totalGold - 50,
          hp: player.maxHP,
          message: "You restored your HP",
        }
      });
      setRest(true);
    }
  }

  async function saveCharacter() {
    try {
      const { data } = await saveCharacter({
        variables: {
          strength: player.strength,
          agility: player.agility,
          endurance: player.endurance,
          maxHP: player.maxHP,
          currentHP: player.maxHP,
          damMod: player.damMod,
          evaMod: player.evaMod,
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `Would you like to rest for 50g?`,
    })
  }, []);

  return (

    <div id="innView">

      {/* The message-bar displays what is currently going on */}
      <div id="message-bar">
        <p id="message">{message}</p>
      </div>

      {/* The city-window just shows an image of the inn you are in */}
      <div id="inn-window">

      </div>

      {/* The command-bar shows what the player can do */}
      <div id="command-bar">
        <div id="actions">
          <button onClick={returnToCity}>Leave</button>
          {rested ? (null) : (
            <button onClick={restInn}>Rest</button>
          )}
          <button onClick={saveCharacter}>Save</button>
        </div>
      </div>

      {/* Shows player's current HP */}
      <div id="health-bar">
        {player.currentHP} / {player.maxHP}
      </div>

      <div id="gold-bar">
        {player.totalGold} Gold
      </div>

      {/* Shows how many potions the player has in their posession */}
      <div id="potion-bar">
        {player.potions} Potions
      </div>

      {/* Shows how much gold the player has in their posession */}
      {cityVisit ? (
        <Redirect to="/city" />
      ) : (null)}

    </div>
  );
};

export default InnView;
