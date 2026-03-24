# BeatHub Backend

BeatHub is a robust, Node.js-based music streaming and sharing platform backend. It utilizes MongoDB and Mongoose to manage complex data relationships between artists, albums, tracks, and users, providing a scalable foundation for a modern audio experience.

## Features

* **User Management:** Full authentication and authorization system for music listeners.
* **Music Organization:** Comprehensive data modeling for Artists, Albums, and Songs.
* **Personalized Playlists:** Allows users to curate and manage their own music collections.
* **Relational Data Integrity:** Uses Mongoose referencing to ensure consistency across the database (e.g., updating a song's metadata reflects across all playlists).
* **Data Seeding:** Includes automated scripts to quickly populate the environment with sample music data for development and testing.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Environment Management:** Dotenv

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* MongoDB instance (Local or Atlas)

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
Create a `.env` file in the root directory and add your MongoDB connection string:
```env
MONGO_URI=mongodb://your_connection_string

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



## Data Schema

The backend is built around five core entities:

* **Artist:** The creators of the music.
* **Album:** Collections of songs linked to specific artists.
* **Song:** Individual audio tracks with duration and genre data.
* **User:** Profile management for the platform's listeners.
* **Playlist:** User-created collections referencing specific songs.