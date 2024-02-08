import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";


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
    <Container id="nav-body">
      <Navbar.Brand href="#home">
        <h2>Grandmas Healing Salve</h2>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
            <NavLink to='/' className="active"> {/* Try out router's activeClassName as sm point during styling*/}
              HomePage
            </NavLink>
            <NavLink to="/info" className="active">
              Uses & Testimonials
            </NavLink>
            <NavLink to="/contact" className="active">
              Get In Touch
            </NavLink>
            <NavLink to="/checkout" className="active">
              Purchase Here!
            </NavLink>
            </Nav>
          <span className="navbar-text">
            <div className="social-icon">
                <a target="_blank" rel="noreferrer">  <img alt="Facebook link"></img></a>
                <a target="_blank" rel="noreferrer">  <img alt="Email link"></img></a>
            </div>
          </span>
      </Navbar.Collapse>
    </Container>
  </Navbar>



    );
};


export default NavBar; 
