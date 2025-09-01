import { createHmac, randomBytes } from "crypto";
import prismaClient from "../lib/db.js";
import JWT from "jsonwebtoken";

export interface UserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface UserTokenPayload {
    email: string;
    password: string;
}

export class UserService {
    private static generateHash(salt: string, password: string) {
        return createHmac("sha256", salt).update(password).digest("hex");
    }

    public static createUser(payload: UserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt: string = randomBytes(32).toString();
        const hashedPassword = UserService.generateHash(salt, password);

        return prismaClient.user.create({
            data: {
                firstName,
                lastName: lastName ? lastName : null,
                email,
                password: hashedPassword,
                salt,
            },
        });
    }

    private static generateToken(payload: any) {
        return JWT.sign(payload, process.env.JWT_SECRET || "secret");
    }

    public static decodeToken(token: string) {
        try {
            return JWT.verify(token, process.env.JWT_SECRET || "secret");
        } catch (error) {
            throw new Error("Error in decoding token");
        }
    }

    public static async getUserById(id: string) {
        return await prismaClient.user.findUnique({
            where: { id },
        });
    }

    private static async getUserByEmail(email: string) {
        return await prismaClient.user.findUnique({
            where: { email },
        });
    }

    public static async getUserToken(payload: UserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);

        if (!user) throw new Error("User not found");

        const hashedPassword = UserService.generateHash(user.salt, password);

        if (hashedPassword !== user.password)
            throw new Error("Incorrect Password");

        return UserService.generateToken({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
        });
    }
}
