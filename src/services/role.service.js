const { Role } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("../utils/apiResponse.utils");
const {User} = require('../models');
const { UserTransform } = require("../helpers/transformers/user.transformers");

module.exports = {
  createRole: async (req) => {
    try {
      const { name } = req.body;

      const newRole = await Role.create({
        name: name.toUpperCase(),
      });

      return apiResponse(
        status.CREATED,
        "CREATED",
        "Success to created a new Role",
        {
          role: newRole,
        }
      );
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  getRole: async (req) => {
    try {
      const { id } = req.body;
      const role = await Role.findByPk(id, {
        include: [
          {
            model: User,
            as: "users",
            include: 'role'
          }
        ]
      });

      if (!role)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Role not found");

      const users = role.users.map((user) => UserTransform(user));

      const roleResponse = {
        id: role.id,
        name: role.name,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
        users,
      }
      
      return apiResponse(status.OK, "OK", "Success to get a role", { role: roleResponse });

    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  getRoles: async (req) => {
    try {
      const roles = await Role.findAll();

      if (!roles)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Role not found", []);

      return apiResponse(
        status.OK,
        "OK",
        "Success to get all Roles",
        {
          roles,
        }
      );
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  updateRole: async (req) => {
    try {
      const { id, name } = req.body;
      let oldRole = await Role.findByPk(id);
      if (!oldRole)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Role not found");
      oldRole.name = name.toUpperCase();
      const newRole = await oldRole.save();
      return apiResponse(status.OK, "OK", "Success to updated a role", {
        role: oldRole,
      });
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  deleteRole: async (req, res) => {
    try {
      const { id } = req.body;
      const role = await Role.findByPk(id);
      if (!role)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Role not found");
      await role.destroy();
      return apiResponse(status.OK, "OK", "Success to deleted a role");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },
};
