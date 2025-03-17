import { config } from 'dotenv';


// This code allows us to switch between development and production easily
// NODE_ENV is the node environment
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY
    } = process.env;