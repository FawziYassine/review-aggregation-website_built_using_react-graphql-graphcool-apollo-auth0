import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from 'apollo-link';
import CreateMovie from './components/CreateMovie'
//import 'bootstrap/dist/css/bootstrap.css';

const httpLink = new HttpLink({
    // Replace this with your Graphcool server URL
    uri: 'https://api.graph.cool/simple/v1/cje71rgb62jys01170jso562f',
  })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <ApolloProvider client = {client}>
        <div>
          <Route exact path ="/" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/create" render={(props) => <CreateMovie auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
        </ApolloProvider>
      </Router>
  );
}
