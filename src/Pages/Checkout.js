import React, { useState } from "react";
import twoOz from "../assets/imgs/open2oz.avif";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

const Checkout = () => {
    
  const [selectedItems, setSelectedItems ] = useState([]);

  const productOne = {
    title: '--1oz--',
    description: '1oz container of Black Salve',
    quantity: 0,
    price: 0
  }

  const productTwo = {
    title: '--2oz--',
    description: '2oz container of Black Salve',
    quantity: 0,
    price: 0
  }

  const handleOnSuccess = (details, data) => {
    const { payer } = details;
    const customerName = payer.name.given_name;
    const customerOrderID =  data;
    alert(
      `Transaction complete! Thank You for your purchase ${customerName}, your order ID is ${customerOrderID}`
    );
  };

  const handleOnClick = (quantity, product, price) => {
    const existingItemIndex = selectedItems.findIndex((item) => item.title === product);

    if (existingItemIndex !== -1) {
      setSelectedItems((prevItems) => 
        prevItems.map((item, index) => 
          index === existingItemIndex ? { ...item, quantity} : item
        )
      );
    } else {
      setSelectedItems((prevItems) => 
        [...prevItems, { ...product, quantity}]
      );
    }
  }  

  const calculateTotalAmount = () => {
    return selectedItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const createOrder = (actions) => { 
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: calculateTotalAmount().toFixed(2),
          },
          items: selectedItems.map(item => ({
              title: item.title,
              description: item.description,
              quantity: item.quantity,
              category: 'PHYSICAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: item.price.toFixed(2),
              },
            })),
        },
      ],
    });
  };


    return (
      <div className="checkout-page">
      <div className="checkout-title"><h2>Checkout</h2></div>

      <section className="salve-option-one">
      <img src={twoOz} alt="1oz tin of Black Salve" />
      <Dropdown className="dropdown">
  <button variant="info" className="btn btn-color btn-text">Amount</button>
  <DropdownToggle
   split 
   className="btn-color"
   id="dropdown-split-basic" />
  <DropdownMenu className="drop-menu">
    <DropdownItem onClick={handleOnClick}>1 --1oz-- 17.99 $ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>2 --1oz-- 16.99 $ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>3 --1oz-- 16.99 $ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>4 --1oz-- 16.99 $ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>5 --1oz-- 16.99 $ ea.</DropdownItem>
    <DropdownDivider></DropdownDivider>
    <DropdownItem>Contact for WholeSale</DropdownItem>
  </DropdownMenu>
</Dropdown>
</section>

<section className="salve-option-two">
<img src={twoOz} alt="2oz tin of Black Salve" />
<Dropdown className="dropdown">
  <button variant="info" className="btn btn-color btn-text">Amount</button>
  <DropdownToggle
   split 
   className="btn-color"
   id="dropdown-split-basic" />
  <DropdownMenu className="dropdown-menu">
    <DropdownItem onClick={handleOnClick}>1 --2oz-- 24.99$ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>2 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>3 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>4 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={handleOnClick}>5 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownDivider></DropdownDivider> {/* up to 20 items*/}
    <DropdownItem>Contact for WholeSale</DropdownItem> {/* make contact ancher tag?*/}
  </DropdownMenu>
</Dropdown>
 </section>
 <div className="shipping-details-pay">
  <div className="shipping-details">
 <section className="shipping-section">
      <form className="shipping-form">
        <div>
      <input type="radio" id="option1" name="options" value="option1" />
  <label for="option1">Regular Shipping</label>
  <p>Free - 5 to 7 bussiness days</p>
  </div>
  <div>
  <input type="radio" id="option2" name="options" value="option2" />
  <label for="option2">Priority Shipping</label>
  <p>5$ or Free for orders over 5 items</p>
  <p>3 to 5 bussiness days</p>
  </div>
      </form>
 </section>
 <section className="details-section">
  <h3>Order Details</h3>
    <p>`Items: 2 2oz 33.98$`</p>
    <p>Subtotal `$subtotal`</p>
    <p>Shipping `$shipping`</p>
    <p>Total `$Total`</p>
 </section>
 </div>
 <section className="paypal-section">
  <h1>Purchase here!</h1>
<PayPalButton 
        amount={calculateTotalAmount().toFixed(2)} // .toFixed(2) ensures compliance with currency format ($.$$)
        createOrder={(data, actions) => createOrder(data, actions)} 
        onSuccess={(details, data) => handleOnSuccess(details, data)}
      />
 </section>
 </div>
  </div>
    ) } ; 

    export default Checkout; 

