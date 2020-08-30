import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import { Emoji } from '../helpers/emoji';

import { withRouter } from 'react-router-dom';

/**
 * @name { Home }
 * @type
 * @using {  }
 * @description
 */
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
        this.$btnLeft = React.createRef();
        this.$btnRight = React.createRef();
    }

    switchBtnHovered = (btn1, btn2) => {
        const ref1 = btn1.current;
        const ref2 = btn2.current;
        ref1.id = ref1.id === 'nav-item-2' ? 'nav-item-1' : 'nav-item-2';
        ref2.id = ref2.id === 'nav-item-2' ? 'nav-item-1' : 'nav-item-2';
      }

    goToSignin = () => {
        this.props.history.push('/signinForm');
    }

    render() {

        return (
            <div className="home-ctnr">
                <p id='header-top-icons'> 
                    <Emoji symbol="👏" label="clap-hand"/>
                    <Emoji symbol="🎬"label="clap-cinema" />
                    <Emoji symbol="😁" label="clap-smile"/>
                </p>    
                <h1>{'Regarder seul, c’est bien. Ensemble, c’est mieux !'}</h1>
                <nav>
                    <ul className='sub-header-nav'>
                        <li>
                        <Link 
                            ref={this.$btnLeft} 
                            onMouseOver={e => {this.switchBtnHovered(this.$btnRight, this.$btnLeft)}} 
                            className='sub-header-nav-item'
                            id='nav-item-1' 
                            to="/signupForm">{'S\'inscrire'}</Link>
                        </li>
                        <li>
                            <Link 
                            ref={this.$btnRight} 
                            onMouseOver={e => {this.switchBtnHovered(this.$btnLeft, this.$btnRight)}} 
                            className='sub-header-nav-item'
                            id='nav-item-2' 
                            to="/signinForm">{'Voir les rooms'}</Link>
                        </li>
                    </ul>
                </nav>

                <footer>
                    <ul>
                        <li>
                            <div className='footer-item-round'>{'1'}</div>
                            <div className='footer-item-text'>{'Crée ta room !'}</div>
                        </li>
                        <li>
                            <div className='footer-item-round'>{'2'}</div>
                            <div className='footer-item-text'>{'Invite tes ami.e.s !'}</div>
                        </li>
                        <li>
                            <div className='footer-item-round'>{'3'}</div>
                            <div className='footer-item-text'>{'Regardez ensemble !'}</div>
                        </li>
                    </ul>
                </footer>
            </div>
        );
    }
}

export default withRouter(Home);
