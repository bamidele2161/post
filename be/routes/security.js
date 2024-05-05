const express = require("express");
const router = express.Router();
const { GetQR, VerifyQR } = require("../controller/security");
const authorizer = require("../middleware/auth");

router.get("/", authorizer, GetQR);
router.put("/", authorizer, VerifyQR);

module.exports = router;
