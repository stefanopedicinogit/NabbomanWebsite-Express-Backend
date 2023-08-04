const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
router.use(express.json({ limit: '50mb' }));

const pool = new Pool({
  user: 'ssdemypk',
  host: 'surus.db.elephantsql.com',
  database: 'ssdemypk',
  password: 'UyG4bjJ_JoJoKcWq267DgHjt-RHxt_dk',
  port: 5432,
});

const products = new Map([]);

router.get('/get', async (req, res) => {
    try {
      res.status(200).json({ products: Array.from(products.values()) });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

// router.get('/get', async (req, res) => {
//   try {
//     const query = 'SELECT * FROM products;';
//     const { rows } = await pool.query(query);
//     res.status(200).json({ products: rows });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

router.post('/post', async (req, res) => {
  try {
    const { id, name, price, description, imgBase64 } = req.body;
    console.log(`Received form data: id=${id}, name=${name}, price=${price}, description=${description}, imgBase64=img`);

    const newItem = {
      id: id,
      price: price,
      name: name,
      description: description,
      imgBase64: imgBase64
    };

    products.set(products.size + 1, newItem);
    console.log('products', products);
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// router.post('/post', async (req, res) => {
//   try {
//     const { id, name, price, description, imgBase64 } = req.body;
//     console.log(`Received form data: id=${id}, name=${name}, price=${price}, description=${description}, imgBase64=img`);

//     const query = 'INSERT INTO products (id, name, price, description, imgBase64) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
//     const values = [id, name, price, description, imgBase64];
//     const { rows } = await pool.query(query, values);
//     const newItem = rows[0];

//     console.log('products', newItem);
//     res.status(201).json({ message: 'Item added successfully', item: newItem });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

module.exports = router;
