const { Schema, model } = require("mongoose");

const orderSchema = Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio"],
		unique: false,
	},
	status: {
		type: Boolean,
		default: true,
		required: true,
	},
	finished: {
		type: Boolean,
		default: false,
		required: true,
	},
	dateOfOrder: {
		type: Date,
		default: Date.now,
	},
	date: {
		type: String,
		required: [true, "La fecha es obligatoria"],
	},
	kilos: {
		type: Number,
		required: [true, "Los kilos son obligatorios"],
	},
	notes: {
		type: String,
	},
	product: {
		type: String,
		required: [true, "El producto es obligatorio"],
	},
	advance: {
		type: Number,
		required: [true, "La seña es obligatoria"],
	},
	phone: {
		type: String,
		required: [true, "El telefono es obligatorio"],
	},
	hour: {
		type: String,
		required: [true, "El horario es obligatorio"],
	},
	updatedBy: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

orderSchema.methods.toJSON = function () {
	const { __v, ...order } = this.toObject();

	return order;
};
module.exports = model("Order", orderSchema);
