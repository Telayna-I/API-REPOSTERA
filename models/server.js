const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 8080;
		this.paths = {
			auth: "/api/auth",
			orders: "/api/orders",
			search: "/api/search",
			tasks: "/api/tasks",
			users: "/api/users",
		};

		this.connectDb();
		// Middlewares
		this.middlewares();

		// Rutas

		this.routes();
	}

	async connectDb() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.orders, require("../routes/orders"));
		this.app.use(this.paths.search, require("../routes/search"));
		this.app.use(this.paths.tasks, require("../routes/tasks"));
		this.app.use(this.paths.users, require("../routes/users"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto " + this.port);
		});
	}
}

module.exports = Server;
