import React, { Component } from 'react';
import { writeData } from '../api/firebase-firestore';
import _ from 'lodash';
import { VIDEO_CATEGORIES } from '../helpers/global';
import { storage } from '../helpers/storage';
import './SignupForm.css';


/**
 * @name { CreateEventForm }
 * @type
 * @using { user }
 * @description
 */


export default class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        videoTitle: '',
        categoryRef: null,
        startDate: null,
        isPrivate: false,
        imageUrl: '',
        user: storage.getItem('user')
    };
  }

  submitHandler = async event => {
        event.preventDefault();

        let roomCreated;
        try {
            roomCreated = await this.createRoom();
        } catch (err) {
            console.log(err);
            return;
        }

        console.log('success !!!', roomCreated);
    }

    changeInput = (id, event) => {
        this.setState({
            [`${id}`]: event.target.value,
        })
    };

    createRoom = () => {        
        const now       = new Date().getTime();
        const id        = `_${now}_${this.state.user.name}`;
        const startDate = new Date(this.state.startDate).getTime();

        return new Promise(async (resolve, reject) => {
            const result = await writeData('events', id, {
                id,
                name: this.state.name,
                videoTitle: this.state.videoTitle,
                categoryRef: this.state.categoryRef,
                startDate: startDate,
                startTimer: 0,
                paused: true,
                timeEllapsed: 0,
                isPrivate: this.state.isPrivate,
                userRef: `/users/${this.state.user.id}`,
                imageUrl: this.state.imageUrl
            });
            result === 'success' ? resolve('success') : reject('error');
        });
    };

    render() {
        const categories = VIDEO_CATEGORIES.map((cat, i) => <option key={i}>{ cat }</option>);
          {/*imageUrl: this.state.imageUrl*/}
        return (
            <div className="main-ctnr">
                <h2>Dans 5 minutes, tu es dans ta room !</h2>
                <form onSubmit={this.submitHandler}>
                    <p>
                        <label htmlFor='input-name'>Nom :</label>
                        <input id='input-name' type='text' placeholder='Nom' onChange={_.partial(this.changeInput, 'name')} />
                    </p>
                    <p>
                        <label htmlFor='input-video-title'>Titre de la vidéo</label>
                        <input id='input-video-title' type='text' placeholder='Titre vidéo' onChange={_.partial(this.changeInput, 'videoTitle')} />
                    </p>  
                    <p>
                        <label htmlFor='input-category'>Catégorie</label>
                        <select id='input-category' onChange={_.partial(this.changeInput, 'categoryRef')}>
                            {categories}
                        </select>
                    </p>
                    <p>
                        <label htmlFor='input-start-date'>Date de début</label>
                        <input id='input-start-date' type='datetime-local' placeholder='Date de début' onChange={_.partial(this.changeInput, 'startDate')} />
                    </p>
                    <p className='radio-input-field'>
                        <label htmlFor="is-private-input">Privé</label> 
                        <span>{'Oui'}</span>
                        <input type="radio" name='is-private-input' id='is-private-input' value="1" />  
                        <span>{'Non'}</span>
                        <input checked onChange={_.partial(this.changeInput, 'isPrivate')} type="radio" name='is-private-input' id='is-private-input' value="0" />
                    </p>
                   
                    <input type='submit' value='Ajouter' />
                </form>
            </div>
        );
    }
}
