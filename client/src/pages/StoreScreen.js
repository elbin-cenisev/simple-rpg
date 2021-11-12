import React, { } from 'react';
import StoreView from '../components/StoreView';
import Header from '../components/Header';
import Status from '../components/Status';

function StoreScreen() {
  return (
    <>
      <div>
        <Header />
        <StoreView />
        <Status />
      </div>
    </>
  );
}

export default StoreScreen;
