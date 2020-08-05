import React from 'react';

import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/screens/Home';
import ArtistScreen from './components/screens/ArtistScreen';

import './App.css';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="container">
        <Switch>
          <Route path="/artists/:artistId">
            <ArtistScreen />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
