import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_STATISTICS } from '../../utils/actions';


import './style.css'

function CreationView() {
  const dispatch = useDispatch();
  const player = useSelector(state => state.player);

  const [points, setPoints] = useState(5);
  const [strength, setStrength] = useState(0);
  const [agility, setAgility] = useState(0);
  const [endurance, setEndurance] = useState(0);

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

        <button onClick={() => {
          if (points == 0) {
            dispatch({ 
              type: SET_STATISTICS, 
              payload: {
                strength: strength,
                agility: agility,
                endurance: endurance,
              } 
            })
          } else if(points > 0) {
            alert("Please distribute all your points first!")
          } 
          console.log(player.statistics);
        }}>Create your Character
        </button>
      </div>
    </div >
  );
};

export default CreationView;
