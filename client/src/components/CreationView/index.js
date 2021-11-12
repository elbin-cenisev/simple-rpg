import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Form, Statistic, Divider, Icon, Header } from 'semantic-ui-react';

import { SET_STATISTICS } from '../../utils/actions';
import { CREATE_CHARACTER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './style.css'

function CreationView() {
  const dispatch = useDispatch();

  // Boolean that tracks whether character creation is finished
  const [finished, setFinished] = useState(false);

  // Available points to distribute
  const [points, setPoints] = useState(5);

  // Base statistics for character
  const [strength, setStrength] = useState(0);
  const [agility, setAgility] = useState(0);
  const [endurance, setEndurance] = useState(0);

  // Derived statistics for character
  let maxHP = 20 + (4 * endurance);
  let damMod = 1 + (0.2 * strength);
  let evaMod = (0.05 + (0.05 * agility));

  const [createCharacter] = useMutation(CREATE_CHARACTER);

  const [formState, setFormState] = useState({ characterName: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  async function handleFormSubmit(event) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    if (points == 0) {

      dispatch({
        type: SET_STATISTICS,
        payload: {
          characterName: formState.characterName,
          strength: strength,
          agility: agility,
          endurance: endurance,
          maxHP: maxHP,
          currentHP: maxHP,
          damMod: damMod,
          evaMod: evaMod,
          gold: 100,
          exp: 0,
          potions: 0,
        }
      });

      try {
        const { data } = await createCharacter({
          variables: {
            characterName: formState.characterName,
            strength: strength,
            agility: agility,
            endurance: endurance,
            maxHP: maxHP,
            currentHP: maxHP,
            damMod: damMod,
            evaMod: evaMod,
            gold: 100,
            exp: 0,
            potions: 0,
          }
        });
      } catch (err) {
        console.error(err);
      }

      setFinished(true);
    }

    else if (points > 0) {
      alert("Please distribute all your points first!");
    }
  }

  return (
    <div className="creation-view">
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Character Name</label>
            <input
              placeholder="Your character's name"
              name="characterName"
              type="text"
              id="characterName"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Statistic>
              <Statistic.Value>{points}</Statistic.Value>
              <Statistic.Label>Available Points</Statistic.Label>
            </Statistic>
          </Form.Field>
        </Form.Group>

        {/* Base Statistics */}
        <div className="base-statistics">
          <Divider horizontal>
            <Header as='h4'>
              Base Statistics
            </Header>
          </Divider>

          <Form.Group unstackable widths='equal'>
            <Form.Field>
              <button className="ui button icon"
                onClick={() => {
                  if (strength > 0) {
                    setPoints(points + 1);
                    setStrength(strength - 1);
                  }
                }}><Icon name='minus circle' /></button>
            </Form.Field>

            <Form.Field>
              <Statistic horizontal>
                <Statistic.Value>{strength}</Statistic.Value>
                <Statistic.Label>Strength</Statistic.Label>
              </Statistic>
            </Form.Field>

            <Form.Field>
              <button className="ui button icon"
                onClick={() => {
                  if (points > 0) {
                    setPoints(points - 1);
                    setStrength(strength + 1);
                  }
                }}><Icon name='plus circle' /></button>
            </Form.Field>
          </Form.Group>

          <Form.Group unstackable widths='equal'>
            <Form.Field>
              <button className="ui button icon"
                onClick={() => {
                  if (agility > 0) {
                    setPoints(points + 1);
                    setAgility(agility - 1);
                  }
                }}><Icon name='minus circle' /></button>
            </Form.Field>

            <Form.Field>
              <Statistic horizontal>
                <Statistic.Value>{agility}</Statistic.Value>
                <Statistic.Label>agility</Statistic.Label>
              </Statistic>
            </Form.Field>

            <Form.Field>
              <button className="ui button icon"
                onClick={() => {
                  if (points > 0) {
                    setPoints(points - 1);
                    setAgility(agility + 1);
                  }
                }}><Icon name='plus circle' /></button>
            </Form.Field>
          </Form.Group>

          <Form.Group unstackable widths='equal'>
            <Form.Field>
              <button className="ui button icon"
                onClick={() => {
                  if (endurance > 0) {
                    setPoints(points + 1);
                    setEndurance(endurance - 1);
                  }
                }}><Icon name='minus circle' /></button>
            </Form.Field>

            <Form.Field>
              <Statistic horizontal>
                <Statistic.Value>{endurance}</Statistic.Value>
                <Statistic.Label>endurance</Statistic.Label>
              </Statistic>
            </Form.Field>

            <Form.Field>
              <button className="ui button icon"
                onClick={() => {
                  if (points > 0) {
                    setPoints(points - 1);
                    setEndurance(endurance + 1);
                  }
                }}><Icon name='plus circle' /></button>
            </Form.Field>
          </Form.Group>
        </div>

        {/* Derived Statistics */}
        <div className='derived-statistics'>
          <Divider horizontal>
            <Header as='h4'>
              Derived Statistics
            </Header>
          </Divider>
          <Form.Group widths='equal'>
            <Form.Field>
              <Statistic>
                <Statistic.Value>{maxHP}</Statistic.Value>
                <Statistic.Label>Max HP</Statistic.Label>
              </Statistic>
            </Form.Field>

            <Form.Field>
              <Statistic>
                <Statistic.Value>{damMod}</Statistic.Value>
                <Statistic.Label>Damage Mod</Statistic.Label>
              </Statistic>
            </Form.Field>

            <Form.Field>
              <Statistic>
                <Statistic.Value>{evaMod.toFixed(2) * 100}%</Statistic.Value>
                <Statistic.Label>Evasion Chance</Statistic.Label>
              </Statistic>
            </Form.Field>
          </Form.Group>
        </div>

      </Form>

      <div className="done-section">
        <Divider horizontal>
          <Header as='h4'>
            Done
          </Header>
        </Divider>
        <button className="button ui primary" onClick={handleFormSubmit}>Create your Character</button>
      </div>

      {finished ? (
        <Redirect to="/city" />
      ) : (null)}

    </div >
  );
};

export default CreationView;
