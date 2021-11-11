import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { Form, Grid } from 'semantic-ui-react';

import './style.css';

function SignupView() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="window">
      <div className="login-block">
        <Grid>
          <Grid.Row textAlign="center">
            <Grid.Column>
              <h1 className="welcome-text">Sign Up</h1>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={handleFormSubmit}>

                <Form.Field>
                  <label htmlFor="firstName">First Name: </label>
                  <input
                    placeholder="First"
                    name="firstName"
                    id="firstName"
                    onChange={handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    placeholder="Last"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="email">Email: </label>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="pwd">Password: </label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                  />
                </Form.Field>

                <button className="ui button" type="submit">Signup</button>
                <Link to="/login"> Go to Login</Link>

              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div >
    </div >
  );
}

export default SignupView;