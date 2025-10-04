import bcryptsjs from "bcryptjs";
import { PrismaClient } from "../prisma/generate/prisma/index.js";

const prisma = new PrismaClient();

export async function getUsers(req, res, next) {
    try {
        const users = await prisma.users.findMany();
        res
            .status(200)
            .json(users);
    } catch (error) {
        console.log("Error fetching data: ", error);
        next(error);
    }
};

export async function getUserById(req, res, next) {
    try {
        const userFound = await prisma.users.findFirst({ where: { id: +req.params.id } });
        if (!userFound) {
            const error = new Error("User Not Found.");
            error.statusCode = 404;
            return next(error);
        }

        const { password: pass, ...rest } = userFound;
        res.status(200).json(rest);
    } catch (error) {
        console.log("Something went wrong:", error);
        next(error);
    }
};

export async function updateUser(req, res, next) {
    // FIXED: Convert type of both id's to Integer in order to match those
    if (+req.user.id !== +req.params.id) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        return next(error);
        // return next(errorHandler(401, "Unauthorized."));
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptsjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await prisma.users.update(
            {
                where: { id: ParseInt(req.params.id) },
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                },
            }
        );

        const { password, ...rest } = updatedUser;

        res
            .status(200)
            .json({ message: `User ${req.params.id} updated successfully.`, user: rest });
    } catch (error) {
        console.log("Something went wrong: ", error);
        next(error);
    }
};

export async function deleteUser(req, res, next) {
    // console.log({ req: !!res, res: !!res, next: !!next });
    if (Number(req.user.id) !== Number(req.params.id)) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        return next(error);
        // return next(errorHandler(401, "Unauthorized"));
    }
    try {
        await prisma.users.delete(
            {
                where: { id: Number(req.params.id) }
            }
        );

        res.clearCookie("access_token");
        res
            .status(200)
            .json({ message: `User ${req.params.id} has been deleted.` })
    } catch (error) {
        console.log("Something went wrong: ", error);
        next(error);
    }
};