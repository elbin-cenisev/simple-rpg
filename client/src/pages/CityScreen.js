import React, { } from 'react';
import CityView from '../components/CityView';
import Header from '../components/Header';

function CityScreen() {
  return (
    <>
      <div>
        <h1>Get prepared!</h1>
        <Header />
        <CityView />
      </div>
    </>
  );
}

export default CityScreen;