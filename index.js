const express=require('express')
const cors=require('cors')
require('dotenv').config()
const routes=require('./routes/allRoutes')
require('./config/db')

const server=express()
server.use(cors())
server.use(express.json())
server.use(routes)

server.use('/uploads',express.static('./uploads'))

const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log("Server started...")
})

server.use((err,req,res,next)=>{
    res.status(500).json(err.message)
})

server.get('/',(req,res)=>{
    res.status(200).send('<h1>Server Started and waiting for request...</h1>')
})

server.post('/',(req,res)=>{
    res.status(200).send("Post Request")
})