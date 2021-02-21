const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

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
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Escuchando puerto', this.port);
    });
  }
}

module.exports = Server;
