import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header.jsx';
import Main from './Components/Main.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
