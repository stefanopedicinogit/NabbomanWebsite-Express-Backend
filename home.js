const express = require('express');
const router = express.Router();

module.exports = (html) => {
  router.get('/', (req, res) => {
    res.type('html').send(html);
  });

  return router;
}