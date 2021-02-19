const { response, request } = require('express');

const userGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;

  res.json({ ok: true, msg: 'GET - Controlador', q, nombre, apikey });
};

const userPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({ ok: true, msg: 'POST - Controlador', nombre, edad });
};

const userPut = (req, res = response) => {
  const id = req.params.id;

  res.json({ ok: true, msg: 'PUT - Controlador', id });
};

const userDelete = (req, res = response) => {
  res.json({ ok: true, msg: 'DELETE - Controlador' });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
