const express = require('express');
const router = express.Router();
const stripe = require("stripe")('sk_test_51NHOLaId2hbDw46RaTXq2VPvP1gUGJvh4hmiirLo6B9DIjzNqIGPqWzRFIP6SEuaMXgsyEhebBgK7u1vr27jdGhv00Bnz1oJFu');

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

router.post('/', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3001/checkout-success`,
      cancel_url: `http://localhost:3001/checkout-cancel`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

module.exports = router;
