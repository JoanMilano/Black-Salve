import React, { useState } from "react";
import twoOz from "../assets/imgs/open2oz.avif"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

    const Checkout = () => {

      const productOne = {
    description: '1oz container of Black Salve',
    quantity: 0,
    price: 0
  }

  const productTwo = {
    title: '2oz',
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


  const handleOnClick = (event) => {
    // prevent default
    const handleSelectItem = (product, quantity, price) => {
      const selectedProduct = { title: product, quantity, price };
      handleOnClick({ target: { textContent: `${quantity} ${product} ${price} $ ea.` } }, selectedProduct);
    };

    // checks which object the product  belongs too and assigns it to be selectedProduct
    if (product === productOne.title) {
      selectedProduct = { ...productOne, quantity, price }; 
    } else if (product === productTwo.title) {
      selectedProduct = { ...productTwo, quantity, price };
    } 

    // If selected product quantity is not 0 (if the if statement above is true)
      if (selectedProduct) {
        const existingItemIndex = selectedItems.findIndex((item) => item.title === selectedProduct.title);
    


        // based on the existingItemIndex var initialization above, this if () is if it already exist
        // updates the quantity & price of that element in the array using the spread operator
    if (existingItemIndex !== -1 && selectedItems.quantity  > 0) {
      setSelectedItems((prevItems) => 
        prevItems.map((item, index) => 
          index === existingItemIndex
          ? { ...item, quantity, price} 
          : item
        )
      );  // if the quantity is 0 remove it from the selectedItems array
    } else if (selectedProduct.quantity === 0) {
      setSelectedItems(selectedItems.filter(item => item.title !== selectedProduct.title));  
    }
    
    
    else {  // it deosnt already exist add to array using spread operator
      setSelectedItems((prevItems) => 
        [...prevItems, { ...selectedProduct, quantity, price}]
      );
    }


    // update buttton text
    if (product === productOne.title) {
      selectedProduct = { ...productOne, quantity, price }; 
    setFirstButtonText(quantity) 
  }  else if  (product === productTwo.title) {
    selectedProduct = { ...productTwo, quantity, price };
    setSecondButtonText(quantity)};    

  }
  }
  console.log(selectedItems);
}

 const calculateTotalPrice = () => {
  return selectedItems.reduce((total, item) => {
    total += item.quantity * item.price;
    return total;
  }, 0).toFixed(2);
};

  const createOrder = (actions) => { 
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: calculateTotalPrice().toFixed(2),
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

    return (
      <div className="checkout-page">
      <div className="checkout-title"><h2>Checkout</h2></div>

      <section className="salve-option-one">
      <img src={twoOz} alt="1oz tin of Black Salve" />
      <Dropdown className="dropdown">
  <button variant="info" className="btn btn-color btn-text">{firstButtonText}</button>
  <DropdownToggle
   split 
   className="btn-color"
   id="dropdown-split-basic" />
  <DropdownMenu className="drop-menu">
    <DropdownItem onClick={() => setSelectedItems(selectedItems.filter(item => item.title !== productOne.title))}>0</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 1, 16.99)}>1 --1oz-- 17.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 2, 16.99)}>2 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 3, 16.99)}>3 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 4, 16.99)}>4 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 5, 16.99)}>5 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownDivider></DropdownDivider>
    <DropdownItem>Contact for WholeSale</DropdownItem>
  </DropdownMenu>
</Dropdown>
</section>

<section className="salve-option-two">
<img src={twoOz} alt="2oz tin of Black Salve" />
<Dropdown className="dropdown">
  <button variant="info" className="btn btn-color btn-text">{secondButtonText}</button>
  <DropdownToggle
   split 
   className="btn-color"
   id="dropdown-split-basic" />
  <DropdownMenu className="dropdown-menu">
    <DropdownItem onClick={() => setSelectedItems(selectedItems.filter(item => item.title !== productOne.title))}>0</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 1, 16.99)}>1 --2oz-- 24.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 2, 16.99)}>2 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 3, 16.99)}>3 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 4, 16.99)}>4 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleSelectItem(productOne.title, 5, 16.99)}>5 --2oz-- 23.99$ ea.</DropdownItem>
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
  <label htmlFor="option1">Regular Shipping</label>
  <p>Free - 5 to 7 bussiness days</p>
  </div>
  <div>
  <input type="radio" id="option2" name="options" value="option2" />
  <label htmlFor="option2">Priority Shipping</label>
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
        amount={calculateTotalPrice()} // .toFixed(2) ensures compliance with currency format ($.$$)
        createOrder={(data, actions) => createOrder(data, actions)} 
        onSuccess={(details, data) => handleOnSuccess(details, data)}
      />
 </section>
 </div>
  </div>
    );
};

export default Checkout;  

