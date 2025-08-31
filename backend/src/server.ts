import 'dotenv/config';
import app from './app';
import connectToDatabase from './config/db';
import { PORT, NODE_ENV } from './constants/env';

async function bootstrap() {
	try {
		await connectToDatabase();
		console.log('✅ Database connected successfully');

		const server = app.listen(PORT, () => {
			console.log(`🚀 Server listening on port ${PORT} in ${NODE_ENV} environment.`);
		});

		// Graceful shutdown handling
		const gracefulShutdown = (signal: string) => {
			console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
			server.close(() => {
				console.log('✅ HTTP server closed');
				process.exit(0);
			});
			setTimeout(() => {
				console.error('❌ Could not close connections in time, forcefully shutting down');
				process.exit(1);
			}, 10000);
		};

		process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
		process.on('SIGINT', () => gracefulShutdown('SIGINT'));

		process.on('uncaughtException', (error) => {
			console.error('❌ Uncaught Exception:', error);
			process.exit(1);
		});

		process.on('unhandledRejection', (reason, promise) => {
			console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
			process.exit(1);
		});
	} catch (error) {
		console.error('❌ Failed to connect to database:', error);
		process.exit(1);
	}
}

bootstrap();

export {};
