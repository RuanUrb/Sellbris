import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../domain/entities/User/User';
import { SECRET_KEY } from '../../infra/environment/env';

// Custom JWT authentication middleware
async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers) {
    const token = req.cookies.token
    //?.split(' ')[1]; // necessary if you are passing in like so: "" Bearer *************.... "
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    //@ts-ignore
    return jwt.verify(token, SECRET_KEY, async (err: any, decoded: any) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      //@ts-ignore
      req.userId = decoded.id;
            //@ts-ignore

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }
      next();
    });
  }
  return res.status(400).json({ error: 'No headers provided' });
}

async function createJWT(req: Request, res: Response) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (token) {
      return res.status(400).json({ error: 'A token already exists' });
    }

    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const { id } = user;

        //@ts-ignore

    const newToken = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1d' });

    return res.status(200).cookie('token', newToken, {
      maxAge: 60*60*24*1000,
      httpOnly: true
    }).json(newToken);
  }
  return res.status(400).json({ error: 'No headers provided' });
}

const userJWT = (req: Request, res: Response, next: NextFunction)=>{
  if (req.headers) {
    const token = req.cookies.token
    //?.split(' ')[1]; // necessary if you are passing in like so: "" Bearer *************.... "
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    //@ts-ignore
    return jwt.verify(token, SECRET_KEY, async (err: any, decoded: any) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      req.body.id = decoded.id;

      const user = await User.findById(req.body.id);

      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }
      //return res.json({user})
      return res.json({isAuth: true})
    });
  }
  return res.status(400).json({ error: 'No headers provided' });
}



export { verifyJWT, createJWT, userJWT };