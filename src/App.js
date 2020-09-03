import React, { Component } from 'react';
import './App.css';
import { initFirebase } from './api/firebase-config';
import { storage } from './helpers/storage';
import Header from './views/small_components/Header';

import {
  BrowserRouter as Router
} from "react-router-dom";
import RouterApp from './routing';

import { createBrowserHistory } from 'history';
export const { auth, db, firebase, error_msgs } = initFirebase();
export const history = createBrowserHistory();

/**
 * @name {  }
 * @type
 * @using {  }
 * @description
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: storage.getItem('user'),
      refresh: false
    };    
  }
  refreshed = (prop, value) => {
    const refresh = !this.state.refresh;
    this.setState({
      [`${prop}`]: value
    });
  }


  render() {
    const user = storage.getItem('user');
    return (
      <Router history={history}>
        <div>
          <Header refreshed={this.refreshed} user={user}/>
        </div>
        <RouterApp refreshed={this.refreshed} user={user} />
      </Router>
    );
  }
}
