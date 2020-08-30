import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { signupWithEmailAndPassword } from '../api/firebase-auth';
import { writeData } from '../api/firebase-firestore';
import './SignupForm.css';


/**
 * @name { Signup }
 * @type
 * @using {  }
 * @description
 */
class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            pwd: '',
            pwdConfirm: '',
            name: ''
        };
    }

    submitHandler = async event => {
        event.preventDefault();
        console.log(this.state.email, this.state.pwd, this.state.name);
        /*
          2 étapes successives :
              1) on inscript l'utilisateur au service 'authentification' de firebase, 
              si l'opération échoue, la suite du code n'est pas éxécutée (return;)
              2) On crée un nouvel utilsiateur en base de donnée (service 'cloud firestore') 
              avec sa nouvelle uid récupérée après son inscription, si l'opération échoue, 
              la suite du code n'est pas éxécutée (return;)
          */

        let uid;
        try {
            uid = await signupWithEmailAndPassword(this.state.email, this.state.pwd, this.state.name);
        } catch (err) {
            console.log(err);
            return;
        }

        let userCreated;
        try {
            userCreated = await this.createUser(this.state.email, uid, this.state.name);
        } catch (err) {
            console.log(err);
            return;
        }

        console.log('success !!!', userCreated);
    }

    changeInput = (id, event) => {
        // console.log('id ', id);
        // console.log('INPUT ', event.target.value);
        this.setState({
            [`${id}`]: event.target.value,
        })
    };

    createUser = (email, uid, name) => {
        return new Promise(async (resolve, reject) => {
            const result = await writeData('users', uid, {
                id: uid,
                email: email,
                name: name
            });
            result === 'success' ? resolve('success') : reject('error');
        });
    };

    render() {
        return (
            <div className="main-ctnr">
                <h2>{'Avant tout... Il faut t\'inscrire ;)'}</h2>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor='input-name'>Pseudo</label>
                    <input id='input-name' type='text' placeholder='Pseudo' onChange={_.partial(this.changeInput, 'name')} />
                    <label htmlFor='input-mail'>Adresse mail</label>
                    <input id='input-mail' type='etextmail' placeholder='Adresse mail' onChange={_.partial(this.changeInput, 'email')} />
                    <label htmlFor='input-password'>Mot de passe</label>
                    <input id='input-password' type='password' placeholder='Mot de passe' onChange={_.partial(this.changeInput, 'pwd')} />
                    <label htmlFor='input-password-confirm'>Confirmer mot de passe</label>
                    <input id='input-password-confirm' type='password' placeholder='Mot de passe' onChange={_.partial(this.changeInput, 'pwdConfirm')} />
                    <input type='submit' value='Connexion' />
                </form>
                <Link className='sub-header-nav-item' to="/signinForm">{'Se connecter'}</Link>
            </div>
        );
    }
}

export default withRouter(Signup);
