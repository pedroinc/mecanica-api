import express from 'express';

import CreateUserService from '../services/CreateUserService';
import LoginService from '../services/LoginService';

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

    res.cookie('token', token, {
      secure: false, // process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'strict',
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
    res.clearCookie('token');

    return res.status(201);
  } catch (error) {
    console.error('error', error);
    return res.status(400).send({ message: 'error while creating user!' });
  }
});

export default authRouter;
