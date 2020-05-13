require('./models/User');
require('./models/Track');
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes';
import trackRoutes from '../routes/trackRoutes';
import requireAuth from './middlewares/requireAuth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(requireAuth);
app.use(trackRoutes);


const mongoUri = 'mongodb+srv://admin:carteldecali@cluster0-lqig6.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', err => {
    console.log('Error connecting to mongo', err);
});

app.get('/', (req: any, res: Response) => {
    res.send(`Your email: ${req.user.email}`)
});

app.post('/t', (req: Request, res: Response) => {
    res.send('Post a la verga');
    res.end();
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
    
})