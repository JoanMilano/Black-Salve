// send order confirmation email, and order ID 

// send order confirmation email, and order ID 
// take, parse, formatt and send API to paypal

//initialize 
const express = require('express');
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');
require('dotenv').config();
const cors = require('cors');
const path = require('path')
const fetch = require('node-fetch')
const app = express();

//Configure 
app.use(cors('https://grandmashealingsalve.com/'));
const PORT = 10000 ;
  app.listen(PORT, () => {
    console.log(`Payment server listening at http://localhost:${PORT}/`);
  });
  app.get('/', (req, res) => {
    res.send('Payment Server Back-end is Live');
  });

// Configure PayPal SDK
const PAYPAL_CLIENT_ID = process.env.CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.CLIENT_SECRET;
const base = "https://api.paypal.com"; // Remove sandbox before going live & from frontend capture URL!!
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());


// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */


// generating access token make sure client and secret are correct 
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};



/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */


const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  
  const subTotalPrice = Number(cart.subTotalPrice);
  const shippingPrice = cart.shippingPrice;
  const shippingType = cart.shippingType;
  const totalPrice = subTotalPrice + shippingPrice; 

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
          amount: {
            currency_code: 'USD',
            value: totalPrice,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: subTotalPrice
               },
               shipping: {
                currency_code: 'USD',
                value: shippingPrice
              }
            }
          },
          items: cart.selectedItems.map(item => ({
              name: item.title,
              description: item.description,
              quantity: item.quantity,
              category: 'PHYSICAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: item.price
              },
         })),
         shipping_preference: shippingType
      },
   ],
};

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(400).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});



// ****************** Email Server  ******************// 

const router = express.Router(); 
const nodemailer = require('nodemailer'); 
const dotenv = require("dotenv"); 

dotenv.config();
app.use(express.json()); 
app.use("/", router); 
  app.listen(PORT, () => {
    console.log(`Email server listening at http://localhost:${PORT}/`);
  });
  app.get('/', (req, res) => {
    res.send('Email Server Back-end is Live');
  });

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // clients email
      pass: process.env.GMAIL_PASS // clients email app password
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });
  
  router.post("/contact", (req, res) => {
    try {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;

      if (!name || !email || !message || !phone) {
        throw new Error("Incomplete form data"); 
      }

    const mail = {
      from: name,
      to: "grandmashealingsalve@gmail.com", // clients email 
      subject: "Contact Form Submission - Black Salve",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
          console.log("Error sending email", error); 
          console.log(process.env.GMAIL_USER);
          console.log(process.env.GMAIL_PASS);
          res.status(500).json({ code: 500, status: "Error sending email" }); 
        } else {
          res.status(200).json({ code: 200, status: "Message Sent" });
        }
      });
    }   catch (error) {
      console.error("Error processing form data", error); 
      res.status(400).json({ code: 400, status: "Bad Request" }); 
        }
    });