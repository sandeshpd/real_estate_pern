import express from "express";
import {
    getAllListings,
    getListings,
    createListing,
    updateListing,
    deleteListing,
    getPublicPropertyById
} from "../controllers/listing.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get/all", verifyToken, getAllListings);
router.post("/create", verifyToken, createListing);
router.put("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/get/:id", verifyToken, getListings);

// Public Endpoint
router.get("/get/public/:id", getPublicPropertyById);

export default router;