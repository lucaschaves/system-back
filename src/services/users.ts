import bcrypt from "bcrypt";
import { prisma } from "../api";

export interface IUser {
    id: number;
    email: string;
    name?: string;
    password?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

const saltRounds = 8;

const getUsers = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        throw error;
    }
};

const createUser = async (
    props: Omit<IUser, "id" | "createdAt" | "updatedAt">
) => {
    try {
        const { email, name, password } = props;

        if (password) {
            const hashPassword = await bcrypt.hash(password, saltRounds);
            return await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashPassword,
                },
            });
        }

        return await prisma.user.create({
            data: {
                email,
                name,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const usersServices = {
    getUsers,
    createUser,
};
