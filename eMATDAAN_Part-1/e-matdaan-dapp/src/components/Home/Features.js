import React from 'react';
import './Features.css';

function Features() {
  return (
    <section className="features">
      <h2>Features</h2>
      <div className="feature">
        <div className="icon-container">
          <i className="fa fa-users"></i>
        </div>
        <div className="feature-content">
          <h3>Secure Voting</h3>
          <p>Our blockchain-based voting system ensures secure and transparent voting, preventing any kind of tampering with the results.</p>
        </div>
      </div>
      <div className="feature">
        <div className="icon-container">
          <i className="fa fa-lock"></i>
        </div>
        <div className="feature-content">
          <h3>Private Voting</h3>
          <p>Our system ensures the privacy of voters by keeping their identities anonymous, preventing any kind of vote manipulation or coercion.</p>
        </div>
      </div>
      <div className="feature">
        <div className="icon-container">
          <i className="fa fa-cubes"></i>
        </div>
        <div className="feature-content">
          <h3>Decentralized</h3>
          <p>Our system is decentralized, meaning that there is no single point of failure. This ensures that the voting process is not influenced by any single entity.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
