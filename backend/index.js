import express from 'express'
import mysql from 'mysql2'
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { login, register } from './controller/auth.js'
import { addData, getAllData, getData } from './controller/history.js';
import Redis from 'redis'
import auth from './middlewares/auth.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

export const RedisClient = Redis.createClient()

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aryan@6400",
    database: "tuf"
})

db.connect((err)=>{
    if(err){
        throw err
    }
    console.log("Connected to MySql...")
})

app.post("/register", register)
app.post("/login", login)
app.post("/history", auth, addData)
app.get("/user-history/:email", auth, getData)
app.get("/all-history", getAllData)

app.listen(5000, ()=>{
    console.log("Server listening on port 5000!")
})