import { Request, Response } from "express";
// Simply returns that the route is not yet implemented
export function notYetImplemented(req: Request, res: Response) {
    res.status(501).json({ message: `${req.method} ${req.baseUrl}${req.url} is not yet implemented` });
}