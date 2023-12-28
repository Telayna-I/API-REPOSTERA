const { Schema, model } = require("mongoose");

const taskSchema = Schema({
	title: {
		type: String,
		required: [true, "El nombre es obligatorio."],
	},
	description: {
		required: true,
		type: String,
	},
	dateOfOrder: {
		type: String,
		default: new Date().toLocaleDateString(),
	},
	updatedAt: {
		type: String,
	},
	status: {
		type: Boolean,
		default: true,
	},
	finished: {
		type: Boolean,
		default: false,
	},
});

taskSchema.methods.toJSON = function () {
	const { __v, ...task } = this.toObject();
	return task;
};

module.exports = model("Task", taskSchema);
