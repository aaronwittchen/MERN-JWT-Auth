import { OpenAPIV3 } from 'openapi-types';
import { NODE_ENV, PORT, APP_ORIGIN } from '../constants/env';

const servers: OpenAPIV3.ServerObject[] = [
	{
		url: `http://localhost:${PORT}`,
		description: `${NODE_ENV} server`,
	},
];

const securitySchemes: OpenAPIV3.ComponentsObject['securitySchemes'] = {
	cookieAuth: {
		type: 'apiKey',
		in: 'cookie',
		name: 'accessToken',
		description: 'JWT access token stored in cookie',
	},
};

const components: OpenAPIV3.ComponentsObject = {
	securitySchemes,
	schemas: {
		User: {
			type: 'object',
			properties: {
				_id: { type: 'string', example: '66bcf7e15a8e6e7d2c5d4c3a' },
				email: { type: 'string', format: 'email', example: 'user@example.com' },
				verified: { type: 'boolean', example: true },
				createdAt: { type: 'string', format: 'date-time' },
				updatedAt: { type: 'string', format: 'date-time' },
			},
			required: ['_id', 'email', 'verified', 'createdAt', 'updatedAt'],
		},
		AuthLoginRequest: {
			type: 'object',
			properties: {
				email: { type: 'string', format: 'email' },
				password: { type: 'string', format: 'password' },
			},
			required: ['email', 'password'],
		},
		AuthRegisterRequest: {
			type: 'object',
			properties: {
				email: { type: 'string', format: 'email' },
				password: { type: 'string', format: 'password', minLength: 6 },
			},
			required: ['email', 'password'],
		},
	},
};

const tags: OpenAPIV3.TagObject[] = [
	{ name: 'Auth', description: 'Authentication endpoints' },
	{ name: 'User', description: 'User endpoints' },
	{ name: 'Session', description: 'Session endpoints' },
];

export const openApiSpec: OpenAPIV3.Document = {
	openapi: '3.0.3',
	info: {
		title: 'MERN JWT Auth API',
		description: 'OpenAPI documentation for the MERN JWT authentication backend',
		version: '1.0.0',
	},
	servers,
	tags,
	components,
	security: [{ cookieAuth: [] }],
	paths: {
		'/health': {
			get: {
				tags: ['Health'],
				summary: 'Health check',
				responses: {
					'200': {
						description: 'Server is healthy',
					},
				},
			},
		},
		'/auth/register': {
			post: {
				tags: ['Auth'],
				summary: 'Register a new user',
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/AuthRegisterRequest' },
						},
					},
				},
				responses: {
					'201': {
						description: 'User created',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/User' },
							},
						},
					},
					'409': { description: 'Email already exists' },
				},
			},
		},
		'/auth/login': {
			post: {
				tags: ['Auth'],
				summary: 'Login a user',
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/AuthLoginRequest' },
						},
					},
				},
				responses: {
					'200': { description: 'Login successful' },
					'401': { description: 'Invalid email or password' },
				},
			},
		},
		'/auth/logout': {
			post: {
				tags: ['Auth'],
				summary: 'Logout the current user',
				responses: {
					'200': { description: 'Logout successful' },
				},
			},
		},
		'/auth/refresh': {
			post: {
				tags: ['Auth'],
				summary: 'Refresh access token',
				responses: {
					'200': { description: 'Access token refreshed' },
					'401': { description: 'Missing or invalid refresh token' },
				},
			},
		},
	},
};

export default openApiSpec;
