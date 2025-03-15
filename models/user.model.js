import mongoose from 'mongoose';


/* 
create a schema for a user with the following properties:

- username (String and required)
- email (use regex to validate)
- password (will be hashed during signup)

*/


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,

        match:[/\S+@\S+\.\S+/, 'Please fill a valid email address'] // contact@name.com 

    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;