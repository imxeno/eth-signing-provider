const express = require("express");
const router = express.Router();

const sign = require("./sign");
const info = require("./info");

router.get("/info", info);
router.post("/sign", sign);

module.exports = router;
