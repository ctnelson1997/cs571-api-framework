import { Request, Response } from "express";
import { CS571MiddlewareBodyExtractor } from "./types";
import { CS571Auth } from "../services";

export class CS571InitOptions {
    public readonly skipAuth: boolean;
    public readonly allowNoAuth: string[];
    public readonly skipCors: boolean;
    public readonly middlewareBodyExtractor: CS571MiddlewareBodyExtractor;

    public constructor(obj?: {
        allowNoAuth?: string[],
        skipAuth?: boolean,
        skipCors?: boolean,
        middlewareBodyExtractor?: CS571MiddlewareBodyExtractor
    }) {
        this.allowNoAuth = obj?.allowNoAuth ?? [];
        this.skipAuth = obj?.skipAuth ?? false;
        this.skipCors = obj?.skipCors ?? false;
        this.middlewareBodyExtractor = obj?.middlewareBodyExtractor ?? ((req: Request, res: Response) => {
            return typeof req.body === "object" ? JSON.stringify(req.body) : (typeof req.body === "string" ? req.body : undefined)
        });
    }
}