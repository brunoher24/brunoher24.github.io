import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import './styles.scss'

/**
 * @name { RoomHeader }
 * @type
 * @using {  }
 * @description
 */
export default class RoomHeader extends Component {

  static propTypes = {
    isMobile: PropTypes.bool,
    event: PropTypes.object,
  };

  static defaultProps = {
    isMobile: false,
    event: {},
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { isMobile, event } = this.props;

    const roomHeaderClassName = classNames({
      'room-header': true,
      'room-header--mobile': isMobile,
    });

    const titleClassName = classNames({
      'room-header__zone-wrapper__title': true,
      'room-header__zone-wrapper__title--mobile': isMobile,
    });

    const descriptionClassName = classNames({
      'room-header__zone-wrapper__description': true,
      'room-header__zone-wrapper__description--mobile': isMobile,
    });

    return (
      <div className={roomHeaderClassName}>
        <div className="room-header__zone-wrapper room-header__zone-wrapper--flex">
    <div className={titleClassName}>{event.name}</div>
          <div className={descriptionClassName}>{event.videoTitle}</div>
        </div>
        {!isMobile && (
          <div className="room-header__zone-wrapper room-header__zone-wrapper--space">
            <div className="room-header__zone-wrapper__date">{event.startDate && moment(event.startDate.toDate()).format('DD/MM [a] hh[h]mm')}</div>
            <div className="room-header__zone-wrapper__creator">{event.user && 'par '+ event.user.name}</div>
          </div>
        )}
      </div>
    );
  }
}
