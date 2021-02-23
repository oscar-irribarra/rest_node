const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
  try {
    const rolExist = await Role.findOne({ role });
    if (!rolExist) {
      throw new Error(`Role ${ role } is not valid`);
    }
  } catch (error) {
    console.log('isRoleValid:db-user.Validators', error);
    throw new Error('Contact with the administrador');    
  }
};

const isEmailRegistered = async (email = '') => {
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      throw new Error(`Email ${ email } is not available`);
    }
  } catch (error) {
    console.log('isEmailRegistered():db-user.Validators',error);
    throw new Error('Contact with the administrator');    
  }
};

const isUserRegistered = async (id = '') => {
  try {
    const existUser = await User.findById( id );
    if( !existUser ){
      throw new Error(`ID ${ id } doesn´t exist`);
    }
  } catch (error) {
    console.log('isUserRegistered():db-user.Validators', error);
    throw new Error('Contact with the administrator');    
  }
}

module.exports = {
  isRoleValid,
  isEmailRegistered,
  isUserRegistered
};
