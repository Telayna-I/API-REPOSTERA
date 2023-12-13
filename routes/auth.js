const { Router } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { logIn } = require("../controllers/auth");
const { check } = require("express-validator");

const router = Router();

router.post(
	"/login",
	[
		check("email", "El email es obligatorio").not().isEmpty(),
		check("email", "El email no es valido").isEmail(),
		check("password", "El password es obligatorio").not().isEmpty(),
		validateFields,
	],
	logIn
);

module.exports = router;
