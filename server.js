require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
let bodyParser = require('body-parser');
const connectDB = require('./config/dbConnect');
const PORT = process.env.PORT || 3500;
const router = require('./routes/celebrantRoute')

connectDB();
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
// app.use(express.json())
var path = require('path');

app.use(router);
app.all('*', (req, res) => {
    res.status(404)
    if ( req.accepts('html')){
        res.sendFile(path.resolve("./views/404.html"))
    } else if (req.accepts('json')){ 
        res.json({ message: '404 Not Found'})
    } else {
       res.type('txt').send('404 Not found')
    }
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDb");
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
})

