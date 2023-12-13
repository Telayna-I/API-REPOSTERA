const { response } = require("express");
const Order = require("../models/order");

const searchOrders = async (term = "", res = response) => {
	const regex = new RegExp(term, "i"); // Expresion regular que valida mayusculas y minusculas

	const [count, orders] = await Promise.all([
		Order.countDocuments({
			$or: [
				{ name: regex },
				{ product: regex },
				{ phone: regex },
				{ notes: regex },
				{ hour: regex },
			],
		}),
		Order.find({
			$or: [
				{ name: regex },
				{ product: regex },
				{ phone: regex },
				{ notes: regex },
				{ hour: regex },
			],
		}),
	]);

	return res.json({
		count,
		results: orders ? [orders] : [],
	});
};

module.exports = {
	searchOrders,
};
