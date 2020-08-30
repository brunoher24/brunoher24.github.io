import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import ClapChat from './components/ClapChat';
import ClapTimer from './components/ClapTimer';
import RoomInfo from './components/RoomInfo';
import ClapTimerControl from './components/ClapTimerControl';
import RoomHeader from './components/RoomHeader';
import './styles.scss';

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
    this.state = {
      width: 0,
      height: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onBindFunc = (toBind, bindId) => {
    switch (bindId) {
      case 'start':
        if (!this.onStartBinded && toBind) {
          this.onStartBinded = toBind;
        }
        break;
      case 'resume':
        if (!this.onResumeBinded && toBind) {
          this.onResumeBinded = toBind;
        }
        break;
      case 'pause':
        if (!this.onPauseBinded && toBind) {
          this.onPauseBinded = toBind;
        }
        break;
      case 'stop':
        if (!this.onStopBinded && toBind) {
          this.onStopBinded = toBind;
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

  renderDesktopVersion = () => {
    return (
      <div className="room">
        <RoomHeader />
        <div className="room__wrapper">
          <div className="room__wrapper__flex-left">
            <ClapTimerControl
              onStart={_.partial(this.onClickType, 'start')}
              onPause={_.partial(this.onClickType, 'pause')}
              onStop={_.partial(this.onClickType, 'stop')}
            />
            <ClapTimer
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
    return (
      <div className="room">
        <div className="room__mobile-header">
          <RoomHeader isMobile />
          <ClapTimer
            onBindFunc={this.onBindFunc}
            onStart={this.onStart}
            onResume={this.onResume}
            onPause={this.onPause}
            onStop={this.onStop}
            isMobile
          />
        </div>
        <ClapTimerControl
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
        {isMobile && this.renderMobileVersion()}
      </>
    );
  }
}

export default withRouter(Room);
