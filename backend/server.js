const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');

// Load environment variables
dotenv.config();

// Route files
const home = require('./routes/home');

const app = express();

// Body parser
app.use(express.json());

// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api', home);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found!</h1>');
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
