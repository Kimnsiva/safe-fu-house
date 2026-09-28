# Safe-fu House: Production Deployment Guide

This guide explains how to deploy the Safe-fu House monorepo (Web, Admin, and API) to a production environment using Docker and Docker Compose.

## Prerequisites
- A Linux server (Ubuntu 22.04+ recommended) or any environment with Docker installed.
- Docker and Docker Compose (v2) installed.
- Git installed.
- A registered domain name (optional but recommended for HTTPS).

## 1. Setup Environment

Clone the repository and set up your environment variables:

```bash
git clone <repository-url>
cd safe-fu-house
cp .env.example .env
```

Edit the `.env` file to include your production secrets. Make sure to generate a strong `JWT_SECRET`.

```env
NODE_ENV=production
DB_USER=safefu_admin
DB_PASSWORD=your_secure_db_password
DB_NAME=safefu_production
JWT_SECRET=your_super_secret_jwt_key
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}?schema=public
```

## 2. Prepare the Database

Before starting the applications, ensure the PostgreSQL database is running and the schema is migrated.

```bash
# Start the database container
docker compose up -d postgres

# Run Prisma migrations to set up the schema
pnpm --filter api dlx prisma migrate deploy

# (Optional) Seed the database with initial data
pnpm --filter api dlx prisma db seed
```
*(Note: If you are using the file-backed JSON store, this step can be skipped for now until the Postgres migration is fully completed in the codebase.)*

## 3. Build and Run Services

The provided `docker-compose.yml` is configured to run the API and PostgreSQL. For a full production setup with the frontend applications (`web` and `admin`), you should build them as static files and serve them using Nginx, or run them as Node.js apps if using SSR. Since they are Vite SPA apps, serving static files via Nginx is recommended.

### Building Frontend Assets

Build the Web and Admin applications:

```bash
# Install dependencies
pnpm install

# Build web and admin apps
pnpm --filter @safe-fu/web build
pnpm --filter @safe-fu/admin build
```

The built files will be located in `apps/web/dist` and `apps/admin/dist`.

### Running with Docker Compose (Full Stack)

If you have updated your `docker-compose.yml` to include the frontend build processes or an Nginx reverse proxy, you can simply run:

```bash
docker compose up -d --build
```

## 4. Reverse Proxy with Nginx (Recommended)

In a production environment, you should place a reverse proxy like Nginx or Caddy in front of your services to handle SSL termination and route traffic correctly.

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name safefu.house;

    # Serve the main public website
    location / {
        root /path/to/safe-fu-house/apps/web/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 80;
    server_name admin.safefu.house;

    # Serve the admin portal
    location / {
        root /path/to/safe-fu-house/apps/admin/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to the Fastify backend
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 5. Maintenance & Logs

To view the logs of your running containers:

```bash
docker compose logs -f
```

To stop the services:

```bash
docker compose down
```

To restart a specific service (e.g., the API):

```bash
docker compose restart api
```
