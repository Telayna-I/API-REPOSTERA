const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const createUser = async (req = request, res = response) => {
	const { name, email, password, status, google, role } = req.body;

	const user = new User({ name, email, password, role });

	const salt = bcryptjs.genSaltSync(10);
	user.password = bcryptjs.hashSync(password, salt);

	try {
		await user.save();
		res.json({
			user,
			data: req.body,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

module.exports = {
	createUser,
};
