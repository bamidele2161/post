const express = require("express");
const router = express.Router();
const { UserRegistration, Login } = require("../controller/auth");

router.get("/r", (req, res) => {
  console.log("test");
  return res.status(200).json({
    message: "testing route",
  });
});

router.post("/", UserRegistration);
router.post("/login", Login);

module.exports = router;
