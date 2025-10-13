import { Request, Response } from "express";
import { CS571Auth } from "../services";

export type CS571MiddlewareBodyExtractor = (req: Request, res: Response) => string | undefined;