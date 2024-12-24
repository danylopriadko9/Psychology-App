//###############################################################
//============= STANDART ===================
import express from 'express';
import 'dotenv/config';
//============= DB ===================
import { connectDB } from './db/connectDB';
//============= ROUTES ===================
import authRoutes from './routes/auth.route';
import contactRoutes from './routes/contact.route';
//============= CORS ===================
import cors from 'cors';
import { corsOptions } from './utils/corsOptions';
//###############################################################

const app = express();
const PORT = process.env.PORT || 3002;

//using cors middleware
app.use(cors(corsOptions));

// data parse
app.use(express.json()); // allows us to parse incoming requests req.body
app.use(express.urlencoded({ extended: true })); // url anchor data

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`[server]: Server is running on ${PORT}`);
});
