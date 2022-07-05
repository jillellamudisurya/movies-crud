require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('./db/conn');
const movies = require('./models/movieSchema')
const cors = require('cors');
app.use(cors())
app.use(express.json())

const router = require('./routes/router')
app.use(router);

const port = process.env.PORT||2424

app.listen(port,()=>{console.log("Port is running on",port)})