const { request, response } = require("express");
const Task = require("../models/task");

const getTasks = async (req = request, res = response) => {
	try {
		const [total, tasks] = await Promise.all([
			Task.countDocuments({
				$or: [{ status: true }],
				$and: [{ finished: false }],
			}),
			Task.find({
				$or: [{ status: true }],
				$and: [{ finished: false }],
			}),
		]);

		res.status(200).json({
			total,
			tasks,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const getFinishedTasks = async (req = request, res = response) => {
	try {
		const [total, tasks] = await Promise.all([
			Task.countDocuments({
				$or: [{ status: true }],
				$and: [{ finished: true }],
			}),
			Task.find({
				$or: [{ status: true }],
				$and: [{ finished: true }],
			}),
		]);

		res.status(200).json({
			total,
			tasks,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const getDeletedTasks = async (req = request, res = response) => {
	try {
		const [total, tasks] = await Promise.all([
			Task.countDocuments({
				$or: [{ status: false }],
			}),
			Task.find({
				$or: [{ status: false }],
			}),
		]);

		res.status(200).json({
			total,
			tasks,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const createTask = async (req = request, res = response) => {
	const { title, description } = req.body;

	try {
		const data = {
			title,
			description,
		};

		const task = new Task(data);
		await task.save();

		return res.status(200).json({
			task,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "La tarea no pudo ser guardada, contacte al administrador",
		});
	}
};

const updateTask = async (req = request, res = response) => {
	const { id } = req.params;

	const { dateOfOrder, updatedAt, status, finished, ...rest } = req.body;

	const data = { ...rest, updatedAt: new Date().toLocaleDateString() };

	try {
		const newTask = await Task.findByIdAndUpdate(id, data, {
			new: true,
		});

		res.json({ newTask });
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const finishTask = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const task = await Task.findById(id);
		if (task.finished) {
			const newTask = await Task.findByIdAndUpdate(
				id,
				{
					finished: false,
				},
				{ new: true }
			);
			return res.json({ newTask });
		} else {
			const newTask = await Task.findByIdAndUpdate(
				id,
				{
					finished: true,
				},
				{ new: true }
			);
			return res.json({ newTask });
		}
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const deleteTask = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const task = await Task.findById(id);
		if (task.status) {
			const newTask = await Task.findByIdAndUpdate(
				id,
				{
					status: false,
				},
				{ new: true }
			);
			return res.json({ newTask });
		} else {
			const newTask = await Task.findByIdAndUpdate(
				id,
				{
					status: true,
				},
				{ new: true }
			);
			return res.json({ newTask });
		}
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

module.exports = {
	getTasks,
	getFinishedTasks,
	getDeletedTasks,
	createTask,
	updateTask,
	finishTask,
	deleteTask,
};
