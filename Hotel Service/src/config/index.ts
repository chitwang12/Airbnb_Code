import dotenv from 'dotenv';

type serverConfig = {
    PORT : number,
    MONGO_URI: string,
}

type DBConfig = {
    DB_HOST: string,
    DB_USER: string,
    DB_PASSWORD: string,
    DB_NAME: string,
}

function loadEnv(){
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();


export const serverConfig: serverConfig ={
    PORT:Number(process.env.PORT) || 8080,
    MONGO_URI: process.env.MONGO_URI || "NA",
};

export const DbConfig: DBConfig = {
    DB_HOST : process.env.DB_HOST || "localhost",
    DB_USER : process.env.DB_USERNAME || "root",
    DB_PASSWORD : process.env.DB_PASSWORD || "root",
    DB_NAME : process.env.DB_NAME || "airBnb_DB",
}