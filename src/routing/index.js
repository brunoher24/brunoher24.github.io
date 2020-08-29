import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SigninForm from '../views/SigninForm';
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
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signinForm">
          <SigninForm />
        </Route>
        {/* <Route path="/about">
          <About />
        </Route>
        */}
      </Switch>
    );
  }
}
