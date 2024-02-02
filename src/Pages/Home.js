import React, { useEffect } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";

const Home = () => {
    useEffect(() => {
        const loadPayPalScript = async () => {
          // Load the PayPal script dynamically
          const script = document.createElement("script");
          script.src = "https://www.paypal.com/sdk/js?client-id=AcIWeQmnOD4m0nKidn4M_HzIWzvLMDOQf2spO6Cql0s42_ebPIKf6ERLLxdUUaWznt180vbewrqajIa5&currency=USD";
          script.async = true;
          script.onload = () => {
            // Render PayPal buttons after script has loaded
            window.paypal.Buttons({
              createOrder: function (data, actions) {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: "100.00",
                      },
                    },
                  ],
                });
              },
              onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                  alert("Transaction completed by " + details.payer.name.given_name);
                });
              },
            }).render("#paypal-button-container");
          };
    
          // Append the script to the document
          document.body.appendChild(script);
        };
    
        loadPayPalScript();
      }, []); // Run the effect only once on component mount
 return (
        <div className="landing-page">
            <Carousel>
                <CarouselItem>2oz closed</CarouselItem>
                <CarouselItem>2oz open</CarouselItem>
                <CarouselItem>1oz closed</CarouselItem>
                <CarouselItem>1oz open</CarouselItem>
            </Carousel>
            <div id="paypal-button-container"></div>
            <p>logo with ingredients behind it, img</p>
            <p>opening text, little bit of everything</p>
        </div>
    );
};



export default Home; 