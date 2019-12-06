const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const siteVisitRoutes = require('./siteVisitRoutes')
const path = require('path')


//initializing the app
const app = express()

const db = process.env.MONGO

//Setting up middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/client/build')));

// Setting up mongoDB connection information
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

// //established connection to MongoDB database
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})

//setting up Main route
app.use('/', siteVisitRoutes);

app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on Port: 8080');
})

