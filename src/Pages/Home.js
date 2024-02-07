import React from "react";
import twoOz from '../assets/imgs/open2oz.avif';


const Home = () => {
  return (

    <div className="landing-page">
      <div className="firstSection">
          <img className="salve" src={twoOz} alt="..."/>
      <div className="button-container">
      <a><button>Purchase Here!</button></a>
      <a><button>Learn more..</button></a>
      </div>
      </div>
      <div className="logo-img"><img src={twoOz} /></div>
      <p>opening text, a little bit of everything</p>
    </div>
  );
};

export default Home;
