# Neura Robotics API

This is an API for managing launch data for Neura Robotics.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/dipanc1/neura-robotics
    ```
2. Navigate to the project directory:
    ```sh
    cd api
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
2. The server will be running on `http://localhost:3001`.

## Endpoints

### Launches

- `GET /api/launches` - Get all launches
- `POST /api/launches` - Create a new launch
- `GET /api/launches/:id` - Get a specific launch by ID
- `PUT /api/launches/:id` - Update a specific launch by ID
- `DELETE /api/launches/:id` - Delete a specific launch by ID

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Port number for the server (default: 3001)

## License

This project is licensed under the MIT License.