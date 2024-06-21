const express = require('express');
// const jwt = require('jsonwebtoken');

const CreateUserService = require('../services/CreateUserService');
const LoginService = require('../services/LoginService');
const dayjs = require('dayjs');

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

  console.log({ email, password });

  try {
    const { user, token } = await loginService.execute({ email, password });
    // console.log('user logged in!');

    // const next24Hours = dayjs().add(24, 'hours').toDate();
    // console.log('next24Hours', next24Hours);

    // res.cookie('name', 'GeeksForGeeks', { signed: true }).send();
    res.cookie("token", token, {
      // signed: true,
      secure: false, //process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'strict',
      // expires: next24Hours,
    });

    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.error('error', error);
    return res.status(401).send({ message: 'error while logging user!' });
  }
});

authRouter.get('/logout', async (req, res) => {

  try {
    // res.cookie()
    res.clearCookie("token");

    // res.cookie("cabrini_login_token", null, {
    //   // secure: true || process.env.NODE_ENV !== "development",
    //   httpOnly: true,
    //   expires: dayjs().toDate(),
    // });

    return res.status(201);
  } catch (error) {
    console.error('error', error);
    return res.status(400).send({ message: 'error while creating user!' });
  }
});

// authRouter.post('/email-password-reset', async (req, res) => {
//   const { email } = req.body;

//   try {
//     // await passwordResetService.execute({ name, email, password, confirmPassword });
//     console.log('user created!');
//     return res.send({ message: 'user created!', user: { name, email } });
//   } catch (error) {
//     console.error('error', error);
//     return res.status(400).send({ message: 'error while creating user!' });
//   }
// });

// authRouter.post('/execute-password-reset', async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   try {
//     await passwordResetService.execute({ name, email, password, confirmPassword });
//     console.log('user created!');
//     return res.send({ message: 'user created!', user: { name, email } });
//   } catch (error) {
//     console.error('error', error);
//     return res.status(400).send({ message: 'error while creating user!' });
//   }
// });

module.exports = authRouter;
