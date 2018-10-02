import React, { Component } from 'react';

function Chatbar({ user, newMessage }) {
  const onKeyPress = event => {
    if (event.key === 'Enter') {
      const message = event.target.value;
      newMessage(message);
      event.target.value = '';
    }
  }
  return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={user} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
    </footer>
  );
}

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    )
  }
}

export {Navbar, Chatbar};


