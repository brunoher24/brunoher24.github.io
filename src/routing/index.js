import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SignupForm from '../views/SignupForm';
import Event from '../views/Event/index';
import CreateEventForm from '../views/CreateEventForm';
import Home from '../views/Home';
import Room from '../views/Room';
import SigninForm from '../views/SigninForm';

/**
 * @name { RouterApp }
 * @type
 * @using {  }
 * @description
 */
export default class RouterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  refreshed = (prop, value) => {
    console.log(this.props);
    this.props.refreshed(prop, value);
  }

  render() {
    const user = this.props.user;
    return (
      <div className="">
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/signupForm">
            <SignupForm refreshed={this.refreshed}/>
          </Route>

          <Route path="/signinForm">
            <SigninForm refreshed={this.refreshed}/>
          </Route>

          <Route path="/events">
            <Event user={user}/>
          </Route>

          <Route path="/createEventForm">
            <CreateEventForm />
          </Route>

          <Route path="/room/:token">
            <Room />
          </Route>

        </Switch>
      </div>
    );
  }
}
