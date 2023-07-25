require("dotenv").config();
import cors from "cors";
import express, { Application } from "express";
import { auth } from "./middleware";
import { authRoutes, userRoutes } from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ######## APIS ######## */
app.use(authRoutes);
app.use(auth, userRoutes);

app.listen(process.env.PORT, () =>
    console.log(
        `REST API server ready at: http://localhost:${process.env.PORT}`
    )
);
