import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import ClapChat from './components/ClapChat';
import ClapTimer from './components/ClapTimer';
import ClapTimerControl from './components/ClapTimerControl';
import RoomHeader from './components/RoomHeader';
import './styles.scss';

import { readData } from '../../api/firebase-firestore';

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
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
      this.setState({ event });
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
  };

  onResume = () => {
    console.log('ON RESUME');
  };

  onPause = () => {
    console.log('ON PAUSE');
  };

  onStop = () => {
    console.log('ON STOP');
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
    const { currentTimer, isPlaying } = this.state;

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
              startImmediately={isPlaying}
              initialTime={currentTimer}
              onBindFunc={this.onBindFunc}
              onStart={this.onStart}
              onResume={this.onResume}
              onPause={this.onPause}
              onStop={this.onStop}
            />
          </div>
          <ClapChat />
        </div>
      </div>
    );
  };

  renderMobileVersion = () => {
    const { currentTimer, isPlaying } = this.state;

    return (
      <div className="room">
        <div className="room__mobile-header">
          <RoomHeader isMobile />
          <ClapTimer
            startImmediately={isPlaying}
            initialTime={currentTimer}
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
        <ClapChat />
      </div>
    );
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 720;

    return (
      <>
        {!isMobile && this.renderDesktopVersion()}
        {/* {!isMobile && this.renderDesktopVersion()} */}
        {isMobile && this.renderMobileVersion()}
      </>
    );
  }
}

export default withRouter(Room);
