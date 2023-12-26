import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";

const router = Router();

const hashPassword = (password: string) => bcrypt.hash(password, 10);

const verifyPassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(200);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    res.status(200);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
