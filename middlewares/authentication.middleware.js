import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js' 
import Blacklist from '../models/blacklist.model.js';



export const authorize = async (req, res, next) => {
try{
    // try to get access to the users token

    // get token from cookies
    let token = req.cookies.token;


    if(!token) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
    }

    // need to check if token is blacklisted
    const blacklisted = await Blacklist.findOne({ token });
    if(blacklisted) {
        console.log(blacklisted)
        const error = new Error('Token not valid');
        error.statusCode = 401;
        throw error;
    }
    
    // decode the token to get user details and then use the users ID to check if it still exists
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if(!user) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;     
    }



    req.user = user;
    next()
} catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message});
}
}