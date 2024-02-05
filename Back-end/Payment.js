const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/create-paypal-order', async ( res) => {
  try {
    const order = await createPayPalOrder();
    res.json(order);
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function createPayPalOrder() {
  const accessToken = 'AcIWeQmnOD4m0nKidn4M_HzIWzvLMDOQf2spO6Cql0s42_ebPIKf6ERLLxdUUaWznt180vbewrqajIa5'; // Replace with your PayPal access token

  const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '100.00', // Replace with the actual amount
          },
        },
      ],
    }),
  });

  const orderData = await response.json();
  return orderData;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
