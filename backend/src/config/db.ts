import mongoose from 'mongoose';
import { MONGO_URI } from '../constants/env';

const connectToDatabase = async (retries = 5, delay = 5000): Promise<void> => {
	try {
		const options = {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			bufferCommands: false,
		};

		await mongoose.connect(MONGO_URI, options);
		
		// Connection event handlers
		mongoose.connection.on('connected', () => {
			console.log('✅ MongoDB connected successfully');
		});

		mongoose.connection.on('error', (error) => {
			console.error('❌ MongoDB connection error:', error);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('⚠️ MongoDB disconnected');
		});

		mongoose.connection.on('reconnected', () => {
			console.log('🔄 MongoDB reconnected');
		});

	} catch (error) {
		if (retries > 0) {
			console.log(`⚠️ Database connection failed. Retrying in ${delay/1000} seconds... (${retries} retries left)`);
			await new Promise(resolve => setTimeout(resolve, delay));
			return connectToDatabase(retries - 1, delay);
		}
		
		console.error('❌ Failed to connect to MongoDB after all retries:', error);
		throw error;
	}
};

export default connectToDatabase;
