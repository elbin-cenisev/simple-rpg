import React, { } from 'react';
import CityView from '../components/CityView';
import Header from '../components/Header';
import Status from '../components/Status';

function CityScreen() {
  return (
    <>
      <div>
        <h1>Get prepared!</h1>
        <Header />
        <CityView />
        <Status />
      </div>
    </>
  );
}

export default CityScreen;