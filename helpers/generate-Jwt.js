const jwt = require("jsonwebtoken");

const generateJwt = (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: "4h",
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject("No se puede generar el JWT");
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generateJwt,
};
