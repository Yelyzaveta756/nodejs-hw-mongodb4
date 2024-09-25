import { model, Schema } from "mongoose";

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

// User.methods.toJSON = function () {
//     const obj = this.toObject();
//     delete obj.password;
//     return obj;
//   };

export const UserCollection = model('users', User);
