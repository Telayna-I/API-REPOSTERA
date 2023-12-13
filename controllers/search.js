const { request, response } = require("express");
const { searchOrders } = require("../helpers/db-searchs");

const allowedCollections = ["orders"];

const search = async (req = request, res = response) => {
	const { collection, term } = req.params;

	if (!allowedCollections.includes(collection)) {
		res.status(400).json({
			msg: `Las colecciones permitidas son: ${allowedCollections}`,
		});
	}

	switch (collection) {
		case "orders":
			searchOrders(term, res);
			break;
		default:
			res.status(500).json({
				msg: "Esta busqueda no esta disponible.",
			});
	}
};

module.exports = {
	search,
};
