const express =  require("express"); 
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON in requests
app.use(express.json());

// Server endpoint to create a PayPal order
app.post("/my-server/create-paypal-order", async (req, res) => {
  const order = await createOrder();
  res.json(order);
});

// Function to create a PayPal order using the REST API
function createOrder() {
  // Note: You should replace "REPLACE_WITH_YOUR_ACCESS_TOKEN" with a valid access token (bussiness client ID)
  const accessToken = "AcIWeQmnOD4m0nKidn4M_HzIWzvLMDOQf2spO6Cql0s42_ebPIKf6ERLLxdUUaWznt180vbewrqajIa5";

  return fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "purchase_units": [
        {
          "amount": {
            "currency_code": "USD",
            "value": "100.00"
          },
          "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b"
        }
      ],
      "intent": "CAPTURE",
      "payment_source": {
        "paypal": {
          "experience_context": {
            "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
            "payment_method_selected": "PAYPAL",
            "brand_name": "EXAMPLE INC",
            "locale": "en-US",
            "landing_page": "LOGIN",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "PAY_NOW",
            "return_url": "https://example.com/returnUrl",
            "cancel_url": "https://example.com/cancelUrl"
          }
        }
      }
    })
  })
  .then((response) => response.json());
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
