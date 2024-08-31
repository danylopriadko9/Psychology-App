import express from 'express';
import usersRouter from './routes/users';
import 'dotenv/config';

const app = express();

app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port!`);
});
