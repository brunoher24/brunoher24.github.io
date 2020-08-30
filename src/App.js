import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { initFirebase } from './api/firebase-config';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import RouterApp from './routing';


import { createBrowserHistory } from 'history';
export const { auth, db } = initFirebase();
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
    this.$menuLi = React.createRef();
  }

  switchMenuState = () => {
    const ref = this.$menuLi.current;
    ref.className = ref.className === 'displayed' ? 'hide' : 'displayed';
  }

  render() {
    return (
      <Router history={history}>
        <div>

          <header>
            <Link id='logo-left' to="/">            
           
              {'clap'}<span>{'.'}</span>{'family'}
           
            </Link>
            <nav>
              <FontAwesomeIcon onClick={this.switchMenuState} id='menu-burger-icon' icon={faAlignJustify} />              
              <ul ref={this.$menuLi}>
                <li onClick={this.switchMenuState}>
                  <Link  to="/">Accueil</Link>
                </li>
                <li onClick={this.switchMenuState}>
                  <Link to="/signinForm">Se connecter</Link>
                </li>
                <li onClick={this.switchMenuState}>
                  <Link to="/signupForm">S'inscrire</Link>
                </li>
                <li onClick={this.switchMenuState}>
                  <Link to="/createEventForm">Ajouter un événement</Link>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        <RouterApp />
      </Router>
    );
  }
}
