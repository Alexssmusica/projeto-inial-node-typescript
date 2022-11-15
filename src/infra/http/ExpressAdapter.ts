import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import HttpServer from './HttpServer';

export default class ExpressAdapter implements HttpServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
	}

	route(method: string, url: string, callback: Function): void {
		//@ts-ignore
		this.app[method](url, async function (req: Request, res: Response) {
			try {
				const output = await callback(req.params, req.body);
				res.json(output);
			} catch (error) {
				res.status(500).json({ message: error }).end();
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port, () => console.log(`Servidor rest iniciado na porta ${port}.`));
	}
}
