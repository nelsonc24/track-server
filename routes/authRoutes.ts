import express, { Request, Response } from 'express';

import { model } from 'mongoose';
import { User } from '../src/models/User';

const User = model<User>('User');

const authRoutes = express.Router();

authRoutes.post('/signup', async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });

        await user.save();
        res.send('You made a post request 2');

    } catch (error) {
        res.status(422).send(error.message)
    }
});

export default authRoutes;