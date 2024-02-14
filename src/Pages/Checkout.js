import React, { useState } from "react";
import twoOz from "../assets/imgs/open2oz.avif"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

    const Checkout = () => {

      const [selectedItems, setSelectedItems] = useState([]);
      const [firstButtonText, setFirstButtonText] = useState("0");
      const [secondButtonText, setSecondButtonText] = useState("0");
      const [shippingPrice, setShippingPrice] = useState(0);
      const [shippingType, setShippingType] = useState("Select a Shipping Method");
      const [priceOfProductOnes, setPriceOfProductOnes] = useState(0);
      const [priceOfProductTwos, setPriceOfProductTwos] = useState(0);
      const [subTotalPrice, setSubTotalPrice] = useState(0);
      const [totalPrice, setTotalPrice] = useState(0);


      const productOne = {
    title: '1oz',
    description: '1oz container of Black Salve',
    quantity: 0,
    price: 0,
  }

  const productTwo = {
    title: '2oz',
    description: '2oz container of Black Salve',
    quantity: 0,
    price: 0,
  }

 
  const handleOnClick = (product, quantity, price) => {
    // prevent default
    let selectedProduct = { title: product, quantity, price }; 

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
    if (existingItemIndex !== -1 && selectedProduct.quantity  > 0) {
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
    setFirstButtonText(quantity) 
  }  else if  (product === productTwo.title) {
    setSecondButtonText(quantity)};  
    
  }
  
  calculatePrices(selectedItems, shippingPrice, shippingType);
  
  }

// calculating shipping

  function calculateShipping(selectedItems, shippingPrice, shippingType) {
   
  const totalOrderQuantity  = selectedItems.reduce((total, item)=> {
    return total + item.quantity;
  }, 0);
      // !!!!!!!!Make radio buttons automatically select priority when order is over 5 items !!!!!!!!!!!!!
  if (totalOrderQuantity > 5) {  
  setShippingType("Priority")
  setShippingPrice(0); 
} else if (shippingType === "Priority" && totalOrderQuantity <= 5) {
  setShippingPrice(5); 
} else  {
  setShippingType("Standard");
  setShippingPrice(0);
}
  }

  function calculatePrices(selectedItems, shippingPrice, shippingType) {
    calculateShipping(selectedItems, shippingPrice, shippingType)
    // total price of product one
    const priceOfProductOnes = selectedItems.filter(item => item.title === productOne.title).reduce((priceTotal, item) => {
      return priceTotal += item.quantity * item.price;
      }, 0)

    // total price of product two
      const priceOfProductTwos = selectedItems.filter(item => item.title === productTwo.title).reduce((priceTotal, item) => {
        return priceTotal += item.quantity * item.price;
        }, 0)

      // total price of items without shipping (subtotal)
      const subTotalPrice = selectedItems.reduce((priceTotal, item) => {
        return priceTotal += item.quantity * item.price; 
      }, 0)


// total price of items with shipping (total)
        const totalPrice = selectedItems.reduce((priceTotal, item) => {

          return priceTotal += item.quantity * item.price + shippingPrice; 
        }, 0)
        console.log(selectedItems)
    setPriceOfProductOnes(priceOfProductOnes);
    setPriceOfProductTwos(priceOfProductTwos);
    setSubTotalPrice(subTotalPrice);
    setTotalPrice(totalPrice);
       
        
  }

  const createOrder = (actions) => { 
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalPrice,
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

  const handleOnSuccess = (details, data) => {
    const { payer } = details;
    const customerName = payer.name.given_name;
    const customerOrderID =  data;
    alert(
      `Transaction complete! Thank You for your purchase ${customerName}, your order ID is ${customerOrderID}`
    );
  };

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
    <DropdownItem onClick={() => setSelectedItems(selectedItems.filter(item => item.title !== productOne.title))} placeholder="0">None</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 1, 16.99)}>1 --1oz-- 17.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 2, 16.99)}>2 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 3, 16.99)}>3 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 4, 16.99)}>4 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 5, 16.99)}>5 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownDivider></DropdownDivider>
    <DropdownItem>Contact for Wholesale</DropdownItem>
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
  <DropdownMenu className="drop-menu">
  <DropdownItem onClick={() => setSelectedItems(selectedItems.filter(item => item.title !== productTwo.title))} placeholder="0">None</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 1, 24.99)}>1 --2oz-- 24.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 2, 23.99)}>2 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 3, 23.99)}>3 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 4, 23.99)}>4 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 5, 23.99)}>5 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownDivider></DropdownDivider> {/* up to 20 items*/}
    <DropdownItem>Contact for WholeSale</DropdownItem> 
  </DropdownMenu>
</Dropdown>
 </section>
 <div className="shipping-details-pay">
  <div className="shipping-details">
 <section className="shipping-section">
      <form className="shipping-form" required> 
        <div>
      <input type="radio" id="option1" name="options" value="option1" onClick={() => setShippingType('Standard') }/>
  <label htmlFor="option1">Standard Shipping</label>
  <p>Free - 5 to 7 bussiness days</p>
  </div>
  <div>
  <input type="radio" id="option2" name="options" value="option2" onClick={() => setShippingType('Priority') }/>
  <label htmlFor="option2">Priority Shipping</label>
  <p>5$ or Free for orders over 5 items</p>
  <p>3 to 5 bussiness days</p>
  </div>
      </form>
 </section>
 <section className="details-section">
  <h3>Order Details</h3>
    <p>{selectedItems.find(item => item.title === productOne.title)?.quantity || 0} 1oz {priceOfProductOnes}$</p>
     <p>{selectedItems.find(item => item.title === productTwo.title)?.quantity || 0} 2oz {priceOfProductTwos}$</p>  {/* conditionally render if theres a quantity > 0*/ }
    <p>Subtotal: {subTotalPrice}$</p>
    <p>{shippingType}: {shippingPrice}$</p>
    <p>Total {totalPrice}$</p>
 </section>
 </div>
 <section className="paypal-section">
  <h1>Purchase here!</h1>
  {shippingType === "Select a Shipping Method" && (<p>Select a shipping option before proceeding to checkout.</p>)}
{shippingType !== "Select a Shipping Method" && (
<PayPalButton 
        amount={totalPrice.toFixed(2)} 
        createOrder={(data, actions) => createOrder(data, actions)} 
        onSuccess={(details, data) => handleOnSuccess(details, data)}
      />)}
 </section>
 </div>
  </div>
    );
};

export default Checkout;  

