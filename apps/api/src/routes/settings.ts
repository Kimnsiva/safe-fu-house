import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function settingsRoutes(server: FastifyInstance) {
  server.get('/api/v1/settings', async () => {
    return prisma.setting.findMany();
  });
  
  const SettingSchema = z.object({ key: z.string(), jsonValue: z.string() });
  server.post('/api/v1/settings', { schema: { body: SettingSchema } }, async (request) => {
    const { key, jsonValue } = request.body as z.infer<typeof SettingSchema>;
    return prisma.setting.upsert({ where: { key }, update: { jsonValue }, create: { key, jsonValue } });
  });
}