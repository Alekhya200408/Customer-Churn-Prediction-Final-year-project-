import express from "express";

import {
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout (only authenticated users)
router.post("/logout", authMiddleware, logoutUser);

// Check logged-in user
router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "User authenticated",
        user: req.user
    });
});

export default router;