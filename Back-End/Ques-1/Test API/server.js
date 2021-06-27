const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
// Route files
const posts = require('./routes/posts');
const auth = require('./routes/auth');

// Mount routers
app.use('/', auth);
app.use('/posts', posts);

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
