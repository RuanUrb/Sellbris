import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../domain/entities/User/User';
import 'dotenv/config';
import { SECRET_KEY } from '../../infra/environment/env';
import { IUser } from '../../domain/entities/User/IUser';

/*
export interface IIndexUserRequest extends Request{
  user?: IUser;
}
*/

const createUser = async (req: Request, res: Response): Promise<Response> => {
    const userData = req.body;

    if (!userData.email || !userData.name || !userData.password) {
      return res.status(400).json({ error: 'Fields missing' });
    }

    const passwordHash = await bcrypt.hash(userData.password, 8);

    userData.password = passwordHash;

    const userAlreadyExists = await User.findOne({ name: userData.name });

    if (userAlreadyExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id } = await User.create(userData)

    //@ts-ignore
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1d' });

    return res.status(201).json({ token });
  }

 const index = async (req: any, res: Response)=>{
    const { user } = req;

    return res.send(`Welcome ${user?.name}`);
}

export {createUser, index}
