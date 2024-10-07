import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './db/connectDB';
import authRoutes from './routes/auth.route';

const app = express();
const PORT = process.env.PORT || 3002;

//using cors middleware
app.use(cors());

// data parse
app.use(express.json()); // allows us to parse incoming requests req.body
app.use(express.urlencoded({ extended: true })); // url anchor data

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`[server]: Server is running on ${PORT}`);
});
