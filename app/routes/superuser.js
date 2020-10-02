const express = require("express");
const router = express.Router();

const superuserController = require("../controllers/superuser");
const auth = require('../controllers/auth');

router.get('/all', auth.superuserAuth, superuserController.getAllSuperusers)

router.get('/:id', auth.superuserAuth, superuserController.getSuperuserById);

router.patch("/update/:id", auth.superuserAuth, superuserController.updateSuperuserById);

router.delete("/delete/:id", auth.superuserAuth, superuserController.deleteSuperuserById);

router.post('/promote/:id', auth.superuserAuth, superuserController.promote);

module.exports = router;