import winston from "winston";
import LokiTransport from "winston-loki";
import https from "https";
import { CS571Log } from "../model/log";
import { CS571Config } from "../model";

export class CS571Logger {

    private readonly logger: winston.Logger;
    private readonly config: CS571Config;

    public constructor(config: CS571Config) {
        this.config = config;
        this.logger = this.init();
    }

    private init(): winston.Logger {
        const lokiTransport = new LokiTransport({
            host: this.config.SECRET_CONFIG.LOKI_HOST ?? "http://localhost:3100",
            format: winston.format.json({deterministic: false}),
            labels: {
                "service": this.config.PRODUCT
            },
            json: true,
            basicAuth: `${this.config.SECRET_CONFIG.LOKI_USER}:${this.config.SECRET_CONFIG.LOKI_PASS}`,
            replaceTimestamp: true,
            batching: true,
            interval: 5,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            onConnectionError: (err) => {
                console.error("Loki connection failed...", err);
                console.error("Retrying in 15 seconds...");
                this.init();
            },
        });
        const consoleTransport = new winston.transports.Console({
            format: winston.format.json({deterministic: false}),
        });

        lokiTransport.on("error", (err: Error) => {
            console.error("Failed to transport logs", err);
        });

        return winston.createLogger({
            format: winston.format.json({deterministic: false}),
            transports: [
                lokiTransport,
                consoleTransport
            ],
        });
    }

    private _log(level: string, log: CS571Log) {
        let dt = new Date();
        this.logger.log(level, {
            dt: dt.toLocaleString("en-US", { timeZone: "America/Chicago" }),
            ts: dt.getTime(),
            ...log
        })
    }

    public debug(log: CS571Log) {
        this._log("debug", log);
    }

    public info(log: CS571Log) {
        this._log("info", log);
    }

    public warn(log: CS571Log) {
        this._log("warn", log);
    }

    public error(log: CS571Log) {
        this._log("error", log);
    }

    public static construct(config: CS571Config) {
        return new CS571Logger(config);
    }
}