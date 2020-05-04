import mongoose, {model, Model, Schema, Document} from 'mongoose';

export interface User extends Document {
    email: string,
    password: string
}
const userSchema = new Schema({
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = model<User>('User', userSchema);
export default User;
