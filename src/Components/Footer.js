import React from "react";
import { NavLink } from "react-router-dom";


// wholesale options available 
const Footer = () => {
 return (
        <section className="footer">
            <p>produced my joan milano(linked to portfolio)</p>
            <p>copyright 2024</p>
            <p>smol disclaimer's</p>
             <div className="social-icon">
                <a target="_blank" rel="noreferrer" alt="Facebook link">Facebook Link</a>
                <br />
                <NavLink target="_blank" rel="noreferrer" alt="Email link">email link</NavLink>
            </div>
        </section> 
    );
};



export default Footer; 