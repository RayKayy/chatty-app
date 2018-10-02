import React, {Component} from 'react';
import { Chatbar, Navbar } from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      data: [],
      online: 1,
      color: ''
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // Websocket connection
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    this.socket.onopen = event => {
      console.log('Connected to WS')
    };
    // Handle incoming messages from WS.
    this.socket.onmessage = event => {
      if (event.data[0] === '#') {
        this.setState({ color: event.data });
      } else {
        const newMessage = JSON.parse(event.data);
        // Check for type of info. (number of users/messages)
        if (typeof newMessage === 'number') {
          this.setState({ online: newMessage }, () => {console.log(this.state)});
        } else {
          this.setState({ data: [...this.state.data, newMessage] });
        }
      }
    }
  }
  // Handle new message
  _newMessage = message => {
    const newM = {
      type: "postMessage",
      username: this.state.currentUser,
      content: message,
      color: this.state.color,
    };
    this.socket.send(JSON.stringify(newM));
  }
  // Handle user change
  _changeUser = username => {
    const notice = {
      type: 'postNotification',
      content: `${this.state.currentUser} has changed their name to ${username}.`
    }
    this.socket.send(JSON.stringify(notice));
    this.setState({ currentUser: username });
  }

  render() {
    return (
      <div>
        <Navbar online={this.state.online} />
        <MessageList data={this.state.data} />
        <Chatbar
        user={this.state.currentUser}
        newMessage={this._newMessage}
        changeUser={this._changeUser}
        />
      </div>
    );
  }
}
export default App;
