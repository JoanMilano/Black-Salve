import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";


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
  <Navbar expand="lg" className={scrolled ? "scrolled" : ""}> 
    <Container id="nav-body">
      <Navbar.Brand href="#home">
        <h2>Grandmas Healing Salve</h2>
      </Navbar.Brand>

      <Dropdown.Toggle variant="success" id="dropdown-basic">
      Dropdown Button
      </Dropdown.Toggle>

      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
            <NavLink to="/" activeClassName="active">
              HomePage
            </NavLink>
            <NavLink to="/About" activeClassName="active">
             Our Story
            </NavLink>
            <NavLink to="/Info" activeClassName="active">
              Uses & Testimonials
            </NavLink>
            <NavLink to="/Contact" activeClassName="active">
              Get In Touch
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
