import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import Timer from 'react-compound-timer';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import './styles.scss';

/**
 * @name { ClapTimerBeforeEvent }
 * @type
 * @using {  }
 * @description
 */
export default class ClapTimerBeforeEvent extends Component {
  static propTypes = {
    event: PropTypes.object,
  };

  static defaultProps = {
      event: {}
  };

  constructor(props) {
    super(props);

    const now = moment();
    const dateEvent = moment(props.event.startDate.toDate());
    const dateDiff = dateEvent.diff(now);
    const diffDay = dateEvent.diff(now, 'days');

    this.state = {
        startImmediately: true,
        initialTime: dateDiff,
        diffDay
    };
  }

  render() {
    const { startImmediately, initialTime, diffDay } = this.state;

    const valueDisplayClassName = classNames({
      'room-timer__counter__value-display': true,
    });

    return (
      <div className="room-timer">
        <Timer
          initialTime={initialTime}
          startImmediately={startImmediately}
          direction="backward"
          formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        >
          {() => {
            return (
              <React.Fragment>
                <div className="room-timer__counter">
                  <div className={valueDisplayClassName}>
                    <Timer.Days
                      formatValue={(value) => `${(value > 0 ? (value < 10 ? `0${value} : ` : `${value} : `) : '')}`}
                    />
                  </div>
                  <div className={valueDisplayClassName}>
                    <Timer.Hours
                      formatValue={(value) => `${(value > 0 ? (value < 10 ? `0${value} : ` : `${value} : `) : '')}`}
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
              </React.Fragment>
            )
          }
        }
        </Timer>
      </div>
    );
  }
}
