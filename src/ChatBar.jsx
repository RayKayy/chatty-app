import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super();
    this.state = {
      name: props.user,
      message: ''
    }
  }
  render() {
    const onKeyPress = type => event => {
      if (event.key === 'Enter') {
        if (type === 'name') {
          this.props.changeUser(this.state.name);
        } else if (type === 'message') {
          this.props.newMessage(this.state.message);
          event.target.value = '';
        }
      }
    }
    const onChange = key => event => {
      this.setState({ [key]: event.target.value }, () => {console.log(this.state)})
    }
    return (
      <footer className="chatbar">
        <input
        className="chatbar-username"
        placeholder="Your Name (Optional)"
        defaultValue={this.state.name}
        onKeyPress={onKeyPress('name')}
        onChange={onChange('name')}
        />
        <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={onKeyPress('message')}
        onChange={onChange('message')}
        />
      </footer>
    );
  }
}

function Navbar({ online }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <a className="navbar-counter">{online} User(s) Online</a>
    </nav>
  )
}

export {Navbar, Chatbar};


