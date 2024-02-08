import React from "react";
import twoOz from '../assets/imgs/open2oz.avif';
import paraImg1 from "../assets/imgs/paraImg1.avif";

const Home = () => {
  return (

    <div className="landing-page">
      <section className="firstSection">
          <img className="salve" src={twoOz} alt="..."/>
      <div className="button-container">
      <a href="#"><button>Purchase Here!</button></a>
      <a href="#"><button>Learn more..</button></a>
      </div>
      </section>
      <section className="second-section">
      <p className="p-one">Grandma's Healing Products Pine Tar Salve is made in many ways but none quite as remarkable as my Grandma's. This recipe for Healing Salve will not be released to the public, but we can tell you how it got here. It was created by my family and brought to the United States from Hungary. It was then passed on through the family to my Grandmother, Helen. After she passed on, it was given to my mother. She will in turn, pass it on to me. She has, for the time being, given me authority to sell to consumers around the world.</p>
      <img className="img-one" src={paraImg1} alt="Cabin On Alaskan Hill" />
      <p className="p-two">We are based in Alaska. We have a drop ship company so most of the time it ships from California to get to you quicker. We can also be found on Amazon and Ebay if you prefer to purchase there. The jar to the left is a 1oz jar.  A little goes a long way!  Multiple orders get discounts and Family packs are available. 1oz jar is great for camping or traveling.  2oz jar is great for the whole family.</p>
      <img className="img-two" src={paraImg1} alt="Cabin On Alaskan Hill" />
      <p className="p-three">Grandma's Healing Products Pine Tar Salve is a great way to help your body heal itself, safely and easily.  It has been used for many generations and customers have reported uses on many things. From Bug bites to burns and boils. Grandma's Healing Salve does it all.  This recipe has been used since the early 1800's on family and pets. My Grandma Helen passed the recipe on to me. Besides adding an all natural preservative Grapefruit Seed Extract; the recipe remains the same as those many years ago. It's time to go back to nature.</p>
      <img className="img-three" src={paraImg1} alt="Cabin On Alaskan Hill" />
      </section>
      <img className="logo-img" src={twoOz} alt="..."/>
    </div>
  );
};

export default Home;
