const express = require('express');
const {createServer}=require("http")
const {Server}=require("socket.io")
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require("./middlewares/errorhandler");
const sequelize = require('./config/db');
const Todo = require('./models/todo');
const apiRoutes = require("./routes/apiRoutes")

const app = express();
require('dotenv').config();
const httpServer=createServer(app)
global.io=new Server(httpServer)
app.use(cors());
app.use(bodyParser.json());
app.use('/api',apiRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

sequelize.sync().then(() => {
  httpServer.listen(PORT,()=>console.log(`My app listening on port ${PORT}`))
});
