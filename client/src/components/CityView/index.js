import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MESSAGE } from '../../utils/actions';

import './style.css'
import { Grid } from 'semantic-ui-react';

function CityView() {

  // Since we manage a lot of states, just subscribe to the entire state
  let state = useSelector(state => state);

  const dispatch = useDispatch();

  const player = state.player;  // The player character
  const message = state.message;  // The message that informs players of what is going on

  const [storeVisit, setStoreVisit] = useState(false);
  const [innVisit, setInnVisit] = useState(false);
  const [leaveCity, setLeaveCity] = useState(false);

  function visitStore() {
    setStoreVisit(true);
  }

  function visitInn() {
    setInnVisit(true);
  }

  function goOut() {
    setLeaveCity(true);
  }

  useEffect(() => {
    dispatch({
      type: CHANGE_MESSAGE,
      payload: `Where do you want to go?`,
    })
  }, []);

  return (
    <>
      <Grid id="city-view">
        {/* The message-bar displays what is currently going on */}
        <Grid.Row centered id="message-bar">
          <p id="message">{message}</p>
        </Grid.Row>

        {/* The city-window just shows an image of the city you are in */}
        <Grid.Row centered id="city-window">
        </Grid.Row>

        {/* The command-bar shows what the player can do */}
        <Grid.Row id="command-bar" columns='equal'>
          <Grid.Column><button className="ui button blue" onClick={visitStore}>Go to Store</button></Grid.Column>
          <Grid.Column><button className="ui button blue" onClick={visitInn}>Go to Inn</button></Grid.Column>
          <Grid.Column><button className="ui button red" onClick={goOut}>Leave City</button></Grid.Column>
        </Grid.Row>
      </Grid>

      {
        storeVisit ? (
          <Redirect to="/store" />
        ) : (null)
      }
      {
        innVisit ? (
          <Redirect to="/inn" />
        ) : (null)
      }
      {
        leaveCity ? (
          <Redirect to="/battle" />
        ) : (null)
      }

      <audio
        controls
        autoPlay
        src="./music/town-music.mp3" type="audio/mpeg">
      </audio>
    </>
  );
};

export default CityView;
