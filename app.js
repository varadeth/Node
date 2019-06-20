const http = require('http');

const express =require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('In the middleware');
    next();                                                         //Allows to flow request to next middleware in line
});

app.use((req,res,next)=>{
    console.log('In another middleware');
    res.send('<html><head><title>Node.js</title></head></html>')
});

const server = http.createServer(app)

server.listen(3000);