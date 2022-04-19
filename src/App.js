import React, { Component } from 'react';
import MapView from './components/MapView';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <MapView center = {[37.968357764526694, 23.76709967851639]} zoom1 = {17} zoom2 = {15} />
      </div>
    );
  }
}