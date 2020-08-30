import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { storage } from '../../helpers/storage';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.$menuLi = React.createRef();
    }


    switchMenuState = () => {
        const ref = this.$menuLi.current;
        ref.className = ref.className === 'displayed' ? 'hide' : 'displayed';
    }

    logout = () => {
        storage.set('user', {});
        this.props.refreshed('user', null);
        this.props.history.push('/');
        this.switchMenuState();
    }

    LogoutComponent = () => {
        return (
            <li onClick={this.logout}>Déconnexion</li>
        );
    }

    render() {
        const user = this.props.user;
        let logoutLi;
        console.log(user);        
        if (user && user.email) {
            logoutLi = this.LogoutComponent();
            console.log('new user');
        } else {
            console.log('no user');
        }
        return (
            <header id='header'>
                <Link id='logo-left' to="/">
                    {'clap'}<span>{'.'}</span>{'family'}
                </Link>
                <nav>
                    <FontAwesomeIcon onClick={this.switchMenuState} id='menu-burger-icon' icon={faAlignJustify} />
                    <ul ref={this.$menuLi}>
                        <li onClick={this.switchMenuState}>
                            <Link to="/">Accueil</Link>
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
                        {logoutLi}
                    </ul>
                </nav>
            </header>
        );
    }
} 

export default withRouter(Header);
