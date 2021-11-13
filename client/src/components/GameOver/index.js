import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BUY_POTION, CHANGE_MESSAGE } from '../../utils/actions';

import './style.css'
import { Grid } from 'semantic-ui-react';

function StoreView() {

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const dispatch = useDispatch();

  const player = state.player;  // The player character
  const message = state.message;  // The message that informs players of what is going on

  const [cityVisit, setCityVisit] = useState(false);

  function returnToCity() {
    setCityVisit(true);
  }

  function sellItem() {
    if (player.gold < 25) {
      dispatch({
        type: CHANGE_MESSAGE,
        payload: `Sorry, you need more money`,
      });
    } else {
      dispatch({
        type: BUY_POTION,
        payload: {
          gold: player.gold - 25,
          potions: player.potions + 1,
          message: "Thank you!",
        }
      });
    }
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `Welcome! Would you like a health potion for 25 gold?`,
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
        <Grid.Row centered id="store-window">
        </Grid.Row>

        {/* The command-bar shows what the player can do */}
        <Grid.Row id="command-bar" columns='equal'>
          <Grid.Column><button className="ui button blue" onClick={returnToCity}>Return to City</button></Grid.Column>
          <Grid.Column><button className="ui button blue" onClick={sellItem}>Buy Potion</button></Grid.Column>
        </Grid.Row>
      </Grid>

      {cityVisit ? (
        <Redirect to="/city" />
      ) : (null)}
    </>
  );
};

export default StoreView;
