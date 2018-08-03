import React, { Component } from 'react';
import { Router } from "@reach/router"
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Home from './pages/Home'
import AddFace from './pages/AddFace'
import RecognizeFace from './pages/RecognizeFace'

const {
  REACT_APP_GRAPHQL_URL
} = process.env

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_URL
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Home path="/" />
          <AddFace path="/add-face" />
          <RecognizeFace path="/recognize-face" />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
