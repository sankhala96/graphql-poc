import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Router, Route, BrowserRouter , IndexRoute} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ArtistList from './components/ArtistList'
import ArtistDetail from './ArtistDetail';

const client = new ApolloClient({
    uri: "http://172.26.58.80:5000/graphql"
});

const Root = () => {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <div>
                  <Route path='/' component={App} />
                  <Route path='/artist/:id' render={(props) => <ArtistDetail {...props} />} />
              </div>
          </BrowserRouter>
      </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
