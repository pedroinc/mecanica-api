const express = require('express');

// const {registerView, loginView } = require('../controllers/loginController');

const router = express.Router();

// router.get('/register', registerView);
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  res.send({ route: 'login', username, password });
});

// router.get('/login', loginView);

module.exports = router;
