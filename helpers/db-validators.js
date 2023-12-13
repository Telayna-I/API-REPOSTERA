const User = require("../models/user");
const Role = require("../models/role");
const Order = require("../models/order");

const validateEmail = async (email = "") => {
	try {
		const emailExist = await User.findOne({ email });
		if (emailExist) {
			throw new Error(`El correo ${email} ya se encuentra registrado`);
		}
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const isValidRole = async (role = "") => {
	const existeRole = await Role.findOne({ role });
	if (!existeRole) {
		throw new Error(
			`El rol ${role} no esta registrado en la base de datos.`
		);
	}
};

const validateId = async (id) => {
	const idExist = await Order.findById({ _id: id });
	if (!idExist) {
		throw new Error(`El ${id} no se encuentra registrado`);
	}
};

module.exports = {
	validateEmail,
	isValidRole,
	validateId,
};
