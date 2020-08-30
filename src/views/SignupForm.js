import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { signupWithEmailAndPassword } from '../api/firebase-auth';
import { _areIdenticals, _mailIsValid } from '../helpers/utilities';
import { writeData } from '../api/firebase-firestore';
import './SignupForm.css';
import Modal from 'react-modal';

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');


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
            name: '',
            modalIsOpen: false,
        };
    }
    
    openModal = (modalText, modalTitle) => {
        this.setState(
            {
                modalIsOpen: true,
                modalText,
                modalTitle
            }
        );
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    

    submitHandler = async event => {
        event.preventDefault();
        console.log(this.state.email, this.state.pwd, this.state.name);

        const email = this.state.email.trim();
        const pwd   = this.state.pwd.trim();
        const name  = this.state.name.trim();

        if(!_areIdenticals([pwd, this.state.pwdConfirm])) {
            this.openModal('Les champs mots de passe doivent être identiques !','Mots de passe différents');
            return;
        } 
        if(!_mailIsValid(email)) {  
            this.openModal('Vérifie que tu as rentré la bonne adresse mail !', 'Adresse mal formatée');
            return; 
        }
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
            uid = await signupWithEmailAndPassword(email, pwd, name);
            const user = {name: name, email: email};
            this.props.refreshed('user', user);
            this.props.history.push('/');
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
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customModalStyles}
                    contentLabel="Fermer"
                >
                    <h2>{this.state.modalTitle}</h2>
                    <p>{this.state.modalText}</p>
                    <button onClick={this.closeModal}>{'Fermer'}</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Signup);
