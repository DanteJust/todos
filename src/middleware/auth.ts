import { NextFunction, Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

const config = process.env;

interface JwtPayload {
  _id: string
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.headers["x_access_token"];
  
    if (!token) {
      return res.status(403).json({ message: "A token is required for authentication!" });
    }
    try {
      jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token!' });
    }

    return next();
}

const verifyUserAccess = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const token = req.headers["x_access_token"] || req.body.token;
  const { _id } = jwt.decode(token) as JwtPayload;

  if (user_id !== _id){
      return res.status(403).json({ message: 'You dont have access to this list!' });
  }
  return next();
}
  
export default { verifyToken, verifyUserAccess };