import React, {Component} from 'react';
import { Chatbar, Navbar } from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
import data from './data.json';
import { generateRandomId } from './helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      data,
    };
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    this.socket.onopen = event => {
      console.log('Connected to WS')
    };

  }

  _newMessage = message => {
    const newM = {
      id: generateRandomId(),
      type: "incomingMessage",
      username: this.state.currentUser,
      content: message
    };
    const oldM = this.state.data;
    const newData = [...oldM, newM];
    this.setState({ data: newData });
    this.socket.send(JSON.stringify(newM));
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList data={this.state.data} />
        <Chatbar user={this.state.currentUser} newMessage={this._newMessage} />
      </div>
    );
  }
}
export default App;
