import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    APP_NAME: process.env.APP_NAME ? process.env.APP_NAME : 'NodeJS API',
    PORT: parseInt(process.env.PORT ? process.env.PORT.toString() : '8000'),
    TIMEZONE: process.env.TIMEZONE ? process.env.TIMEZONE : 'Asia/Manila',

    DATABSE_URL: process.env.DATABASE_URI ? process.env.DATABASE_URI : '',

    COLLECTION: process.env.COLLECTION ? process.env.COLLECTION : '',
    SECRET: process.env.SECRET ? process.env.SECRET : '',

    MAILER_EMAIL: process.env.MAILER_EMAIL ? process.env.MAILER_EMAIL : '',
    MAILER_PASSWORD: process.env.MAILER_PASSWORD ? process.env.MAILER_PASSWORD : '',
    MAILER_SERVICE: process.env.MAILER_SERVICE ? process.env.MAILER_SERVICE : '',

    FE_BASEURL: process.env.FE_BASEURL ? process.env.FE_BASEURL : '',

    TOKEN_SECRET: process.env.SECRET ? process.env.SECRET : '',
    TOKEN_ACCESS_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY ? process.env.ACCESS_TOKEN_EXPIRY : '1d',
    TOKEN_REFRESH_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY ? process.env.REFRESH_TOKEN_EXPIRY : '7d',
    TOKEN_INVITE_EXPIRY: process.env.INVITE_TOKEN_EXPIRY ? process.env.INVITE_TOKEN_EXPIRY : '7d',
    TOKEN_RESET_EXPIRY: process.env.RESET_TOKEN_EXPIRY ? process.env.RESET_TOKEN_EXPIRY : '1d'
    

}