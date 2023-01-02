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
  show: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.show(req);
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
  checkRole: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.checkRole(req);
      return res.status(roleServiceResponse.code).json(roleServiceResponse);
    } catch (e) {
      return res.status(e.code).json(e);
    }
  },
  assignRole: async (req, res) => {
    try {
      const roleServiceResponse = await RoleService.assignRole(req);
      return res.status(roleServiceResponse.code).json(roleServiceResponse);
    } catch (e) {
      return res.status(e.code).json(e);
    }
  }
};
