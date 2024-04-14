const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET;

const HTTP_STATUS_CODE = {
  UNAUTHORIZED: 401,
};

const invalidTokenMessage = 'Access denied.';

const isTokenValid = (req, res, next) => {
  const [, token] = req.headers.authorization?.split(' ') || ['', ''];

  if (!token)
    return res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: invalidTokenMessage });

  try {
    const payload = jwt.verify(token, jwt_secret);
    if (!payload && !payload._id) {
      return res
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json({ message: invalidTokenMessage });
    }
    return next();
  } catch (error) {
    console.error(error);
    return res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: invalidTokenMessage });
  }
};

module.exports = isTokenValid;
