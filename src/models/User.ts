import mongoose, { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
    email: string,
    password: string
}
const userSchema = new Schema({
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

userSchema.pre<User>('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });

    });
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
    const user = this;
    
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }

            return resolve(true);
        })
    });

}

const User = model<User>('User', userSchema);
export default User;
