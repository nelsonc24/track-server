"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const User = mongoose_1.model('User');
const authRoutes = express_1.default.Router();
authRoutes.post('/signup', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.send('You made a post request 2');
    }
    catch (error) {
        res.status(422).send(error.message);
    }
});
exports.default = authRoutes;
//# sourceMappingURL=authRoutes.js.map