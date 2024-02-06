import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";



const Home = () => {
  return (
    <div className="landing-page">
      <Carousel>
        <CarouselItem>2oz closed</CarouselItem>
        <CarouselItem>2oz open</CarouselItem>
        <CarouselItem>1oz closed</CarouselItem>
        <CarouselItem>1oz open</CarouselItem>
      </Carousel>
      <a><button>Purchase Here!</button></a>
      <a><button>Learn more..</button></a>
      <p>logo with ingredients behind it, img</p>
      <p>opening text, a little bit of everything</p>
    </div>
  );
};

export default Home;
