import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { readCollectionOnce } from '../api/firebase-firestore';

/**
 * @name { Event }
 * @type
 * @using {  }
 * @description
 */
class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
    }

    async componentDidMount() {
        const eventsData = await readCollectionOnce('events');

        this.setState({ events: eventsData.docs });
    }

    render() {

        return (
            <div className="home-ctnr">
                <header>
                    <h1>{'Clap - events'}</h1>
                    <ul>
                        {this.state.events.map((item, index) => (
                            <li key={index}>{item.data().email}</li>
                        ))}
                    </ul>

                </header>
            </div>
        );
    }
}

export default withRouter(Event);
