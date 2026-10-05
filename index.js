const express=require('express')
const cors=require('cors')
require('dotenv').config()
const routes=require('./routes/allRoutes')
require('./config/db')

const server=express()
server.use(cors())
server.use(express.json())
server.use(routes)
const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log("Server started...")
})
server.get('/',(req,res)=>{
    res.status(200).send('<h1>Server Started and waiting for request...</h1>')
})

server.post('/',(req,res)=>{
    res.status(200).send("Post Request")
})