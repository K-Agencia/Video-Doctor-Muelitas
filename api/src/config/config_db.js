import mongoose from 'mongoose';

export const dbConnect = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database Successfull');
  } catch (error) {
    console.log('Error, Database is not conect');
    console.log(error);
  }
}