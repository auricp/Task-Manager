import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js' 
import Blacklist from '../models/blacklist.model.js';



export const authorize = async (req, res, next) => {
try{
    // try to get access to the users token
    let token;

    // check to see if the request header starts with Bearer (this is what denotes the token)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // getting the token from the authorization header
        token = req.headers.authorization.split(' ')[1]; 
    }

    if(!token) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
    }

    // need to check if token is blacklisted
    const blacklisted = Blacklist.find({ token });
    if(blacklisted) {
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