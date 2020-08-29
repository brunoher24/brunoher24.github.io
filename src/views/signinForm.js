import React, { Component } from 'react';
import _ from 'lodash';
import { signinWithEmailAndPassword } from '../api/firebase-auth';

/**
 * @name { SigninForm }
 * @type
 * @using {  }
 * @description
 */
export default class SigninForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        email: '',
        pwd: ''
    };
  }

  submitHandler = event => {
    event.preventDefault();
    signinWithEmailAndPassword(this.state.email, this.state.pwd);
  }

  changeInput = (id, event) => {
    this.setState({
        [`${id}`]: event.target.value,
    })
  };

  render() {

    return (
      <div className="">
          <form onSubmit={this.submitHandler}>
            <label htmlFor='input-mail'>Adresse mail</label>
            <input id='input-mail' type='mail' placeholder='Adresse mail' onChange={_.partial(this.changeInput, 'email')} />
            <label htmlFor='input-password'>Password</label>
            <input id='input-password' type='password' placeholder='Mot de passe' onChange={_.partial(this.changeInput, 'pwd')} />
            <input type='submit' value='Connexion'/>
          </form>
      </div>
    );
  }
}
