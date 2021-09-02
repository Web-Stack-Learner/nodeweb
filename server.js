if (process.env.NODE_ENV !== 'production') {
    const env = require('dotenv').config();

}

const DB_URL = 'mongodb+srv://root:66043322Ab-@cluster0.mbxij.mongodb.net/webtack?retryWrites=true&w=majority'

const express = require('express') // Required Express
const app = express(); // Instancing Express
const expressLayouts = require("express-ejs-layouts") // Require Express EJS Layouts
//View Engine Setup
app.set('view engine', 'ejs')

//Views Coming From
app.set('views', `${__dirname}/views`)
//Layouts Coming Form
app.set('layout', 'layouts/layout')
//Use Express Layout
app.use(expressLayouts)
// Use Static File
app.use(express.static('public'))
//Transfer Form Data
app.use(express.urlencoded({ extended: true }))

/** Start DB Connection**/
const mongoose = require('mongoose');
// noinspection JSVoidFunctionReturnValueUsed
mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Connection Successful")
    })
    .catch((err) => console.error(err))

/** End DB Connection**/

/** Routes Will Go There**/
const indexRouter = require('./routes/index.js')
const { log } = require("nodemon/lib/utils");
app.use('/', indexRouter)

/** Routes End**/

// Server Running
app.listen(process.env.PORT || 3000)