# Online Voting Management System Setup Guide

This guide will walk you through the process of setting up the Online Voting Management System, which consists of a client-side application and a server-side application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm (Node Package Manager) or yarn
- MySQL database

## Client Setup

1. **Navigate to Client Directory**: Change your working directory to the client folder:

   ```bash
   cd client
   ```

2. **Install Dependencies**: Install the required dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**: Run the following command to start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the Application**: Open your browser and navigate to `http://localhost:5173` to access the Online Voting Management System.

## Server Setup

1. **Navigate to Server Directory**: Change your working directory to the server folder:

   ```bash
   cd server
   ```

2. **Install Dependencies**: Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Database Configuration**: Update the `config/config.json` file with your MySQL database credentials.

4. **Start the Server**: Run the following command to start the server:

   ```bash
   npm start
   ```

5. **Access the API**: The server should now be running on `http://localhost:3000`, and you can interact with the API endpoints.

## Usage

Once both the client and server are set up and running, you can start using the Online Voting Management System. Users can navigate to the client-side application to cast their votes, and the server-side application handles the backend logic, including authentication, storing votes, and generating reports.

## Additional Notes

- Make sure your MySQL database server is running before starting the server application.
- Always ensure to keep your database credentials secure and not expose them in public repositories.
- For production deployment, consider using environment-specific configurations and securing your applications following best practices.

Now you have successfully set up the Online Voting Management System. Happy voting! 🗳️🎉
