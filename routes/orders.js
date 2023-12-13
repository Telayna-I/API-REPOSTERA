const { Router } = require("express");
const {
	createOrder,
	getOrders,
	getFinishedOrders,
	getDeletedOrders,
	updateOrder,
	finishOrder,
	deleteOrder,
} = require("../controllers/orders");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { hasAdminRole } = require("../middlewares/validate-role");
const { validateId } = require("../helpers/db-validators");

const router = Router();

router.get("/", [validateJWT], getOrders);
router.get("/finished", [validateJWT], getFinishedOrders);
router.get("/deleted", [validateJWT], getDeletedOrders);

router.post(
	"/",
	[
		validateJWT,
		check("name", "El nombre es requerido").not().isEmpty(),
		check("product", "El producto es requerido").not().isEmpty(),
		check("kilos", "Los kilos son requeridos").not().isEmpty(),
		check("phone", "El telefono es requerido").not().isEmpty(),
		check("advance", "La seña es requerida").not().isEmpty(),
		check("date", "La fecha es requerida").not().isEmpty(),
		check("hour", "La hora es requerida").not().isEmpty(),
		validateFields,
	],
	createOrder
);

router.put(
	"/:id",
	[
		validateJWT,
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateId),
		validateFields,
	],
	updateOrder
);

router.put(
	"/finished/:id",
	[validateJWT, hasAdminRole, validateFields],
	finishOrder
);

router.put(
	"/delete/:id",
	[validateJWT, hasAdminRole, validateFields],
	deleteOrder
);

module.exports = router;
