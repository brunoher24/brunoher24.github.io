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
    isPlaying: PropTypes.bool,
    updateIsPlaying: PropTypes.func,
  };

  static defaultProps = {
    isMobile: false,
    isPlaying: false,
    updateIsPlaying: () => {},
  };

  onStart = () => {
    this.props.updateIsPlaying && this.props.updateIsPlaying();
    this.props.onStart && this.props.onStart();
  };

  onPause = () => {
    this.props.updateIsPlaying && this.props.updateIsPlaying();
    this.props.onPause && this.props.onPause();
  };

  renderPlayOrPause = () => {
    const { isPlaying, updateIsPlaying } = this.props;

    if (!isPlaying) {
      return (
        <div className="clap-timer-control__left__picto" onClick={this.onStart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="-4 -3 24 24">
            <g fill="#ffffff">
              <path d='M13.82 9.523a.976.976 0 0 0-.324-1.363L3.574 2.128a1.031 1.031 0 0 0-.535-.149c-.56 0-1.013.443-1.013.99V15.03c0 .185.053.366.153.523.296.464.92.606 1.395.317l9.922-6.031c.131-.08.243-.189.325-.317zm.746 1.997l-9.921 6.031c-1.425.867-3.3.44-4.186-.951A2.918 2.918 0 0 1 0 15.03V2.97C0 1.329 1.36 0 3.04 0c.567 0 1.123.155 1.605.448l9.921 6.032c1.425.866 1.862 2.696.975 4.088-.246.386-.58.712-.975.952z' />
            </g>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="clap-timer-control__left__picto" onClick={this.onPause}>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="-4 -3 24 24">
            <g fill="#ffffff">
            <path d='M2 0h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2H2zm10-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2h-2z' />
            </g>
          </svg>
        </div>
      );
    }
  };

  renderDesktopVersion = () => {
    const { onStart, onPause, onStop } = this.props;

    return (
      <div className="clap-timer-control">
        <div className="clap-timer-control__left">
          {this.renderPlayOrPause()}
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
    const { onStart, onPause, onStop, isPlaying, updateIsPlaying } = this.props;

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

    return (
      <>
        {!isMobile && this.renderDesktopVersion()}
        {isMobile && this.renderMobileVersion()}
      </>
    );
  }
}
