import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
  };

  static defaultProps = {
    isMobile: false,
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { isMobile } = this.props;

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
          <div className={titleClassName}>{'Soiree cool and the gang xD'}</div>
          <div className={descriptionClassName}>{'Harry potter 6'}</div>
        </div>
        {!isMobile && (
          <div className="room-header__zone-wrapper room-header__zone-wrapper--space">
            <div className="room-header__zone-wrapper__date">{'21/10 a 12h12'}</div>
            <div className="room-header__zone-wrapper__creator">{'par Jacky michou'}</div>
          </div>
        )}
      </div>
    );
  }
}
