const express = require('express');
const router = express.Router();
const {createRole, getRole, updateRole, deleteRole, getRoles} = require('../controllers/role.controller');
const roleValidation = require('../utils/validation/role.validation');

router.post('/create', roleValidation.roleNameRequired, createRole);
router.get('/get', roleValidation.roleIdRequired, getRole);
router.get('/', getRoles);
router.put('/update', roleValidation.roleIdNameRequired, updateRole);
router.delete('/delete', roleValidation.roleIdRequired, deleteRole);

module.exports = router;