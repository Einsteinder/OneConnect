import React, { Component } from 'react';
import './App.css';
import BarWithSearch from './BarWithSearch';
import Users from './Users';

class App extends Component {
  render() {
    return (
      <div>
      <BarWithSearch/>
      <Users/>
      </div>
    );
  }
}

export default App;
