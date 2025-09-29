# Real Estate Management App

This is a full-stack web application for managing real estate listings with basic CRUD operations (Create, Read, Update, Delete).

## Tech Stack Used:

- **PostgreSQL**: Relational database for storing Users and Listings.
- **ExpressJS**: Backend framework for building RESTful APIs that manage different data.
- **React**: Frontend library for building interactive UI.
- **React Redux**: A React state management library.
- **NodeJS**: JavaScript runtime for the backend server.
- **Prisma**: Modern ORM for database access, management and migrations.

## Project Structure:

- **/backend**: ExpressJS server, Prisma ORM, API routes, controllers, and middleware.
- **/frontend**: React application, Redux for state management, Firebase for authentication.

## Features

- User authentication (Sign Up, Sign In, Profile)
- Create, view, update, and delete property listings
- Protected routes for authenticated users
- Responsive UI

## Getting Started

1. **Clone the repository**:
    ```sh
    git clone https://github.com/sandeshpd/real_estate_pern.git
    ```
2. **Install dependencies** for both frontend and backend:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. **Configure environment variables** in `.env` files for both frontend and backend.
4. **Run database migrations**:
   ```sh
   cd backend
   npx prisma migrate deploy
   ```
5. **Start the backend server**[^1]:
   ```sh
   npm run dev
   ```
6. **Start the frontend app**:
   ```sh
   cd ../frontend
   npm run dev
   ```

## Contribution
- You can Open an Issue in Issues tab and I'll get back ASAP to you.

## License

MIT

[^1]: Make sure you are in the root directory of this project.