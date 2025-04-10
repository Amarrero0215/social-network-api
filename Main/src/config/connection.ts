import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', {
      dbName: 'socialmedia',
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err);
    });

    console.log('Database connected.');
    return mongoose.connection;

  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;
