const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');
const sequelize = require('./config/db');
const Todo = require('./models/todo');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', todoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
