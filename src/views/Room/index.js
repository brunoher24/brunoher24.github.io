import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import ClapChat from './components/ClapChat';
import ClapTimer from './components/ClapTimer';
import ClapTimerControl from './components/ClapTimerControl';
import RoomHeader from './components/RoomHeader';
import ClapTimerBeforeEvent from './components/ClapTimerBeforeEvent';
import './styles.scss';
import { firebase } from '../../App';
import { readData, readDataOn, updateData } from '../../api/firebase-firestore';
import Modal from 'react-modal';
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
 * @name { Room }
 * @type
 * @using {  }
 * @description
 */
class Room extends Component {

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.onStartBinded = null;
    this.onResumeBinded = null;
    this.onPauseBinded = null;
    this.onStopBinded = null;
    this.onBindGetTime = null;
    this.state = {
      width: 0,
      height: 0,
      isPlaying: false,
      currentTimer: 0,
      event: {},
      timerBeforeEvent: false,
      modal: {
        open: false,
        info: {
          title: '',
          user: {},
          date: ''
        },
      }
    };
    this.clipBoard = React.createRef();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  copyCodeToClipboard = () => {
    const el = this.clipBoard;
    el.select();
    document.execCommand("copy");
  }

  closeModal = () => {
    this.setState({modal: {...this.state.modal, open: false}});
  }

  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    let event = await readData('events', this.props.match.params.token);

    const getEvent = async () => {
      return new Promise(async (resolve) => {
        const userRef = await event.userRef.get();

        resolve({...event, user: {...userRef.data()}});
      });
    }

    getEvent().then(event => {
      const now = moment();
      const dateEvent = moment(event.startDate.toDate());
      const dateDiff = dateEvent.diff(now) > 0;
      
      this.setState({event, timerBeforeEvent: dateDiff})

      this.setState({
        modal: {
          open: dateEvent.diff(now) > 0,
          info: {
            title: event.name,
            user: event.user,
            date: event.startDate.toDate()
          }
        }
      });
    });

    readDataOn('events', this.props.match.params.token, event => {
      // console.log(event);
      this.setState({
        timeEllapsed: event.timeEllapsed,
        isPlaying: event.isPlaying,
        startTimer: event.startTimer
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (this.onBindGetTime) {
      const currentTimer = this.onBindGetTime();
      this.setState({ width: window.innerWidth, height: window.innerHeight, currentTimer });
    }
  }

  onBindFunc = (toBind, bindId) => {
    switch (bindId) {
      case 'start':
        if (toBind) {
          this.onStartBinded = toBind;
        }
        break;
      case 'resume':
        if (toBind) {
          this.onResumeBinded = toBind;
        }
        break;
      case 'pause':
        if (toBind) {
          this.onPauseBinded = toBind;
        }
        break;
      case 'stop':
        if (toBind) {
          this.onStopBinded = toBind;
        }
        break;
      case 'getTime':
          if (toBind) {
            this.onBindGetTime = toBind;
          }
          break;
      default:
        return;
    }
  };

  onStart = () => {
    console.log('ON START');
    const now = new Date().getTime();
    updateData('events', this.props.match.params.token, {startTimer: now, isPlaying: true});
    
  };

  onResume = () => {
    console.log('ON RESUME');
    const now = new Date().getTime();
    updateData('events', this.props.match.params.token, {startTimer: now, isPlaying: true});
  };

  onPause = () => {
    console.log('ON PAUSE');
    const now = new Date().getTime();
    const newTimeElapsed = now - this.state.startTimer;
    updateData('events', this.props.match.params.token, 
    {timeEllapsed: firebase.firestore.FieldValue.increment(newTimeElapsed), isPlaying: false});
  };

  onStop = () => {
    console.log('ON STOP');
    if(this.state.isPlaying) {
      const now = new Date().getTime();
      const newTimeElapsed = now - this.state.startTimer;
      updateData('events', this.props.match.params.token, 
      {timeEllapsed: firebase.firestore.FieldValue.increment(newTimeElapsed), isPlaying: false});
    }
  };

  onClickType = type => {
    switch (type) {
      case 'start':
        if (this.onStartBinded) {
          this.onStartBinded();
        }
        break;
      case 'resume':
        if (this.onResumeBinded) {
          this.onResumeBinded();
        }
        break;
      case 'pause':
        if (this.onPauseBinded) {
          this.onPauseBinded();
        }
        break;
      case 'stop':
        if (this.onStopBinded) {
          this.onStopBinded();
        }
        break;
      default:
        return;
    }
  };

  updateIsPlaying = () => {
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
  };

  renderDesktopVersion = () => {
    const { currentTimer, isPlaying, timeEllapsed, startTimer } = this.state;

    return (
      <div className="room">
        <RoomHeader event={this.state.event}/>
        <div className="room__wrapper">
          <div className="room__wrapper__flex-left">
            <ClapTimerControl
              isPlaying={isPlaying}
              updateIsPlaying={this.updateIsPlaying}
              onStart={_.partial(this.onClickType, 'start')}
              onPause={_.partial(this.onClickType, 'pause')}
              onStop={_.partial(this.onClickType, 'stop')}
            />
            <ClapTimer
              isPlaying={isPlaying}
              startImmediately={isPlaying}
              initialTime={currentTimer}
              timeEllapsed={timeEllapsed}
              startTimer={startTimer}
              onBindFunc={this.onBindFunc}
              onStart={this.onStart}
              onResume={this.onResume}
              onPause={this.onPause}
              onStop={this.onStop}
            />
          </div>
          {!_.isEmpty(this.state.event) && <ClapChat event={this.state.event} />}
        </div>
      </div>
    );
  };

  renderMobileVersion = () => {
    const { currentTimer, isPlaying, timeEllapsed, startTimer } = this.state;
    
    let timeElapsed = timeEllapsed;
    if (isPlaying) {
      timeElapsed += new Date().getTime() - startTimer;
    }
    
    return (
      <div className="room">
        <div className="room__mobile-header">
          <RoomHeader isMobile event={this.state.event} />
          <ClapTimer
            startImmediately={isPlaying}
            initialTime={currentTimer}
            timeElapsed={timeElapsed}
            onBindFunc={this.onBindFunc}
            onStart={this.onStart}
            onResume={this.onResume}
            onPause={this.onPause}
            onStop={this.onStop}
            isMobile
          />
        </div>
        <ClapTimerControl
          isPlaying={isPlaying}
          updateIsPlaying={this.updateIsPlaying}
          onStart={_.partial(this.onClickType, 'start')}
          onPause={_.partial(this.onClickType, 'pause')}
          onStop={_.partial(this.onClickType, 'stop')}
          isMobile
          />
        {!_.isEmpty(this.state.event) && <ClapChat event={this.state.event} />}
      </div>
    );
  };

  renderModal = () => {
    return (
      <Modal
          isOpen={this.state.modal.open}
          onRequestClose={this.closeModal}
          style={customModalStyles}
          contentLabel="Subscribe"
      >
          <button onClick={this.closeModal}>{'close'}</button>
          <h2>{'Félicitations !'}</h2>
          <h3>{'Tu es bien inscrit.e à l\'évènement :'}</h3>
          <p>{this.state.modal.info.title}</p>
          <p>{'par ' + this.state.modal.info.user.email + ' - le ' + moment(this.state.modal.info.date).format("DD/MM HH:mm")}</p>
          <a target="_blank" rel="noopener noreferrer" href={'https://www.google.com/calendar/render?action=TEMPLATE&text='+this.state.modal.info.title+'&dates='+moment(this.state.modal.info.date).format('YMMDDThhmmss')+'%2F'+moment(this.state.modal.info.date).add(1, 'days').format('YMMDDThhmmss')+'&sf=true&output=xml'}>{'Ajouter à mon agenda'}</a>
          <input
              ref={(input) => this.clipBoard = input}
              defaultValue={window.location.href}
              style={{transform: 'scale(0)'}}
          />
          <button onClick={this.copyCodeToClipboard}>{'Inviter mes ami.es'}</button>
      </Modal>
    );
  }

  renderTimerBeforeEvent = () => {
    return (
      <ClapTimerBeforeEvent event={this.state.event} />
    );
  }

  render() {
    const { width, timerBeforeEvent } = this.state;
    const isMobile = width <= 720;

    return (
      <>
        {!isMobile && this.renderDesktopVersion()}
        {/* {!isMobile && this.renderDesktopVersion()} */}
        {isMobile && this.renderMobileVersion()}
        {timerBeforeEvent && this.renderTimerBeforeEvent()}
        {this.renderModal()}
      </>
    );
  }
}

export default withRouter(Room);
