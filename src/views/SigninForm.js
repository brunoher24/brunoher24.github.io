import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { signinWithEmailAndPassword } from '../api/firebase-auth';
import { readData } from '../api/firebase-firestore';
import { storage } from '../helpers/storage';
import './SignupForm.css';

/**
 * @name { SigninForm }
 * @type
 * @using {  }
 * @description
 */
class SigninForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        email: '',
        pwd: ''
    };
  }

  submitHandler = event => {
    event.preventDefault();
    console.log(this.state.email, this.state.pwd);
    signinWithEmailAndPassword(this.state.email, this.state.pwd).then(async uid => {
        const user = await readData('users', uid);
        storage.set('user', user);
        
    }).catch(error => {
        console.log('Une erreur est survenue !', error);
    });
  }

  changeInput = (id, event) => {
    this.setState({
        [`${id}`]: event.target.value,
    })
  };

  render() {

    return (
      <div className="main-ctnr">
          <h2>{'On se connaît ?… A toi de le prouver !'}</h2>
          <form onSubmit={this.submitHandler}>
            <label htmlFor='input-mail'>Adresse mail</label>
            <input id='input-mail' type='mail' placeholder='Adresse mail' onChange={_.partial(this.changeInput, 'email')} />
            <label htmlFor='input-password'>Password</label>
            <input id='input-password' type='password' placeholder='Mot de passe' onChange={_.partial(this.changeInput, 'pwd')} />
            <input type='submit' value='Connexion'/>
          </form>
          <Link className='sub-header-nav-item' to="/signupForm">{'Pas encore de compte ?'}</Link>
      </div>
    );
  }
}

export default withRouter(SigninForm);
