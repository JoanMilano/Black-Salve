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
            <button>Buy now!</button>
            <img>logo with ingredients behind it</img>
            <p>opening text, little bit of everything</p>
        </div>
    );
};



export default Home; 