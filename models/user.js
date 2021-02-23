const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is Required'],
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id ,...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model('User', UserSchema);
