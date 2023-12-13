const { request, response } = require("express");
const Order = require("../models/order");

const getOrders = async (req = request, res = response) => {
	try {
		const [total, orders] = await Promise.all([
			Order.countDocuments({
				$or: [{ status: true }],
				$and: [{ finished: false }],
			}),
			Order.find({
				$or: [{ status: true }],
				$and: [{ finished: false }],
			}).populate("user", "name"),
		]);

		res.status(200).json({
			total,
			orders,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const getFinishedOrders = async (req = request, res = response) => {
	try {
		const [total, orders] = await Promise.all([
			Order.countDocuments({
				$or: [{ status: true }],
				$and: [{ finished: true }],
			}),
			Order.find({
				$or: [{ status: true }],
				$and: [{ finished: true }],
			}).populate("user", "name"),
		]);

		res.status(200).json({
			total,
			orders,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const getDeletedOrders = async (req = request, res = response) => {
	try {
		const [total, orders] = await Promise.all([
			Order.countDocuments({
				$or: [{ status: false }],
			}),
			Order.find({
				$or: [{ status: false }],
			}).populate("user", "name"),
		]);

		res.status(200).json({
			total,
			orders,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const createOrder = async (req = request, res = response) => {
	const { name, product, kilos, phone, advance, date, notes, hour } =
		req.body;

	try {
		const data = {
			name: name.toUpperCase(),
			product,
			kilos,
			phone,
			advance,
			date,
			notes,
			hour,
			user: req.user._id,
		};

		const order = new Order(data);
		await order.save();

		return res.status(200).json({
			order,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "La orden no pudo ser guardada, contacte al administrador",
		});
	}
};

const updateOrder = async (req = request, res = response) => {
	const { id } = req.params;

	const { _id, status, finished, user, ...rest } = req.body;

	const data = { ...rest, updatedBy: req.user.name };

	try {
		const newOrder = await Order.findByIdAndUpdate(id, data, {
			new: true,
		}).populate("user", "name");

		res.json({ newOrder });
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const finishOrder = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const order = await Order.findByIdAndUpdate(
			id,
			{
				finished: true,
			},
			{ new: true }
		).populate("user", "name");

		res.json(order);
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const deleteOrder = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const order = await Order.findByIdAndUpdate(
			id,
			{
				status: false,
			},
			{ new: true }
		).populate("user", "name");

		res.json(order);
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

module.exports = {
	getOrders,
	getFinishedOrders,
	getDeletedOrders,
	createOrder,
	updateOrder,
	finishOrder,
	deleteOrder,
};
