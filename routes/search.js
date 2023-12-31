const { Router } = require("express");
const { search } = require("../controllers/search");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { hasAdminRole } = require("../middlewares/validate-role");

const router = Router();

router.get(
	"/:collection/:term",
	[validateJWT, hasAdminRole, validateFields],
	search
);

module.exports = router;
