const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks'); //importing the tasks routes
const connectDB = require('./db/connect');
require('dotenv').config(); // What is this?
//const db = require('./db/database'); --sqllite

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json()); // This middleware parses incoming JSON requests and puts the parsed data in req.body

// routes

app.use('/api/v1/tasks', tasksRouter); //when we get a request to /api/v1/tasks, it will be handled by the tasks routes

app.use(notFound);
app.use(errorHandlerMiddleware); 
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); //block the code here until the connection is made
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start(); 
