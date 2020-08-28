const express = require("express");
const router = express.Router();

const superuserController = require("../controllers/superuser");
const authController = require('../controllers/auth');

router.get('/all', superuserController.getAllSuperusers)

router.get('/:id', superuserController.getSuperuserById);

router.patch("/update/:id", superuserController.updateSuperuserById);

router.delete("/delete/:id", superuserController.deleteSuperuserById);

module.exports = router;