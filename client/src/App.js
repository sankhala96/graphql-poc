import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ArtistList from './components/ArtistList'


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Artist</h1>
        </header>
        <ArtistList />
      </div>
    );
  }
}



export default App;
