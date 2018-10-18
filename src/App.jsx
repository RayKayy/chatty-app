import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx'

// Modify this to change websocket server address.
const WS_SERVER = "ws://localhost:3001"

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      data: [],
      online: 0,
      color: ''
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // Scroll to bottom of page on new messages
    const scroll = () => window.scrollTo(0, document.getElementById('react-root').scrollHeight);
    // Websocket connection
    this.socket = new WebSocket(WS_SERVER);
    this.socket.onopen = event => {
      console.log('Connected to WS')
    };
    // Handle incoming messages from WS.
    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'incomingMessage':
        case 'incomingNotification':
          this.setState({ data: [...this.state.data, message] }, scroll);
          break;
        case 'setColor':
          this.setState({ color: message.color });
          break;
        case 'updateCount':
          this.setState({ online: message.count });
          break;
        default:
          console.error('data not recognised', message);
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
  // Handle username change
  _changeUser = username => {
    if (this.state.currentUser !== username) {
      const notice = {
        type: 'postNotification',
        content: `${this.state.currentUser} has changed their name to ${username}.`
      }
      this.socket.send(JSON.stringify(notice));
      this.setState({ currentUser: username });
    }
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
