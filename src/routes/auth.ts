import express from "express";
import { authControllers } from "../controllers";

const router = express.Router();

router.post("/api/login", authControllers.login);

export default router;
