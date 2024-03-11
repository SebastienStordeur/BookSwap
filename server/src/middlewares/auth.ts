import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token!, process.env.JWT_KEY!) as JWTPayload;
    const userId = decodedToken.id;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Not authorized";
    } else {
      res.locals.userId = userId;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Unidentified request " + error });
  }
};

export default auth;
