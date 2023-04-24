import React from 'react';
import './style.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <h1>Blockchain-Based Voting System</h1>
    </header>
  );
}

export default Header;
