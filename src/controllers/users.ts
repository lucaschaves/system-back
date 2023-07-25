import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services";
import { getErrorMessage } from "../utils";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await usersServices.getUsers();
        return res.status(200).json({
            success: true,
            data: allUsers,
        });
    } catch (err: any) {
        next(err);
        return res.status(500).json({
            success: false,
            message: getErrorMessage(err),
        });
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await usersServices.createUser(req.body);
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

export const usersControllers = {
    getUsers,
    createUser,
};
