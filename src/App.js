import React, { Component } from 'react';
import './App.css';
import { initFirebase } from './api/firebase-config';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import RouterApp from './routing';


import { createBrowserHistory } from 'history';
export const { auth } = initFirebase();
export const history = createBrowserHistory();

/**
 * @name {  }
 * @type
 * @using {  }
 * @description
 */
export default class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/signinForm">Se connecter</Link>
              </li>
              <li>
                <Link to="/signupForm">S'inscrire</Link>
              </li>
            </ul>
          </nav>
        </div>
        <RouterApp />
      </Router>
    );
  }
}
