import React, { } from 'react';
import InnView from '../components/InnView';
import Header from '../components/Header';
import Status from '../components/Status';

function InnScreen() {
  return (
    <>
      <div>
        <Header />
        <InnView />
        <Status />
      </div>
    </>
  );
}

export default InnScreen;
