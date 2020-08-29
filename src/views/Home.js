import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
    }

    goToSignin = () => {
        this.props.history.push('/signinForm');
    }

    render() {

        return (
            <div className="home-ctnr">
                <header>
                    <h1>{'Clap'}</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/signinForm">{'S\'inscrire'}</Link>
                                <button onClick={this.goToSignin}>{'Test'}</button>
                            </li>
                        </ul>
                    </nav>

                </header>
            </div>
        );
    }
}

export default withRouter(Home);
