import React from 'react';
import logo from './logo.svg';
import './App.css';
import { initFirebase } from './api/firebase-config';

import {
  Router,
  HashRouter, Link
} from "react-router-dom";
import RouterApp from './routing';

import {createBrowserHistory } from 'history';

export const {auth} = initFirebase();

export const history = createBrowserHistory();



function App() {
  return (
    <Router history={history}>
      <HashRouter>
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
      </HashRouter>
    </Router>

  );
}

export default App;
