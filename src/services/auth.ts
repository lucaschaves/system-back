import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { prisma } from "../api";
import {
    CONST_AUTHENTICATION_TOKEN_EXPIRATION,
    CONST_SECRET_KEY,
} from "../constants";

export interface ILogin {
    email: string;
    password: string;
}

export const SECRET_KEY: Secret = CONST_SECRET_KEY;

const login = async (props: ILogin) => {
    try {
        const { email, password } = props;

        const foundUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!foundUser) {
            throw new Error("O e-mail do usuário não está correto");
        }
        if (foundUser.password) {
            const isMatch = bcrypt.compareSync(password, foundUser.password);
            if (isMatch) {
                const token = jwt.sign(
                    { _id: foundUser.id?.toString(), name: foundUser.name },
                    SECRET_KEY,
                    {
                        expiresIn: CONST_AUTHENTICATION_TOKEN_EXPIRATION,
                    }
                );

                return {
                    user: {
                        id: foundUser.id,
                        email: foundUser.email,
                        name: foundUser.name,
                        createdAt: foundUser.createdAt,
                        updatedAt: foundUser.updatedAt,
                    },
                    token: token,
                };
            }
        } else {
            throw new Error("A senha não está correta");
        }
    } catch (error) {
        throw error;
    }
};

export const authServices = {
    login,
};
