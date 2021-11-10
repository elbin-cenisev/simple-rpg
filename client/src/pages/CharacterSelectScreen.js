import React, { } from 'react';
import Header from '../components/Header';
import SelectView from '../components/CharacterSelectView';

function CharacterCreationScreen() {
  return (
    <>
      <div>
        <h1>CharacterCreationScreen</h1>
        <Header />
        <SelectView />
      </div>
    </>
  );
}

export default CharacterCreationScreen;
