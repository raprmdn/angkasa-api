const Joi = require("joi");
const { User, Role } = require("../../models");

const customThrowErrorJoiString = (msg, field) => {
  throw new Joi.ValidationError(
    msg,
    [
      {
        message: msg,
        path: [field],
        type: `string.${field}`,
        context: {
          key: field,
          label: field,
          field,
        },
      },
    ],
    field
  );
};

module.exports = {
  isUsernameExist: async (username) => {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      customThrowErrorJoiString("Username already exist", "username");
    }

    return true;
  },
  isEmailExist: async (email) => {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      customThrowErrorJoiString("Email already exist", "email");
    }
    return true;
  },
  isRoleNameExist: async (roleName, id = null) => {
    const role = await Role.findOne({where: {name: roleName.toUpperCase()}})
    if (role && role.id !== +id) {
      customThrowErrorJoiString("Role name already exist", "name");
    }
    return true;
  }
};
