import express from 'express'
import mongoDBConnect from './config/MongoDb.js'

mongoDBConnect()
const app = express()

app.get('/',(req, res)=>{
    res.send("hello")
})

app.listen(4000,()=>{
    console.log(`server started 4000`);
})