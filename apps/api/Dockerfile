FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy monorepo config
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY packages/ui/package.json ./packages/ui/
COPY packages/types/package.json ./packages/types/
COPY apps/api/package.json ./apps/api/

# Install dependencies (ignoring scripts to avoid build errors during pure fetch)
RUN pnpm config set ignore-scripts true && pnpm install --filter api...

# Copy source code
COPY . .

# Generate Prisma client and build API
RUN cd apps/api && npx prisma generate
RUN pnpm --filter api build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 3000

# Start server
CMD ["node", "dist/index.js"]
