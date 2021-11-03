import React, { } from 'react';
import './style.css';

function CommandBar() {
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
      <button onClick={flee}>Flee</button>
      <button onClick={attack}>Attack</button>
      <button onClick={useItem}>Potion</button>
    </div>
  );
};

export default CommandBar;
