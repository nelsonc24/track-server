import express, { Request, Response } from 'express';
import { model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../src/models/User';

const User = model<User>('User');

const authRoutes = express.Router();

authRoutes.post('/signup', async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });

        await user.save();
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        res.send({token});

    } catch (error) {
        res.status(422).send(error.message)
    }
});

export default authRoutes;