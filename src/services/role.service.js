const { User, Role } = require("../models");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse, apiNotFoundResponse, apiBadRequestResponse} = require("../utils/apiResponse.utils");
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

  show: async (req) => {
    try {
      const { id } = req.params;
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
      const { name } = req.body;
      const { id } = req.params;

      const role = await Role.findByPk(id);
      if (!role) {
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Role not found");
      }

      await role.update({
        name: name.toUpperCase(),
      })

      return apiResponse(status.OK, "OK", "Success to updated a role");
    } catch (error) {
      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message || null
      );
    }
  },

  deleteRole: async (req) => {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);
      if (!role)
        throw apiResponse(status.NOT_FOUND, "NOT_FOUND", "Role not found");

      if (await role.countUsers() > 0) {
        throw apiBadRequestResponse('Role has related to users, cannot be deleted');
      }

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
  checkRole: async (req) => {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, {
        include: {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      });
      if (!user) {
        throw apiNotFoundResponse('User not found');
      }

      return apiResponse(status.OK, 'OK', 'Success check user current role', { role: user.role });
    } catch (e) {
      throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
    }
  },
  assignRole: async (req) => {
    try {
      const { roleId, userId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        throw apiNotFoundResponse('User not found')
      }

      const role = await Role.findByPk(roleId);
      if (!role) {
        throw apiNotFoundResponse('Role not found');
      }

      await user.update({ roleId });

      return apiResponse(status.OK, 'OK', 'Success assign role');
    } catch (e) {
      throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
    }
  }
};
