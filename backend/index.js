import express from 'express'
import mysql from 'mysql2'
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { login, register } from './controller/auth.js'
import { addData, getAllData, getData } from './controller/history.js';
import Redis from 'redis'

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

export const RedisClient = Redis.createClient()

export const db = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err)=>{
    if(err){
        throw err
    }
    console.log("Connected to MySql...")
})

app.post("/register", register)
app.post("/login", login)
app.post("/history", addData)
app.get("/user-history/:email", getData)
app.get("/all-history", getAllData)

app.listen(5000, ()=>{
    console.log("Server listening on port 5000!")
})