import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Gmail from '../assets/imgs/IconGmail.webp';
import FaceBook from '../assets/imgs/facebookIcon.webp';

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const onScroll = () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
  
      window.addEventListener("scroll", onScroll); // window === webpage. global JS variable
  
      return () => window.removeEventListener("scroll", onScroll);
    }, [])

 return (
  <Navbar expand="lg" className={scrolled ? "nav scrolled" : "nav"}> 
    <Container>
      <Navbar.Brand href="#home">
        <h2>Grandmas Healing Salve</h2>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="nav-container">
            <Nav className="navbar-links">
            <NavLink to='/' className="nav-link">
              HomePage
            </NavLink>
            <NavLink to="/info" className="nav-link">
              Uses & Testimonials
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Get In Touch
            </NavLink>
            <NavLink to="/checkout" className="nav-link">
              Purchase Here!
            </NavLink>
            </Nav>
          <span className="navbar-text">
            <div className="social-icon-nav">
                <a href="mailto:grandmashealingsalve@gmail.com" rel="noreferrer"><img src={Gmail} className="gmail-icon" alt="Gmail Icon With Link"/></a>
                <a href="https://www.facebook.com/Grandmashealingsalve/" target="_blank" rel="noreferrer"><img src={FaceBook} className="facebook-icon" alt="FaceBook Icon With Link" /></a>
            </div>
          </span>
      </Navbar.Collapse>
    </Container>
  </Navbar>



    );
};


export default NavBar; 
