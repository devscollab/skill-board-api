const express = require("express");
const router = express.Router();

const superuserController = require("../controllers/superuser");

router.get('/all', superuserController.getAllSuperusers)

router.get('/:id', superuserController.getSuperuserById);

router.patch("/update/:id", superuserController.updateSuperuserById);

router.delete("/delete/:id", superuserController.deleteSuperuserById);

module.exports = router;