import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown, DropdownDivider, DropdownItem } from "react-bootstrap"





export const NavBar = () => {

    const [activeLink, setActiveLink] = useState('home');
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
  
    const onUpdateActiveLink = (value) => {
      setActiveLink(value);
    }


 return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}> 
    <Container>
      <Navbar.Brand href="#home">
        <h2>Grandmas Healing Salve</h2>
      </Navbar.Brand>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      Dropdown Button
      </Dropdown.Toggle>
      <Dropdown.Menu>
          <Dropdown.Item href="#info" className={activeLink === 'info' ? 'active navbar-link' : "navbar-link"} onClick={() => onUpdateActiveLink('info')}>Uses & Testimonials</Dropdown.Item>
          <Dropdown.Item href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : "navbar-link"} onClick={() => onUpdateActiveLink('contact')}>Get In Touch</Dropdown.Item>
          <DropdownDivider></DropdownDivider>
          <DropdownItem href="#buy" className={activeLink === 'buy' ? 'active navbar-link' : "navbar-link"} onClick={() => onUpdateActiveLink('buy')}>Purchase Here!</DropdownItem>
          </Dropdown.Menu>
          </Dropdown>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : "navbar-link"} onClick={() => onUpdateActiveLink('home')}>HomePage</Nav.Link>
          <Nav.Link href="#about" className={activeLink === 'about' ? 'active navbar-link' : "navbar-link"} onClick={() => onUpdateActiveLink('about')}>Our Story</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
                <a href="https://www.linkedin.com/in/joan-milano-3b541b29b/" target="_blank" rel="noreferrer">  <img src={navIcon1} alt="Facebook link"></img></a>
                <a href="https://github.com/JoanMilano" target="_blank" rel="noreferrer">  <img src={navIcon2} alt="Email link"></img></a>
            </div>
          </span>
      </Navbar.Collapse>
    </Container>
  </Navbar>

    );
};


export default NavBar; 
