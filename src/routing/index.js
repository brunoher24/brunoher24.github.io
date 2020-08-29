import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SigninForm from '../views/signinForm';
import Home from '../views/Home';

/**
 * @name {  }
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
        
          {/* <Route path="/about">
            <About />
          </Route>
          */}
          <Route path="/signinForm">
            <SigninForm />
          </Route> 
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}
