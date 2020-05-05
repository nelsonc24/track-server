"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }
            return resolve(true);
        });
    });
};
const User = mongoose_1.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map