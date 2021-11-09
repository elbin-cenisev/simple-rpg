import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import GameProvider from './utils/GameContext';
import BattleScreen from './pages/BattleScreen';
import GameOverScreen from './pages/GameOverScreen';
import CityScreen from './pages/CityScreen';
import StoreScreen from './pages/StoreScreen';
import InnScreen from './pages/InnScreen';
import CreationScreen from './pages/CharacterCreationScreen';
import LoginScreen from './pages/LoginScreen';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <GameProvider>
            <Switch>
              <Route exact path="/" component={LoginScreen} />
              <Route exact path="/gameover" component={GameOverScreen} />
              <Route exact path="/battle" component={BattleScreen} />
              <Route exact path="/city" component={CityScreen} />
              <Route exact path="/store" component={StoreScreen} />
              <Route exact path="/inn" component={InnScreen} />
              <Route exact path="/createCharacter" component={CreationScreen} />
            </Switch>
          </GameProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
