import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { } from '../../utils/actions';


import './style.css'

function CreationView() {
  const [strength, setStrength] = useState(0);
  const [agility, setAgility] = useState(0);
  const [endurance, setEndurance] = useState(0);

  return (
    <div id="creationView">

      {/* The message-bar displays what is currently going on */}
      <div id="statistics">
        <div id="strengthDiv">
          Strength: {strength}
          <button>Increase</button>
          <button>Decrease</button>
        </div>

        <div id="agilityDiv">
          Agility: {agility}
          <button>Increase</button>
          <button>Decrease</button>
        </div>

        <div id="enduranceDiv">
          Endurance: {endurance}
          <button>Increase</button>
          <button>Decrease</button>
        </div>
      </div>
    </div>
  );
};

export default CreationView;
