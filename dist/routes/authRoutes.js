"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = mongoose_1.model('User');
const authRoutes = express_1.default.Router();
authRoutes.post('/signup', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    }
    catch (error) {
        res.status(422).send(error.message);
    }
});
authRoutes.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log('signin', email, password);
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
    try {
        await user.comparePassword(password);
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    }
    catch (error) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});
exports.default = authRoutes;
//# sourceMappingURL=authRoutes.js.map