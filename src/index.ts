import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./auth/auth";
import authRouter from "./auth/auth";
import cors from "cors";

const app = express();

export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(authRouter);

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You have access to this protected route" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
