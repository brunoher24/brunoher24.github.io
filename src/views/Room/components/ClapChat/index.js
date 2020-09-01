import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from 'emoji-picker-react';

import emojiPicker from './emoji-picker.png';
import './styles.scss';

import { storage } from '../../../../helpers/storage';
import { readCollection, writeData } from '../../../../api/firebase-firestore';

/**
 * @name { ClapChat }
 * @type
 * @using {  }
 * @description
 */
export default class ClapChat extends Component {
  static propTypes = {
    event: PropTypes.object,
  };

  static defaultProps = {
    event: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      chatInput: '',
      chosenEmoji: undefined,
      isEmojiPickerDisplayed: false,
      user: storage.getItem('user')
    };
  }

  getMessageChat = (message) => {
    this.setState({messages: [...this.state.messages, message]});
  }

  async componentDidMount() {
    if (this.props.event) {
      await readCollection(this.getMessageChat, 'chats', true, 'created_at', 'desc', null, null, 'event_id', '==', this.props.event.id);
    }
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

  submitHandler = async event => {
    event.preventDefault();

    let messageCreated;
    try {
      messageCreated = await this.createMessage();
    } catch (err) {
        console.log(err);
        return;
    }

    console.log('success !!!', messageCreated);
  }

  createMessage = () => {    
    const now = new Date().getTime();  
    const id = `_${now}_${this.state.user.name}`;  
    const content = this.state.chatInput;
    const created_at = new Date();
    const event_id = this.props.event.id;
    const user_id = this.state.user.uid;

    return new Promise(async (resolve, reject) => {
        const result = await writeData('chats', id, {
            content,
            created_at,
            event_id,
            user_id,
        });

        this.setState({chatInput: ''});

        result === 'success' ? resolve('success') : reject('error');
    });
};

  render() {
    const { isEmojiPickerDisplayed, chatInput } = this.state;

    return (
      <div className="clap-chat">
        <div className="clap-chat">
          <div className="clap-chat__chat-wrapper">
          {this.state.messages.map((item, index) => (
              <div key={index}>
                {item.content}
              </div>
          ))}
          </div>
          <div className="clap-chat__input-wrapper">
            <form onSubmit={this.submitHandler}>
              <input value={chatInput} onChange={this.updateChatInput} />
              <div className="clap-chat__input-wrapper__emoji-wrapper" onClick={this.triggerEmojiPicker}>
                <img className="clap-chat__input-wrapper__emoji-wrapper__emoji" src={emojiPicker} />
              </div>
              {isEmojiPickerDisplayed && (
                <Picker className="clap-chat__input-wrapper__emoji-picker" onEmojiClick={this.onEmojiClick} />
              )}
              <input type="submit" value="Envoyer" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
