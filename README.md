# BeatHub Backend

BeatHub is a robust, Node.js-based music streaming and sharing platform backend. It utilizes MongoDB and Mongoose to manage complex data relationships between artists, albums, tracks, and users, providing a scalable foundation for a modern audio experience.

## Features

- **User Management:** Full authentication and authorization system for music listeners.
- **Music Organization:** Comprehensive data modeling for Artists, Albums, and Songs.
- **Personalized Playlists:** Allows users to curate and manage their own music collections.
- **Relational Data Integrity:** Uses Mongoose referencing to ensure consistency across the database (e.g., updating a song's metadata reflects across all playlists).
- **Data Seeding:** Includes automated scripts to quickly populate the environment with sample music data for development and testing.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Environment Management:** Dotenv

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (Local or Atlas)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd beathub_backend

```

2. Install dependencies:

```bash
npm install

```

3. Configure Environment Variables:
   Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

For host-based local runs (`npm start`), update `MONGO_URI` to your local/Atlas URI as needed.

For Docker Compose, the default value already points to the `db` service on the Compose network:

```env
MONGO_URI=mongodb://devuser:devpassword@db:27017/beathub_dev?authSource=admin

```

4. Seed the Database (Optional):
   Populate your database with sample artists, albums, and songs:

```bash
node seed.js

```

5. Start the Server:

```bash
npm start

```

### Run with Docker Compose (API + MongoDB)

Use Docker Compose to run the full local stack with one command.

Optional: customize ports/secrets by editing `.env` before running Compose.

1. Build and start services:

```bash
docker compose up --build
```

2. Run in background:

```bash
docker compose up -d
```

3. View logs:

```bash
docker compose logs -f
```

4. Stop services:

```bash
docker compose down
```

5. Stop and remove volumes (deletes DB data):

```bash
docker compose down --volumes
```

The Compose file defines:

- `api` service built from the local `Dockerfile`
- `db` service using `mongo:6`
- named volume `db-data` mapped to `/data/db` for persistence
- internal service networking, so API connects with hostname `db`

### Assignment Note: Production vs Local Environment Variables

Local development with Compose:

- You can set non-sensitive defaults directly in `docker-compose.yml` (for example `PORT`, local Mongo hostnames, dev-only values).
- Compose injects these values into containers at runtime, so your app reads them from `process.env`.

Production deployment:

- Secrets like `JWT_SECRET` and production database credentials should not be hardcoded in source-controlled files.
- Use your platform's secret/environment manager (for example AWS/GCP/Azure environment settings, secret stores, or Kubernetes secrets).

Why `dotenv` is less relevant for variables set in Compose:

- `dotenv` only reads from a `.env` file inside the application runtime.
- If Docker Compose already injects variables into the container environment, `process.env` already has them, so `dotenv` is not required for those specific values.
- `dotenv` remains useful for non-containerized local runs (`npm start` on host machine).

## Data Schema

The backend is built around five core entities:

- **Artist:** The creators of the music.
- **Album:** Collections of songs linked to specific artists.
- **Song:** Individual audio tracks with duration and genre data.
- **User:** Profile management for the platform's listeners.
- **Playlist:** User-created collections referencing specific songs.
