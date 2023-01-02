const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role.controller');
const {
    roleValidation,
    assignRoleValidation,
} = require('../utils/validation/role.validation');
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRole } = require("../middlewares/authorization.middleware");

router.get('/check-user-role', authentication, RoleController.checkRole)
router.put('/assign-role', authentication, hasRole(['ADMIN']), assignRoleValidation, RoleController.assignRole)

router.get('/', authentication, hasRole(['ADMIN']), RoleController.getRoles);
router.post('/', authentication, hasRole(['ADMIN']), roleValidation, RoleController.createRole);
router.get('/:id',authentication, hasRole(['ADMIN']), RoleController.show);
router.put('/:id', authentication, hasRole(['ADMIN']), roleValidation, RoleController.updateRole);
router.delete('/:id', authentication, hasRole(['ADMIN']), RoleController.deleteRole);

module.exports = router;
