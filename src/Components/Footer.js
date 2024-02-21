import React from "react";
import Gmail from '../assets/imgs/IconGmail.webp';
import FaceBook from '../assets/imgs/facebookIcon.webp';


// wholesale options available 
const Footer = () => {
 return (
        <section className="footer">
            <p>Produced by Joan Milano(linked to portfolio).</p>
            <p>© 2024 Grandma's Healing Salve </p>
            <div className="social-icon-footer">
                <a href="mailto:grandmashealingsalve@gmail.com" rel="noreferrer"><img src={Gmail} className="gmail-icon" alt="Gmail Icon With Link"/></a>
                <a href="https://www.facebook.com/Grandmashealingsalve/" target="_blank" rel="noreferrer"><img src={FaceBook} className="facebook-icon" alt="FaceBook Icon With Link" /></a>
            </div>
            <p>Grandmas Healing Products Pine Tar Salve - Formerly known as Grandmas Black Salve and Grandmas Healing Salve</p>
        </section> 
    );
};



export default Footer; 