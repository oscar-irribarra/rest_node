const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
  const rolExist = await Role.findOne({ role });
  if (!rolExist) {
    throw new Error(`Role ${ role } is not valid`);
  }
};

const isEmailRegistered = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${ email } is not available`);
  }
};

const isUserRegistered = async (id = '') => {
  const existUser = await User.findById( id );
  if( !existUser ){
    throw new Error(`ID ${ id } doesn´t exist`);
  }
}

module.exports = {
  isRoleValid,
  isEmailRegistered,
  isUserRegistered
};
