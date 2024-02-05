import React, { useState } from "react";
import { Carousel, CarouselItem, Dropdown, DropdownButton } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";



const Home = () => {
    const [selectedItems, setSelectedItems ] = useState([]);

    const productOne = {
      title: '1oz Salve',
      description: '1oz container of Black Salve',
      nonBulkPrice: 10, 
      bulkPrice: 5,
      bulkQuantityThreshold: 5,
    }

    const productTwo = {
      title: '2oz Salve',
      description: '2oz container of Black Salve',
      nonBulkPrice: 20, 
      bulkPrice: 15,
      bulkQuantityThreshold: 5,
    }

  // alerty that payment was successful and give customer there order ID (optional) send or ID to their email 
    const handleOnSuccess = (details, data) => {
    const { payer } = details;
    const customerName = payer.name.given_name;
    const customerOrderID =  data; // how do I extract the order ID from paypal given by paypal???
    // const = email of customer 
    alert(
      `Transaction complete! Thank You for your purchase ${customerName},
       your order ID is ${customerOrderID}`);
       // send to back-end to send compose & send email with order ID
  };



  const handleOnClick = (product, quantity) => {
    const existingItemIndex = selectedItems.findIndex((item) => item.title === product.title)

    if (existingItemIndex !== -1) { // if item already exist in the array
      setSelectedItems((prevItems) =>
      prevItems.map((item, index) =>
      index === existingItemIndex 
      ? { ...item, quantity: item.quantity + quantity} 
      : item
        )
      );
    } else {
     // add new item to selectedItems
      setSelectedItems((prevItems) => 
      [...prevItems, { ...product, quantity}])
    }
  }  



  // how munch of the items are selected 
  const calculateTotalAmount = () => {
    return selectedItems.reduce((total, item) => {
      return total + calculateUnitAmount(item)
  }, 0);
} 

 // function for calculating when to use bulk pries function
  const calculateUnitAmount  = item => {
      if (item.quantity >= item.bulkQuantityThreshold) {

   return item.quantity * item.bulkPrice; 
  } else {
    return item.quantity * item.nonBulkPrice; 
  }
}


  // Items name and price varys depending on which item and amount  
  const createOrder = (actions) => { 
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: calculateTotalAmount().toFixed(2), // total amount
          },
          items: selectedItems.map(item => ({
              title: item.title,
              description: item.description,
              quantity: item.quantity,
              category: 'PHYSICAL_GOODS', // Update with the appropriate category
              unit_amount: {
                currency_code: 'USD', // hard-code if more then one accepted currency then dynamic
                value: calculateTotalAmount(item).toFixed(2), // Update with the actual unit amount
              },
            })),
            // Shipping info (country, state, city, zipcode, street # & name) bonus: verify b4 continuing
            // Contact info (number, email, name)
        },
      ],
    });
  };


  return (
    <div className="landing-page">
      <Carousel>
        <CarouselItem>2oz closed</CarouselItem>
        <CarouselItem>2oz open</CarouselItem>
        <CarouselItem>1oz closed</CarouselItem>
        <CarouselItem>1oz open</CarouselItem>
      </Carousel>

      <Dropdown> {/* re-do selection process to be more bulk friendly*/}
        <DropdownButton title="1oz Salve" onClick={() => handleOnClick(productOne, 1)}>1oz Salve</DropdownButton>
        <DropdownButton title="2oz Salve" onClick={() => handleOnClick(productTwo, 1)}>2oz Salve</DropdownButton>
      </Dropdown>

      <PayPalButton 
      amount={calculateTotalAmount().toFixed(2)} // .toFixed(2) ensures compliance with currency format
      createOrder={(data, actions) => createOrder(data, actions)} 
      onSuccess={(details, data) => handleOnSuccess(details, data)}
       />
      
      <p>logo with ingredients behind it, img</p>
      <p>opening text, a little bit of everything</p>
    </div>
  );
};

export default Home;
