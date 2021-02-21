const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
      .limit( Number( limit ) )
      .skip( Number( from ) )
  ]);

  res.json({ ok: true, total, users });
};



const userPost = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  // Encriptar Contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({ ok: true, user });
};



const userPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...resto} = req.body;

  if( password ){
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuarioDB = await User.findByIdAndUpdate( id, resto, {new: true} );

  res.json({ ok: true, usuarioDB});
};



const userDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const user = await User.findByIdAndUpdate(id, { state:false }, { new: true });
  // const user = await User.findByIdAndDelete(id);

  res.json({ ok: true, user });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
