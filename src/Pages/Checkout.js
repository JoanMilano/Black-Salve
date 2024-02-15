import React, { useState, useEffect } from "react";
import twoOz from "../assets/imgs/open2oz.avif";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";


// 1.  
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
  };

  const productTwo = {
    title: '2oz',
    description: '2oz container of Black Salve',
    quantity: 0,
    price: 0,
  };

  const handleOnClick = (product, quantity, price) => {
    let selectedProduct = { title: product, quantity, price }; 

    if (product === productOne.title) {
      selectedProduct = { ...productOne, quantity, price }; 
    } else if (product === productTwo.title) {
      selectedProduct = { ...productTwo, quantity, price };
    }

    if (selectedProduct) {
      const existingItemIndex = selectedItems.findIndex((item) => item.title === selectedProduct.title);
  
      if (existingItemIndex !== -1 && selectedProduct.quantity > 0) {
        setSelectedItems((prevItems) => 
          prevItems.map((item, index) => 
            index === existingItemIndex ? { ...item, quantity, price } : item
          )
        );
      } else if (selectedProduct.quantity === 0) {
        setSelectedItems(selectedItems.filter((item) => item.title !== selectedProduct.title));  
      } else {
        setSelectedItems((prevItems) => [...prevItems, { ...selectedProduct, quantity, price }]);
      }

      if (product === productOne.title) {
        setFirstButtonText(quantity);
      } else if (product === productTwo.title) {
        setSecondButtonText(quantity);
      }
    }
  };

  function calculateShipping(selectedItems) {
    const totalOrderQuantity = selectedItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);


    if (totalOrderQuantity > 5) {  
      setShippingPrice(0); 
    setShippingType("Priority");
      // automatically select priority for user
      const priorityRadioButton = document.getElementById("option2");
      if (priorityRadioButton) {
        priorityRadioButton.click(); 
      }
    } else if (shippingType === "Priority" && totalOrderQuantity <= 5) {
      setShippingPrice(5); 
    } else {
      setShippingPrice(0); 
    }
  }

  useEffect(() => {
    calculatePrices(selectedItems, shippingPrice, shippingType);

  function calculatePrices(selectedItems, shippingPrice, shippingType) {
    calculateShipping(selectedItems, shippingPrice, shippingType);

    const priceOfProductOnes = selectedItems.filter(item => item.title === productOne.title).reduce((priceTotal, item) => {
      return priceTotal + (item.quantity * item.price);
    }, 0);

    const priceOfProductTwos = selectedItems.filter(item => item.title === productTwo.title).reduce((priceTotal, item) => {
      return priceTotal += item.quantity * item.price;
    }, 0);

    const subTotalPrice = selectedItems.reduce((priceTotal, item) => {
      return priceTotal += item.quantity * item.price; 
    }, 0);

    const totalPrice = selectedItems.reduce((priceTotal, item) => {
      return priceTotal += item.quantity * item.price + shippingPrice; 
    }, 0);

    setPriceOfProductOnes(priceOfProductOnes);
    setPriceOfProductTwos(priceOfProductTwos);
    setSubTotalPrice(subTotalPrice.toFixed(2));
    setTotalPrice(totalPrice.toFixed(2));
  }
  // eslint-disable-next-line
}, [selectedItems, shippingPrice, shippingType]); 


const createOrder = (data, actions) => { 
  const itemTotal = selectedItems.reduce((priceTotal, item) => {
    return priceTotal += item.quantity * item.price; 
  }, 0);
  return actions.order.create({
    application_context: {
      locale: 'en-US'
    },
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: totalPrice,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: itemTotal
             }, // set item_total to a number value
             shipping: {
              currency_code: 'USD',
              value: shippingPrice
            }
            }
            },
        items: selectedItems.map(item => ({
            name: item.title,
            description: item.description,
            quantity: item.quantity,
            category: 'PHYSICAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: item.price
            },
          }))
          
      },
    ],
  });
}; 

const handleOnSuccess = (details) => {
  const { payer } = details;
  const customerName = payer.name.given_name;
  const customerOrderID =  details.orderID;
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
    <DropdownItem onClick={() => handleOnClick(productOne.title, 0, 0.00)} placeholder="0">None</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 1, 17.99)}>1 --1oz-- 17.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 2, 16.99)}>2 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 3, 16.99)}>3 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 4, 16.99)}>4 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 5, 16.99)}>5 --1oz-- 16.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 6, 15.99)}>6 --1oz-- 15.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 7, 15.99)}>7 --1oz-- 15.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 8, 15.99)}>8 --1oz-- 15.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 9, 15.99)}>9 --1oz-- 15.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 10, 14.99)}>10 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 11, 14.99)}>11 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 12, 14.99)}>12 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 13, 14.99)}>13 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 14, 14.99)}>14 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 15, 14.99)}>15 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 16, 14.99)}>16 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 17, 14.99)}>17 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 18, 14.99)}>18 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 19, 14.99)}>19 --1oz-- 14.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productOne.title, 20, 14.99)}>20 --1oz-- 14.99$ ea.</DropdownItem>
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
  <DropdownItem onClick={() => handleOnClick(productTwo.title, 0, 0.00)} placeholder="0">None</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 1, 24.99)}>1 --2oz-- 24.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 2, 23.99)}>2 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 3, 23.99)}>3 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 4, 23.99)}>4 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 5, 23.99)}>5 --2oz-- 23.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 6, 22.99)}>6 --2oz-- 22.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 7, 22.99)}>7 --2oz-- 22.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 8, 22.99)}>8 --2oz-- 22.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 9, 22.99)}>9 --2oz-- 22.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 10, 21.99)}>10 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 11, 21.99)}>11 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 12, 21.99)}>12 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 13, 21.99)}>13 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 14, 21.99)}>14 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 15, 21.99)}>15 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 16, 21.99)}>16 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 17, 21.99)}>17 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 18, 21.99)}>18 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 19, 21.99)}>19 --2oz-- 21.99$ ea.</DropdownItem>
    <DropdownItem onClick={() => handleOnClick(productTwo.title, 20, 21.99)}>20 --2oz-- 21.99$ ea.</DropdownItem>
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
      <input type="radio" id="option1" name="options" value="Standard" onClick={() => setShippingType('Standard') }/>
  <label htmlFor="option1">Standard Shipping</label>
  <p>Free - 5 to 7 bussiness days</p>
  </div>
  <div>
  <input type="radio" id="option2" name="options" value="Priority" onClick={() => setShippingType('Priority') }/>
  <label htmlFor="option2">Priority Shipping</label>
  <p>5$ or Free for orders over 5 items</p>
  <p>3 to 5 bussiness days</p>
  </div>
      </form>
 </section>
 <section className="details-section">
  <h3>Order Details</h3>
    <p>{selectedItems.find(item => item.title === productOne.title)?.quantity || 0} 1oz {priceOfProductOnes.toFixed(2)}$</p>
     <p>{selectedItems.find(item => item.title === productTwo.title)?.quantity || 0} 2oz {priceOfProductTwos.toFixed(2)}$</p>  {/* conditionally render if theres a quantity > 0*/ }
    <p>Subtotal: {subTotalPrice}$</p>
    <p>{shippingType}: {shippingPrice}$</p>
    <p>Total {totalPrice}$</p>
 </section>
 </div>
 <section className="paypal-section">
  <h1>Purchase here!</h1>
  {selectedItems.reduce((total, item) => total + item.quantity, 0) === 0 && (<p>Select a at least one item before proceeding to checkout.</p>)}
  {shippingType === "Select a Shipping Method" && (<p>Select a shipping option before proceeding to checkout.</p>)}
{shippingType !== "Select a Shipping Method" && selectedItems.reduce((total, item) => total + item.quantity, 0) > 0 && (
<PayPalButton
        amount={totalPrice} 
        createOrder={(actions, data) => createOrder(actions, data)} 
        onSuccess={(details) => handleOnSuccess(details)}
      />)}
 </section>
 </div>
  </div>
    );
};

export default Checkout;  

