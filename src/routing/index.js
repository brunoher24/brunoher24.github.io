import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SigninForm from '../views/SigninForm';
import SignupForm from '../views/SignupForm';
import Event from '../views/Event';
import Home from '../views/Home';

/**
 * @name { RouterApp }
 * @type
 * @using {  }
 * @description
 */
export default class RouterApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="">
          <Switch>

          <Route exact path="/">
            <Home />
          </Route>
        
          <Route path="/signupForm">
            <SignupForm />
          </Route>
          
          <Route path="/signinForm">
            <SigninForm />
          </Route>

          <Route path="/events">
            <Event />
          </Route> 
        </Switch>
      </div>
    );
  }
}
