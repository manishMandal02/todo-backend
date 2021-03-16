const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');

const { connectDB } = require('./Config/db');
const TodoRoutes = require('./Routes/TodoRoutes');
const { notFoundError, errorHandler } = require('./Middleware/ErrorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server running');
});

app.use('/grocery', TodoRoutes);

app.use(notFoundError);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT} `));
