import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const db_url = process.env.MONGO_URL;
    if (!db_url) throw new Error(`[server]: DB URL is invalid`);
    const conn = await mongoose.connect(db_url);
    console.log(`[server]: MongoDB is connected: ${conn.connection.host}`);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(
      `[server]: Error with database connection occured: ${message} `
    );
    process.exit(1); // 1-failure, 0-success
  }
};
