import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {model} from 'mongoose';
import {User} from '../models/User';

const User = model<User>('User');

export interface RequestProp extends Request {
    user: User | null
}

export default (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const error_not_auth = {error:'You must be logged in.'};

    if(!authorization) {
        return res.status(401).send(error_not_auth);
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err: any, payload: any) => {
        if(err) {
            res.status(401).send(error_not_auth)
        }

        const { userId } = payload;

        const user = await User.findById(userId);

        req.user = user;
        next();

    })
}