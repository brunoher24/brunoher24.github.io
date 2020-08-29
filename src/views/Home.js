import React, { Component } from 'react';
import { Link } from "react-router-dom";

/**
 * @name { Home }
 * @type
 * @using {  }
 * @description
 */
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    

    goToSignin = () => {
        console.log(this);
        // history.push('/signinForm');
    }

    test_() {
        console.log(this);
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
                                {/* <button onClick={this.goToSignin}>
                                </button> */}
                            </li>
                        </ul>
                    </nav>

                </header>
            </div>
        );
    }
}
