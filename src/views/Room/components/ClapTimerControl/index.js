import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss'

/**
 * @name { ClapTimerControl }
 * @type
 * @using {  }
 * @description
 */
export default class ClapTimerControl extends Component {

  static propTypes = {
    onStart: PropTypes.func,
    onPause: PropTypes.func,
    onStop: PropTypes.func,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    isMobile: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  onStart = () => {
    this.setState({
      isPlaying: true,
    }, () => {
      this.props.onStart();
    });
  };

  onPause = () => {
    this.setState({
      isPlaying: false,
    }, () => {
      this.props.onPause();
    });
  };

  renderDesktopVersion = () => {
    const { onStart, onPause, onStop } = this.props;

    return (
      <div className="clap-timer-control">
        <div className="clap-timer-control__left">
          <button onClick={onPause}>{'Play'}</button>
          {/* <button onClick={onStart}>{'Pause'}</button> */}
        </div>
        <div className="clap-timer-control__flex">
          <div
            className="clap-timer-control__flex__white-button clap-timer-control__flex__white-button--space"
            onClick={onStop}
          >
            {'Débrief'}
          </div>
          <div className="clap-timer-control__flex__white-button" onClick={onStop}>{'Fin'}</div>
        </div>
      </div>
    );
  };

  renderMobileVersion = () => {
    const { isPlaying } = this.state;
    const { onStart, onPause, onStop } = this.props;

    const clapTimerControlClassName = classNames({
      'clap-timer-control': true,
      'clap-timer-control--mobile': true,
    });

    const whiteButtonClassName = classNames({
      'clap-timer-control__flex__white-button': true,
      'clap-timer-control__flex__white-button--mobile': true,
    });

    return (
      <div className={clapTimerControlClassName}>
        {!isPlaying && <div className={whiteButtonClassName} onClick={this.onStart}>{'Lancer'}</div>}
        {isPlaying && <div className={whiteButtonClassName} onClick={this.onPause}>{'Pause'}</div>}
        <div className={whiteButtonClassName} onClick={onStop}>{'Débrief'}</div>
        <div className={whiteButtonClassName} onClick={onStop}>{'Fin'}</div>
      </div>
    );
  };

  render() {
    const { isMobile } = this.props;
    console.log('THE STATE IS ', this.state);

    return (
      <>
        {!isMobile && this.renderDesktopVersion()}
        {isMobile && this.renderMobileVersion()}
      </>
    );
  }
}
