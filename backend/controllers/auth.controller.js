import { PrismaClient } from "../prisma/generate/prisma/index.js";
import bcryptsjs from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function createUser(req, res, next) {
    // Logic to create a User and store in database
    const { username, password, email } = req.body;
    const hashedPassword = bcryptsjs.hashSync(password, 10);
    
    // Create a user in the database
    try {
        const newUser = await prisma.users.create({
            data: { username, password: hashedPassword, email }
        });
        res
            .status(201)
            .json({ message: "User created successfully.", user: newUser });
        // console.log("User created successfully.");
    } catch (error) {
        next(error);
    }
};

// Method to check if the specified user exists or not in the database.
async function fetchUser(email, password) {
    const validUser = await prisma.users.findFirst({ where: { email } });
    if (!validUser) {
        throw { statusCode: 404, message: "User with this email does not exist." };
    }
    const validPassword = bcryptsjs.compareSync(password, validUser.password);
    if (!validPassword) {
        throw { statusCode: 401, message: "Invalid Credentials." };
    }
    return validUser;
}

export async function signInUser(req, res, next) {
    // Logic behind authenticating the User by fetching 
    // and matching appropriate record from the database.
    const { email, password } = req.body;
    try {
        const validuser = await fetchUser(email, password);
        const token = jwt.sign({ id: validuser.id }, process.env.JWT_SECRET);
        const { password: pass, ...user } = validuser;     // This hides password from response body
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ message: "Sign in successful", user });
    } catch (error) {
        next(error);
    }
};

export async function googleSignIn(req, res, next) {
    const { email } = req.body;
    try {
        const userExists = await prisma.users.findFirst({ where: { email } });
        // If the user already exists in the database, then Sign in the user
        // else Register the user
        if (userExists) {
            const { password: pass, ...user } = userExists;
            res
                .status(200)
                .json({ message: "Sign in successful.", user });
        } else {
            // const { name, email, avatar } = req.body;
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedGeneratePassword = bcryptsjs.hashSync(generatePassword, 10);
            const newUser = await prisma.users.create({
                data: {
                    username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                    email: req.body.email,
                    password: hashedGeneratePassword,
                    avatar: req.body.profileImage
                }
            });
            res
                .status(201)
                .json({ message: "User registered successfully.", user: newUser });
        }
    } catch (error) {
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};

export async function signOutUser(req, res, next) {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User has been logged out.");
    } catch (error) {
        next(error);
    }
};