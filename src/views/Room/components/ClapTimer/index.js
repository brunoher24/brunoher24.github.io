import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import Timer from 'react-compound-timer';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

/**
 * @name { ClapTimer }
 * @type
 * @using {  }
 * @description
 */
export default class ClapTimer extends Component {
  static propTypes = {
    onBindFunc: PropTypes.func,
    onStart: PropTypes.func,
    onResume: PropTypes.func,
    onPause: PropTypes.func,
    onStop: PropTypes.func,
    isMobile: PropTypes.bool,
    startImmediately: PropTypes.bool,
    initialTime: PropTypes.any,
  };

  static defaultProps = {
    onBindFunc: () => {},
    onStart: () => {},
    onResume: () => {},
    onPause: () => {},
    onStop: () => {},
    isMobile: false,
    startImmediately: false,
    initialTime: 0,
    timeElapsed: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      timeElapsed: null
    };
  }

  componentDidUpdate() {
    if(!this.state.timeElapsed && this.props.timeElapsed) {
      console.log(this.props.timeElapsed);
      this.setState({timeElapsed: this.props.timeElapsed});
      
    }
  }

  render() {
    const { onStart, onResume, onPause, onStop, onBindFunc, isMobile, startImmediately, timeElapsed } = this.props;

    if(!timeElapsed) return (<div></div>);

    const textClassName = classNames({
      'room-timer__text': true,
      'room-timer--center': isMobile,
    });

    const valueDisplayClassName = classNames({
      'room-timer__counter__value-display': true,
      'room-timer__counter__value-display--mobile': isMobile,
    });

    return (
      <div className="room-timer">
        <div className={textClassName}>
          {isMobile ? 'Synchro :' : 'Timing de synchro :'}
        </div>
        <Timer
          initialTime={timeElapsed}
          startImmediately={startImmediately}
          onStart={onStart}
          onResume={onResume}
          onPause={onPause}
          onStop={onStop}
          onReset={() => console.log('onReset hook')}
          formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        >
          {({ start, resume, pause, stop, reset, timerState, getTime }) => {
            onBindFunc(start, 'start');
            onBindFunc(resume, 'resume');
            onBindFunc(pause, 'pause');
            onBindFunc(stop, 'stop');
            onBindFunc(getTime, 'getTime');

            return (
              <React.Fragment>
                <div className="room-timer__counter">
                  <div className={valueDisplayClassName}>
                    <Timer.Hours
                      formatValue={(value) => `${(value > 0 ? `0${value} : ` : '')}`}
                    />
                  </div>
                  <div className={valueDisplayClassName}>
                  <Timer.Minutes />
                </div>
                <div className="room-timer__counter__font-size">{':'}</div>
                <div className={valueDisplayClassName}>
                  <Timer.Seconds />
                </div>
                </div>
                {/* <div className="room-timer__counter">
                  <button onClick={start}>Start</button>
                  <button onClick={pause}>Pause</button>
                  <button onClick={resume}>Resume</button>
                  <button onClick={stop}>Stop</button>
                  <button onClick={reset}>Reset</button>
                </div> */}
              </React.Fragment>
            )
          }
        }
        </Timer>
        <div className={isMobile ? 'room-timer__flex' : ''}>
          <div className="room-timer__text">
            {isMobile ? 'Clappeurs :' : 'Nombre de clappeurs :'}
          </div>
          <div className="room-timer--center">
            {'300'}
          </div>
        </div>
      </div>
    );
  }
}
