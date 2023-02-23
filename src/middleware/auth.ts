import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const config = process.env;

interface JwtPayload {
  _id: string
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
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
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const { _id } = jwt.decode(token) as JwtPayload;

  if (user_id !== _id){
      return res.status(403).json({ message: 'You dont have access to manipulate item in this list!' });
  }
  return next();
}
  
export default { verifyToken, verifyUserAccess };