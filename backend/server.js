import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import db from './config/database.js'

// Load environment variables
dotenv.config();

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'.yellow.bold))
  .catch((err) => console.log('Error: ' + err));

// Route files
import home from './routes/home.js';
import groups from './routes/groups.js';
import persons from './routes/persons.js';

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
app.use('/api/groups', groups);
app.use('/api/persons', persons);

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
