import express from "express";
import { createUser, signInUser, googleSignIn, signOutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signInUser);
router.post("/google", googleSignIn);
router.get("/signout", signOutUser);

export default router;