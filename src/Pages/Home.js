import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import twoOz from '../assets/imgs/open2oz.avif';


const Home = () => {
  return (

    <div className="landing-page">
          <img src={twoOz} alt="..."/>
      <a><button>Purchase Here!</button></a>
      <a><button>Learn more..</button></a>
      <p>logo with ingredients behind it, img</p>
      <p>opening text, a little bit of everything</p>
    </div>
  );
};

export default Home;
