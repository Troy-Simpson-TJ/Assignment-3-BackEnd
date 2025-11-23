const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        password: {
            type: String,
            required: 'Password is required',
            trim: true
        },
        created: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

module.exports = mongoose.model("User", UserSchema);