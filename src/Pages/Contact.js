import React from 'react';
import { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'; 
import Gmail from '../assets/imgs/IconGmail.webp';
import FaceBook from '../assets/imgs/facebookIcon.webp';



export const Contact = () => {
    const formInitialDetails = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    }

const [formDetails, setFormDetails] = useState(formInitialDetails); // changes as user fills out form 
const [buttonText, setButtonText] = useState('Send');  // button default says send button after being clicked changes to sending 
const [status, setStatus] = useState({}); // if or if not message has been send successfully


const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
}

const handleSubmit = async (e) => { // asynchronous programming !!???
    e.preventDefault(); // so page deosnt reload when form is submitted
    setButtonText("Sending...");
    let response = await fetch("http://localhost:3000/contact", { // path to server 
      method: "POST", // sends HTTP POST request to server at ^^
      headers: {
        "Content-Type": "application/json;charset=utf-8", // translates to JSON
      },
      body: JSON.stringify(formDetails), // body is more concise id for the form details. why we need to stringify???
    });

setButtonText("Send"); // when done sending set button back send
 let result = await response.json();
 console.log(response); // waiting for response in json formmat?? 
 setFormDetails(formInitialDetails); // clear form 
 if (result.code === 200) { // code from server when sent successfully 
    setStatus({ success: true, message: 'Message sent successfully.'}); 
 } else { // didnt send back success
    setStatus({ success: false, message: 'Something went wrong.' })
 }
};  

        return (
            <section className="contact-page" id="get-in-touch">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                        </Col>
                        <Col md={6}>
                            <h2>Get In Touch</h2> 
                <div className='contact-info'>
            <div className="social-icon-contact">
                <a href="mailto:grandmashealingsalve@gmail.com" target="_blank" rel="noreferrer"><img src={Gmail} alt="Gmail Icon Link" /></a>
                <a href="https://www.facebook.com/Grandmashealingsalve/" target="_blank" rel="noreferrer"><img src={FaceBook} alt="FaceBook Icon Link"/></a>
            </div>
            </div>
          <p>+1 (916)-397-5997</p> {/* link? */}
          <p>grandmashealingsalve@gmail.com</p> {/* link? */}
          <p>Monday-Friday: 8:00am-5:00pm</p>
          <form onSubmit={handleSubmit} className="contact-form">
               <Row>
               <Col sm={6} className="px-1">
                 <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col sm={6} className="px-1">
                      <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                    </Col>
                    <Col sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col sm={6} className="px-1">
                      <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                    </Col>
                    <Col> 
                      <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} />
                    </Col>
                    <Row>
                    <div className="g-recaptcha" data-sitekey="6LeE2GIpAAAAADyN1i7pOI3KcQFH4M8iU7V5TPgC"></div>
                    <Col>
                      <button type="submit"><span>{buttonText}</span></button>
                        {
                           status.message && 
                             <Col>
                               <p className={`alert ${status.success === false ? 'alert-danger' : 'alert-success'}`}>{status.message}</p>
                             </Col>
                                    }
                                    </Col>
                                    </Row>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        ) 
        
    }

 
 
 
 
 
export default Contact; 