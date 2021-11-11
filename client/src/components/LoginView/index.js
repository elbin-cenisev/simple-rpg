import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { } from '../../utils/actions';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Form, Grid } from 'semantic-ui-react';

import './style.css';

function LoginView() {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="window">
      <div className="login-block">
        <Grid>

          {/* Welcome Message */}
          <Grid.Row textAlign="center">
            <Grid.Column>
              <h1 className="welcome-text">Are you ready?</h1>
              <p className="welcome-text">For a game so incredible, so vast and so unbelievably great that you will lose your
                mind? Well, this isn't it! This is an unfinished proof-of-concept, and I just
                couldn't think of anything else to write here on the login screen. </p>
            </Grid.Column>
          </Grid.Row>

          {/* Login Form */}
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                  <label htmlFor="email">Email address: </label>
                  <input
                    placeholder="Email Address..."
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
                <Form.Field>
                  {
                    error ? (
                      <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                      </div>
                    ) : null
                  }
                </Form.Field>
                <button className="ui button" type="submit">Login</button>
                <Link to="/signup">Go to Signup</Link>

              </Form >
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {
          Auth.loggedIn() ? (
            <Redirect to="/select" />
          ) : (null)
        }

      </div>
    </div>
  );
}

export default LoginView;
