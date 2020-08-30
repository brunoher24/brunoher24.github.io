import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { readCollectionOnce } from '../../api/firebase-firestore';
import Modal from 'react-modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import moment from 'moment';

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
            modalIsOpen: false,
            modalInfo: {title: '', user: {}, date: ''},
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

    openModal = (title, user, date) => {
        this.setState(
            {
                modalIsOpen: true,
                modalInfo: {
                    title,
                    user,
                    date
                }
            }
        );
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
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
            <div className="home-ctnr">
                <h1 className="text-center">{'Trouve la room de ton coeur (ou crée la tienne)'}</h1>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-3 d-flex">
                                <div className="card card-icon-2 card-body justify-content-between hover-shadow-3d">
                                    <div className="icon-round ml-5 mt-4 mb-3 mb-md-4 icon">
                                        <svg width="6em" height="6em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                    </div>
                                    <h5 className="mb-0">{'Rend fière ta famille'}</h5>
                                    <a href="http://www.google.fr" className="btn btn-outline-secondary">{'Créer ta room'}</a>
                                </div>
                            </div>
                            {this.state.events.map((item, index) => (
                                <div key={index} className="col-md-6 col-lg-3 d-flex">
                                <div className="card card-icon-2 card-body justify-content-between hover-shadow-3d bg-primary text-light">
                                    <p>{moment(item.startDate.toDate()).format("DD/MM h:mm")}</p>
                                    <p>{'Par ' + item.user.name}</p>
                                    <h5 className="mb-0">{item.name}</h5>
                                    <p className="mb-0">{item.videoTitle}</p>
                                    <button className="btn btn-ouline-secondary" onClick={() => this.openModal(item.name, item.user, item.startDate.toDate())}>{'Rejoindre'}</button>
                                    <Link to={'/room/'+item.id}>Event</Link>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customModalStyles}
                    contentLabel="Subscribe"
                >
                    <button onClick={this.closeModal}>close</button>
                    <h2>{'Félicitations !'}</h2>
                    <h3>{'Tu es bien inscrit.e à l\'évènement :'}</h3>
                    <p>{this.state.modalInfo.title}</p>
                    <p>{'par ' + this.state.modalInfo.user.email + ' - le ' + moment(this.state.modalInfo.date).format("DD/MM h:mm")}</p>
                    <a target="_blank" rel="noopener noreferrer" href={'https://www.google.com/calendar/render?action=TEMPLATE&text='+this.state.modalInfo.title+'&dates='+moment(this.state.modalInfo.date).format('YMMDDThhmmss')+'%2F'+moment(this.state.modalInfo.date).add(1, 'days').format('YMMDDThhmmss')+'&sf=true&output=xml'}>{'Ajouter à mon agenda'}</a>
                    <input
                        ref={(input) => this.clipBoard = input}
                        value={window.location.host+'/events'}
                        style={{transform: 'scale(0)'}}
                    />
                    <button onClick={this.copyCodeToClipboard}>{'Inviter mes ami.es'}</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Event);
