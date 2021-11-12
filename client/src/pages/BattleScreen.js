import React, { } from 'react';
import BattleView from '../components/BattleView';
import Header from '../components/Header';
import Status from '../components/Status';

function BattleScreen() {
  return (
    <>
      <div>
        <h1>BattleScreen</h1>
          <BattleView />
          <Status />
      </div>
    </>
  );
}

export default BattleScreen;
