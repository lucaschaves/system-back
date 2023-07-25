import { NextFunction, Request, Response } from "express";
import { authServices } from "../services";
import { getErrorMessage } from "../utils";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authServices.login(req.body);
        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err: any) {
        next(err);
        return res.status(500).json({
            success: false,
            message: getErrorMessage(err),
        });
    }
};

export const authControllers = {
    login,
};
