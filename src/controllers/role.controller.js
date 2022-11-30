const RoleService = require("../services/role.service");

module.exports = {
  createRole: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.createRole(req);
      return res.status(roleServiceResponse.code).json(roleServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  getRole: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.getRole(req);
      return res.status(roleServiceResponse.code).json(roleServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  getRoles: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.getRoles(req);
      return res.status(roleServiceResponse.code).json(roleServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  updateRole: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.updateRole(req);
      return res.status(roleServiceResponse.code).json(roleServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
  deleteRole: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.deleteRole(req);
      return res.status(roleServiceResponse.code).json(roleServiceResponse);
    } catch (error) {
      return res.status(error.code).json(error);
    }
  },
};
