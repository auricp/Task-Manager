import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Blacklist from '../models/blacklist.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';



export const signUp = async (req, res, next) =>{

    const session = await mongoose.startSession();
    session.startTransaction()

    try {
        // logic to create a new user
        const { username, email, password } = req.body;

        // check if user already exists by their email
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error
        }

        // Hash password (dont want to store in plaintext)
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user (session is for if something goes wrong and if we abort the transaction then the user will not be created)
        const newUsers = await User.create([{ username, email, password: hashedPassword }], { session });

        // token is for signin. We use newUsers[0] since when we pass in an array of documents we create it returns the array of new users 
        const token = jwt.sign( { userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // commit the transaction and end the session
        await session.commitTransaction();
        session.endSession()

        // send a response with a 201 - Created code with some information
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0]
            }
        })

    } catch(error) {
        // if anything goes wrong we want to stop the transaction and end the session (dont want bad data in our database)
        await session.abortTransaction();
        session.endSession();

        // forward error to our error handling middleware
        next(error);
    }

}

export const signIn = async (req, res, next) => {

    try{

        // get info from request body
        const { email, password } = req.body;

        // search up the user in the database based off email
        const user = await User.findOne({ email });


        // ensure that the user exists (throw 404 error if now)
        if (!user) {
            const error = new Error('User does not exist');
            error.statusCode = 404;
            throw error;
        }

        // ensure that the passwords are matching (use bcrypt.compare) (await)
        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            const error = new Error('Password is Incorrect');
            error.statusCode = 401;
            throw error; 
        }

        // create a new token using jwt.sign with the userId and secret
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })


        // send the response with the token
        res.status(200).send({
            success: true,
            message: 'User is signed in!',
            data: {
                token,
                user
            }
        })

    } catch(error){
        next(error);
    }
}


export const signOut = async (req, res, next) => {

    try{
        // blacklist the users token 
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            const error = new Error('No token provided')
            error.statusCode = 401;
            throw error;
        }
        

        // create an entry for the blacklisted token and its expiry date (when it expires it will be removed)
        await Blacklist.create({
            token,
            expiresAt: jwt.decode(token).exp * 1000
        });

        res.status(200).send({
            success: true,
            message: "User has been signed out successfully!"
        });


    } catch (error) {
        next(error);
    }
}