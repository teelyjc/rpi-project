import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import { createServer } from "http";

import { RaspberryPiUtils } from "@/RaspberryPi-Utils";

const { HOST, PORT } = process.env;
if (!HOST) {
	throw new Error("Please define HOST at .env or running with .env's file.");
}

if (!PORT) {
	throw new Error("Please define PORT at .env or running with .env's file.");
}

const app = express();
app.use(cors());
app.use(morgan(":method :url :status - :response-time ms"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/rpi", async (request: Request, response: Response) => {
	response.status(200).json({
		success: true,
		data: {
			currentTemperature: await RaspberryPiUtils.getCurrentTemperature(),
			uptime: await RaspberryPiUtils.getUptime(),
		},
		timestamp: new Date().toString(),
	});
});

const server = createServer(app);

server.on("listening", () => {
	console.log(`Listening on ${HOST}:${PORT}`);
});

server.listen(PORT, HOST);

