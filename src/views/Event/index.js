import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { readCollectionOnce } from '../../api/firebase-firestore';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import moment from 'moment';

/**
 * @name { Event }
 * @type
 * @using {  }
 * @description
 */
export default class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            valueCopied: '',
            copied: false
        };

        this.clipBoard = React.createRef();
       
    }

    copyCodeToClipboard = () => {
        const el = this.clipBoard;
        el.select();
        document.execCommand("copy");
    }

    mustBeSignedIn = () => {
        if(!this.props.user || !this.props.user.email) {
            alert('Vous devez être connecté pour accéder aux rooms !');
            return true;
        }
        return false;
    }

    openRoom = (url) => {
        if(!this.mustBeSignedIn()) {
            this.props.history.push(url);
        }
    }

    async componentDidMount() {
        const collection = await readCollectionOnce('events', true, 'startDate', 'desc');
        const eventsRef = collection.docs.filter(item => !item.data().isPrivate);

        const getEvent = async (eventRef) => {
            return new Promise(async (resolve) => {
                const event = eventRef.data();
                const userRef = await event.userRef.get();

                resolve({...event, user: {...userRef.data()}});
            });
        };

        const getEvents = async () => {
            return Promise.all(eventsRef.map(item => getEvent(item)))
        }

        getEvents().then(events => {
            this.setState({ events });
        });
    }
    
    render() {
        return (
            <div className="container-card">
                <h1 className="text-center">{'Trouve la room de ton coeur (ou crée la tienne)'}</h1>
                <section>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 d-flex ml-2 mr-2">
                            <Link to="/createEventForm" className="card card-icon-2 card-body justify-content-between hover-shadow-3d">
                                <div className="icon-round mb-3 mb-md-4 icon bg-primary mx-auto">
                                    <svg width="6em" height="6em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </div>
                                <h5 className="mb-0 text-center mt-0 mb-2">{'Programme ta room'}</h5>
                                <button className="btn btn-outline-secondary">{'Par ici'}</button>
                            </Link>
                        </div>
                        {this.state.events.map((item, index) => (
                            <div key={index} className="col-md-6 col-lg-3 d-flex ml-2 mr-2">
                                <div onClick={this.isUserLoggedIn} className={`card card-icon-2 card-body justify-content-between hover-shadow-3d bg-primary${index % 2 ? '-2' : ''} text-light`}>
                                    <p>{moment(item.startDate.toDate()).format("DD/MM h:mm")}</p>
                                    <p>{'Par ' + item.user.name}</p>
                                    <h5 className="mb-0">{item.name}</h5>
                                    <p className="mb-2">{item.videoTitle}</p>
                                    <button onClick={() => { this.openRoom('/room/'+item.id)}} className="btn btn-outline-light">{'Rejoindre'}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }
}
