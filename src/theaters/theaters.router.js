const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .router("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;