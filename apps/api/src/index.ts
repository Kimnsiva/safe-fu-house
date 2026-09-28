import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

import menuRoutes from './routes/menu';
import settingsRoutes from './routes/settings';

const prisma = new PrismaClient();

const server = Fastify({
  logger: true,
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Plugins
server.register(helmet, {
  global: true,
});

server.register(cors, {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://safefu.house', 'https://admin.safefu.house'] 
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
});

server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

server.register(jwt, {
  secret: process.env.JWT_SECRET || 'supersecret_change_in_production',
  cookie: {
    cookieName: 'token',
    signed: false,
  },
});

server.register(cookie);

// Health check
server.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Auth Routes
const AuthBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

server.post('/api/v1/auth/login', { schema: { body: AuthBodySchema } }, async (request, reply) => {
  const { email, password } = request.body as z.infer<typeof AuthBodySchema>;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return reply.status(401).send({ error: 'Invalid credentials' });
  }

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    return reply.status(401).send({ error: 'Invalid credentials' });
  }

  const token = await reply.jwtSign({ id: user.id, email: user.email, role: user.role });
  
  reply.setCookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { message: 'Logged in', role: user.role };
});

server.post('/api/v1/auth/logout', async (request, reply) => {
  reply.clearCookie('token', { path: '/' });
  return { message: 'Logged out' };
});

server.get('/api/v1/auth/me', async (request, reply) => {
  try {
    await request.jwtVerify();
    return request.user;
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
});

// Register feature routes
server.register(menuRoutes);
server.register(settingsRoutes);

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000', 10);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
