import express from "express";
import { usersControllers } from "../controllers";

const router = express.Router();

router.get("/api/users", usersControllers.getUsers);
router.post("/api/user", usersControllers.createUser);

export default router;
