const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { hasAdminRole, hasVentasRole } = require("../middlewares/validate-role");
const { validateId, validateTaskId } = require("../helpers/db-validators");
const {
	getTasks,
	getFinishedTasks,
	getDeletedTasks,
	createTask,
	updateTask,
	finishTask,
	deleteTask,
} = require("../controllers/tasks");

const router = Router();

router.get("/", [validateJWT], getTasks);
router.get("/finished", [validateJWT], getFinishedTasks);
router.get("/deleted", [validateJWT], getDeletedTasks);

router.post(
	"/",
	[
		validateJWT,
		hasAdminRole,
		check("title", "El titulo es requerido").not().isEmpty(),
		check("description", "La descripcion es requerida").not().isEmpty(),
		validateFields,
	],
	createTask
);

router.put(
	"/:id",
	[
		validateJWT,
		hasAdminRole,
		check("id", "El id es obligatorio").not().isEmpty(),
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateTaskId),
		validateFields,
	],
	updateTask
);

router.put(
	"/finished/:id",
	[
		validateJWT,
		hasVentasRole,
		check("id", "El id es obligatorio").not().isEmpty(),
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateTaskId),
		validateFields,
	],
	finishTask
);

router.put(
	"/delete/:id",
	[
		validateJWT,
		hasAdminRole,
		check("id", "El id es obligatorio").not().isEmpty(),
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateTaskId),
		validateFields,
	],
	deleteTask
);

module.exports = router;
