import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import HomeView from './components/HomeView';
import ScenariosView from './components/ScenariosView';
import GrafanaDashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import './App.css';

const menuButtonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  background: '#aaf',
  color: 'white',
  zIndex: 1000,
};

const menuOptionStyle = {
  textDecoration: 'none',
  color: 'inherit',
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mapCenter: [37.968357764526694, 23.76709967851639],
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget }, () => {
      document.addEventListener('click', this.handleCloseOutside);
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null }, () => {
      document.removeEventListener('click', this.handleCloseOutside);
    });
  };

  handleCloseOutside = (event) => {
    if (this.state.anchorEl && !this.state.anchorEl.contains(event.target)) {
      this.setState({ anchorEl: null });
      document.removeEventListener('click', this.handleCloseOutside);
    }
  };

  render () {
    const { anchorEl, mapCenter } = this.state;
    return (
      <Router>
        <div className='App'>
          <Button
            aria-controls='menu'
            aria-haspopup='true'
            onClick={this.handleClick}
            style={menuButtonStyle}
          >
            <MenuIcon fontSize='large' />
          </Button>
          <Menu
            id='menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <Link to='/home' style={menuOptionStyle}>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <Link to='/scenarios' style={menuOptionStyle}>
                Scenarios
              </Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <Link to='/grafana' style={menuOptionStyle}>
                Grafana
              </Link>
            </MenuItem>
          </Menu>
          <Routes>
            <Route path='/' element={<HomeView center={mapCenter} zoom={20} />} />
            <Route path='/home' element={<HomeView center={mapCenter} zoom={20} />} />
            <Route path='/scenarios' element={<ScenariosView center={mapCenter} zoom1={17} zoom2={16} />} />
            <Route path='/grafana' element={<GrafanaDashboard />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
