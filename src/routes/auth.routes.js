const express = require('express');
// const jwt = require('jsonwebtoken');

const CreateUserService = require('../services/CreateUserService');
const LoginService = require('../services/LoginService');

const createUserService = new CreateUserService();
const loginService = new LoginService();

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    await createUserService.execute({ name, email, password, confirmPassword });
    console.log('user created!');
    return res.send({ message: 'user created!', user: { name, email } });
  } catch (error) {
    console.error('error', error);
    return res.status(400).send({ message: 'error while creating user!' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginService.execute({ email, password });
    console.log('user logged in!');
    return res.status(200).send(token);
  } catch (error) {
    console.error('error', error);
    return res.status(401).send({ message: 'error while logging user!' });
  }
});

authRouter.patch('/resetpassword', (req, res) => {
  // send link with email
  const { email, password } = req.body;
  // check if email exists
  // if yes, send email with link to reset the password
});

module.exports = authRouter;
