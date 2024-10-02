const express = require('express');
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();
const bodyParser = require('express');

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port!`);
});
