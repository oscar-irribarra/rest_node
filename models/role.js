const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  rol: {
    type: String,
    required: [true, 'Role is Required'],
  },
});

module.exports = model('Role', RoleSchema);
