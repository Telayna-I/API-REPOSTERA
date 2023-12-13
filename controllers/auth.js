const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJwt } = require("../helpers/generate-Jwt");

const logIn = async (req = request, res = response) => {
	const { email, password } = req.body;
	console.log(email, password);

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				msg: "Usuario / Password no son correctos - email",
			});
		}

		if (!user.status) {
			return res.status(400).json({
				msg: "Usuario / Password no son correctos - status: false",
			});
		}
		const validPassword = bcryptjs.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				msg: "Usuario / Password no son correctos - password",
			});
		}
		// Generar JWT
		const token = await generateJwt(user.id);

		res.json({ user, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Hable con el administrador.😒" });
	}
};

module.exports = {
	logIn,
};
