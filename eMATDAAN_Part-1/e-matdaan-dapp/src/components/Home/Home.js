import React from 'react';
import Introduction from './Introduction';
import CallToAction from './CallToAction';
import Features from './Features';
// import Footer from './Footer';

function Home() {
  return (
    <div className="home-page" style={{margin:"10px 20px", padding:"15px"}}>
      
      <Introduction />
      <CallToAction />
      <Features />
      
    </div>
  );
}

export default Home;
