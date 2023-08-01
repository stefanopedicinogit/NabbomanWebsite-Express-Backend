const express = require("express");
const cors = require("cors")
const html = require('./html');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://nabbomanwebsite.netlify.app",
  })
)
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const homeRoutes = require('./home');
const checkoutRoutes = require('./stripeCheckout');
const products = require('./products');

app.use('/', homeRoutes(html));
app.use('/create-checkout-session', checkoutRoutes);
app.use('/products', products);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;