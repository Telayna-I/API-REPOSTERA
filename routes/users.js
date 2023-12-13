const { Router } = require("express");
const { createUser } = require("../controllers/users");
const { validateEmail, isValidRole } = require("../helpers/db-validators");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
	"/",
	[
		check("name", "El nombre es requerido").not().isEmpty(),
		check("email", "El email no es valido").isEmail(),
		check("email").custom(validateEmail),
		check(
			"password",
			"El password debe tener mas de 6 caracteres"
		).isLength({ min: 6 }),
		check("role").custom(isValidRole),
	],
	validateFields,
	createUser
);

module.exports = router;
