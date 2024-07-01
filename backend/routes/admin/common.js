const express = require("express");
const router = express.Router();

const { authenticateUserToken , checkRole } = require("../../middlewares/authenticateToken");


router.use(authenticateUserToken);
router.use(checkRole('admin'));


router.get("/test", (req, res) => {
  res.status(200).send({ message: "working" });
});


module.exports = router;
