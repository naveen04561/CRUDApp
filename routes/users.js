const express = require('express');
const controllers = require('../controllers/users.js');
const router = express.Router();

router.get("/", controllers.find);

router.get("/adduser",(req,res) => {
    res.render('add');
});

router.get("/edituser/:id",controllers.getUserData);

router.post("/adduser", controllers.create);

router.post("/edituser/:id", controllers.update);

router.post("/deleteuser/:id", controllers.delete);

module.exports = router;