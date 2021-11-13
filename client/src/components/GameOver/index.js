import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BUY_POTION, CHANGE_MESSAGE } from '../../utils/actions';

import './style.css'
import { Grid } from 'semantic-ui-react';

function GameOver() {
  const dispatch = useDispatch();

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const [returnToSelect, setReturn] = useState(false);
  const message = state.message;  // The message that informs players of what is going on

  function exitGameover() {
    setReturn(true);
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `You were defeated... Do you want to try again?`,
    })
  }, []);

  return (
    <>
      <Grid id="store-view">
        {/* The message-bar displays what is currently going on */}
        <Grid.Row centered id="message-bar">
          <p id="message">{message}</p>
        </Grid.Row>

        {/* The city-window just shows an image of the city you are in */}
        <Grid.Row centered id="gameover-window">
        </Grid.Row>

        {/* The command-bar shows what the player can do */}
        <Grid.Row id="command-bar" columns='equal'>
          <Grid.Column><button className="ui button blue" onClick={exitGameover}>Return to Character Select</button></Grid.Column>
        </Grid.Row>
      </Grid>

      {returnToSelect ? (
        <Redirect to="/select" />
      ) : (null)}
    </>
  );
};

export default GameOver;
