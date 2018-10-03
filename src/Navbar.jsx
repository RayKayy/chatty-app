import React from 'react';

export default function Navbar({ online }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Hi Chat!</a>
      <a className="navbar-counter">{online} User(s) Online</a>
    </nav>
  )
}