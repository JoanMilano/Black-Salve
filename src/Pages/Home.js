import React from "react";
import twoOz from '../assets/imgs/open2oz.avif';
import lodgeImg from "../assets/imgs/lodgeImg.avif";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import brandLogo from "../assets/imgs/BrandLogo.avif";
import car1 from "../assets/imgs/car1.avif";
import car2 from "../assets/imgs/car2.avif";
import car3 from "../assets/imgs/car3.avif";


const Home = () => {
  
  return (

    <div className="landing-page">
      
      <section className="first-section">
      <Carousel className="salve-car" >
          <Carousel.Item>
            <img src={car1} alt="First slide" className="d-block w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={car2} alt="Second slide" className="d-block w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={car3} alt="Third slide" className="d-block w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={twoOz} alt="Fourth slide" className="d-block w-100" />
          </Carousel.Item>
        </Carousel>
      <div className="button-container">
      <NavLink to="/checkout" className="active"><button className="buy-button">Purchase Here!</button></NavLink>
      </div>
      </section>
      
      <section className="second-section">
      <p className="p-one">Grandma's Healing Products Pine Tar Salve is made in many ways but none quite as remarkable as my Grandma's. This unique and powerful slave is a great way to help your body heal itself, safely and easily. It has been used for many generations and customers have reported uses on many things. From Bug bites to burns and boils. Grandma's Healing Salve does it all. This recipe has been used since the early 1800's on family and pets. My Grandma Helen passed the recipe on to me. Besides adding an all natural preservative Grapefruit Seed Extract; the recipe remains the same as those many years ago. It's time to go back to nature.</p>
      <img src={lodgeImg} alt="Cabin On Alaskan Hill" />
      <p>This recipe for Healing Salve will not be released to the public, but we can tell you how it got here.It was created by my family and brought to the United States from Hungary. It was then passed on through the family to my Grandmother, Helen. After she passed on, it was given to my mother. She will in turn, pass it on to me. She has, for the time being, given me authority to sell to consumers around the world. Based in Alaska, our business operates efficiently through a drop ship company, ensuring prompt delivery, primarily from California.  We can also be found on <a href="https://www.amazon.com/Grandmas-Pine-Tar-Salve-2oz/dp/B09CLNV572/ref=asc_df_B09CLNV572/?tag=hyprod-20&linkCode=df0&hvadid=647214035941&hvpos=&hvnetw=g&hvrand=8925760383846125773&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9032476&hvtargid=pla-1950977837195&psc=1&mcid=120c654a471e32bda8e0a5782e778740"  target="_blank" rel="noreferrer">Amazon</a> and <a href="https://www.ebay.com/itm/283012767556?chn=ps&_trkparms=ispr%3D1&amdata=enc%3A1qsxhqCpyQo6Q31ZZM8yXeA88&norover=1&mkevt=1&mkrid=711-117182-37290-0&mkcid=2&mkscid=101&itemid=283012767556&targetid=1583904486362&device=c&mktype=pla&googleloc=9032476&poi=&campaignid=19894961968&mkgroupid=148855406073&rlsatarget=pla-1583904486362&abcId=9307911&merchantid=6296724&gad_source=1&gclid=CjwKCAiAuYuvBhApEiwAzq_YiaFBwzdeFdLZgY8k_CRvsdkwgAbn0Bk_bK8Lcr79QRYySnmp_L85TBoCUuYQAvD_BwE" target="_blank" rel="noreferrer">Ebay</a> if you prefer to purchase there. The jars featured above are the 1oz and 2oz jars we offer. A little goes a long way! Multiple orders get discounts and Family packs are available. 1oz jar is great for camping or traveling and 2oz jar is great for the whole family.</p>
      </section>
      <div className="logo-img-div">
      <img className="logo-img" src={brandLogo} alt="..."/>
      </div>
    </div>
  );
};

export default Home;
