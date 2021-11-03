import React, { } from 'react';
import MessageBar from '../components/MessageBar';
import BattleView from '../components/BattleView';
import CommandBar from '../components/CommandBar';

function BattleScreen() {
  return (
    <>
      <div>
        <h1>BattleScreen</h1>
        <MessageBar />
        <BattleView />
        <CommandBar />
      </div>
    </>
  );
}

export default BattleScreen;
