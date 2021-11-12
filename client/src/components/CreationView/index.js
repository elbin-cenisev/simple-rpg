import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import {  } from 'semantic-ui-react';

import { SET_STATISTICS } from '../../utils/actions';
import { CREATE_CHARACTER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './style.css'

function CreationView() {
  const dispatch = useDispatch();

  // Boolean that tracks whether character creation is finished
  const [finished, setFinished] = useState(false);

  // Available points to distribute
  const [points, setPoints] = useState(5);

  // Base statistics for character
  const [strength, setStrength] = useState(0);
  const [agility, setAgility] = useState(0);
  const [endurance, setEndurance] = useState(0);

  // Derived statistics for character
  let maxHP = 20 + (4 * endurance);
  let damMod = 1 + (0.2 * strength);
  let evaMod = 0.05 + (0.05 * agility);

  const [createCharacter] = useMutation(CREATE_CHARACTER);

  const [formState, setFormState] = useState({ characterName: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  async function handleFormSubmit(event) {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    if (points == 0) {
      dispatch({
        type: SET_STATISTICS,
        payload: {
          characterName: formState.characterName,
          strength: strength,
          agility: agility,
          endurance: endurance,
          maxHP: maxHP,
          currentHP: maxHP,
          damMod: damMod,
          evaMod: evaMod,
          gold: 100,
          exp: 0,
          potions: 0,
        }
      });

      try {
        const { data } = await createCharacter({
          variables: {
            characterName: formState.characterName,
            strength: strength,
            agility: agility,
            endurance: endurance,
            maxHP: maxHP,
            currentHP: maxHP,
            damMod: damMod,
            evaMod: evaMod,
            gold: 100,
            exp: 0,
            potions: 0,
          }
        });
      } catch (err) {
        console.error(err);
      }

      setFinished(true);
    }

    else if (points > 0) {
      alert("Please distribute all your points first!");
    }
  }

  return (
    <div id="creationView">
      <div id="characterName">
        <input
          placeholder="Your character's name"
          name="characterName"
          type="text"
          id="characterName"
          onChange={handleChange}
        />
      </div>
      <div id="statistics">
        <div id="availablePoints">
          Available Points: {points}
        </div>
        <div id="strengthDiv">
          Strength: {strength}
          <button
            onClick={() => {
              if (points > 0) {
                setPoints(points - 1);
                setStrength(strength + 1);
              }
            }
            }>Increase</button>

          <button onClick={() => {
            if (strength > 0) {
              setPoints(points + 1);
              setStrength(strength - 1);
            }
          }}>Decrease</button>
        </div>

        <div id="agilityDiv">
          Agility: {agility}
          <button
            onClick={() => {
              if (points > 0) {
                setPoints(points - 1);
                setAgility(agility + 1);
              }
            }
            }>Increase</button>

          <button onClick={() => {
            if (agility > 0) {
              setPoints(points + 1);
              setAgility(agility - 1);
            }
          }}>Decrease</button>
        </div>

        <div id="enduranceDiv">
          Endurance: {endurance}

          <button
            onClick={() => {
              if (points > 0) {
                setPoints(points - 1);
                setEndurance(endurance + 1);
              }
            }
            }>Increase</button>

          <button onClick={() => {
            if (endurance > 0) {
              setPoints(points + 1);
              setEndurance(endurance - 1);
            }
          }}>Decrease</button>
        </div>
      </div>

      <div id="derivedStats">
        <p>Maximum HP: {maxHP}</p>
        <p>Evasion Modifier: {Math.round(evaMod * 100)}%</p>
        <p>Damage Modifier: {damMod * 100}%</p>
      </div>

      <button onClick={handleFormSubmit}>Create your Character</button>

      {finished ? (
        <Redirect to="/city" />
      ) : (null)}


    </div>
  );
};

export default CreationView;
