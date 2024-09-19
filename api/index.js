const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const launchRoutes = require('./routes/launches');

const app = express();

const MONGODB_URI = 'mongodb+srv://<username>:<password>@cluster0.frufg.mongodb.net/neura-robotics?retryWrites=true&w=majority' || process.env.MONGODB_URI;
const PORT = 3001 || process.env.PORT;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Connected to Database'));

// Use the launch routes
app.use('/api/launches', launchRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});