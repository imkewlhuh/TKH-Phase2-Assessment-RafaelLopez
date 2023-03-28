import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// Create the routes here

//Get all active users
router.get("/", async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                isActive: true
            }
        });

        if (users) {
            res.status(200).json({
                success: true,
                users
            })
        };
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Could not find users"
        });
    };
});

//Create a user
router.post("/", async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        });

        if (newUser) {
            res.status(201).json({
                success: true
            });
        };
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    };
});

//Edit a user or admin
router.put("/:user", async (req, res) => {
    const id = req.params.user;

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: parseInt(id)
            }
        });

        if (user) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    isAdmin: req.body.isAdmin,
                    isActive: req.body.isActive
                }
            });

            if (updatedUser) {
                res.status(200).json({
                    success: true
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Failed to update user"
                });
            };
        };
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Could not find user"
        });
    };
});

//Delete a user
router.delete("/:user", async (req, res) => {
    const id = req.params.user;

    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });

        if (deleteUser) {
            res.status(200).json({
                success: true
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to delete user"
            });
        };
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Could not find user"
        });
    };
});

//Get all admin users
router.get("/admins", async (_req, res) => {
    try {
        const admins = await prisma.user.findMany({
            where: {
                isAdmin: true
            }
        });

        if (admins) {
            res.status(200).json({
                success: true,
                users: admins
            });
        };
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Could not find admins"
        });
    };
});

export default router;