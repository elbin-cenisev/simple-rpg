import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_STATISTICS } from '../../utils/actions';
import { Redirect } from 'react-router-dom'

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

  return (
    <div id="creationView">
      {/* The message-bar displays what is currently going on */}
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

      <button onClick={() => {
        if (points == 0) {
          dispatch({
            type: SET_STATISTICS,
            payload: {
              strength: strength,
              agility: agility,
              endurance: endurance,
              maxHP: maxHP,
              damMod: damMod,
              evaMod: evaMod,
            }
          });

          setFinished(true);

        } else if (points > 0) {
          alert("Please distribute all your points first!");
        }
      }}>Create your Character
      </button>

      {finished ? (
        <Redirect to="/city" />
      ) : (null)}

      
    </div>
  );
};

export default CreationView;
