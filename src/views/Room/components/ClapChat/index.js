import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from 'emoji-picker-react';

import emojiPicker from './emoji-picker.png';
import './styles.scss';

/**
 * @name { ClapChat }
 * @type
 * @using {  }
 * @description
 */
export default class ClapChat extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
      chatInput: '',
      chosenEmoji: undefined,
      isEmojiPickerDisplayed: false,
    };
  }

  triggerEmojiPicker = () => {
    this.setState(prevState => ({
      isEmojiPickerDisplayed: !prevState.isEmojiPickerDisplayed,
    }));
  }

  onEmojiClick = (event, emojiObject) => {
    const { chatInput } = this.state;

    this.setState({
      chatInput: `${chatInput}${emojiObject.emoji}`,
      chosenEmoji: emojiObject,
      isEmojiPickerDisplayed: false,
    });
  };

  updateChatInput = event => {
    this.setState({ chatInput: event.target.value });
  };

  render() {
    const { isEmojiPickerDisplayed, chatInput } = this.state;

    return (
      <div className="clap-chat">
        <div className="clap-chat">
          <div className="clap-chat__chat-wrapper">
            {'hihi'}
          </div>
          <div className="clap-chat__input-wrapper">
            <input value={chatInput} onChange={this.updateChatInput} />
            <div className="clap-chat__input-wrapper__emoji-wrapper" onClick={this.triggerEmojiPicker}>
              <img className="clap-chat__input-wrapper__emoji-wrapper__emoji" src={emojiPicker} />
            </div>
            {isEmojiPickerDisplayed && (
              <Picker className="clap-chat__input-wrapper__emoji-picker" onEmojiClick={this.onEmojiClick} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
