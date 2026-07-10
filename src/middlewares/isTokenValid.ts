import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET as string;

const HTTP_STATUS_CODE = {
  UNAUTHORIZED: 401,
};

const invalidTokenMessage = 'Access denied.';

const isTokenValid = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token)
    return res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: invalidTokenMessage });

  try {
    const payload = jwt.verify(token, jwt_secret) as JwtPayload | undefined;
    if (!payload || !payload._id) {
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

export default isTokenValid;
