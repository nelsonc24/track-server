"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const User = mongoose_1.model('User');
exports.default = (req, res, next) => {
    const { authorization } = req.headers;
    const error_not_auth = { error: 'You must be logged in.' };
    if (!authorization) {
        return res.status(401).send(error_not_auth);
    }
    const token = authorization.replace('Bearer ', '');
    console.log('token', token);
    jsonwebtoken_1.default.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            res.status(401).send(error_not_auth);
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};
//# sourceMappingURL=requireAuth.js.map