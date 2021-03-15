const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Base de datos
    this.connectDb();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura Body
    this.app.use(express.json());

    // Directirio Publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use('/api/auth', require('../routes/auth'));
    this.app.use('/api/categories', require('../routes/categories'));
    this.app.use('/api/products', require('../routes/products'));
    this.app.use('/api/users', require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Escuchando puerto', this.port);
    });
  }
}

module.exports = Server;
