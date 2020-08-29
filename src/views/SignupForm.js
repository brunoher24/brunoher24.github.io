import React, { Component } from 'react';
import _ from 'lodash';
import { signupWithEmailAndPassword } from '../api/firebase-auth';


/**
 * @name { Signup }
 * @type
 * @using {  }
 * @description
 */
export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            pwd: '',
            pwdConfirm: '',
            alias: ''
        };
    }

    submitHandler = event => {
        event.preventDefault();
        console.log(this.state.email, this.state.pwd);
        signupWithEmailAndPassword(this.state.email, this.state.pwd).then(res => {
            console.log(res);
        }).catch(error => {
            console.log('Une erreur est survenue !', error);
        });
      }
    
      changeInput = (id, event) => {
        console.log('id ', id);
        console.log('INPUT ', event.target.value);
        this.setState({
            [`${id}`]: event.target.value,
        })
      };

    render() {
        return (
            <div className="">
                <form onSubmit={this.submitHandler}>

                    <label htmlFor='input-alias'>Pseudo</label>
                    <input id='input-alias' type='text' placeholder='Adresse mail' onChange={_.partial(this.changeInput, 'email')} />
                    <label htmlFor='input-mail'>Adresse mail</label>
                    <input id='input-mail' type='etextmail' placeholder='Adresse mail' onChange={_.partial(this.changeInput, 'email')} />
                    <label htmlFor='input-password'>Mot de passe</label>
                    <input id='input-password' type='password' placeholder='Mot de passe' onChange={_.partial(this.changeInput, 'pwd')} />
                    <label htmlFor='input-password-confirm'>Confirmer mot de passe</label>
                    <input id='input-password-confirm' type='password' placeholder='Mot de passe' onChange={_.partial(this.changeInput, 'pwdConfirm')} />
                    <input type='submit' value='Connexion' />
                </form>
            </div>
        );
    }
}
