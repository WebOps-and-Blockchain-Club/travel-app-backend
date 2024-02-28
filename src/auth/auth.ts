import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { prisma } from "..";

const router = Router();

const hashPassword = (password: string) => bcrypt.hash(password, 10);

const verifyPassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    console.log(user);
    req.user = user;
    console.log('user', req.user)
    next();
  });
  
};

router.get("/viewprofile", verifyToken, async(req: any, res:any) => {
  const id=req.user.userId;
  console.log("working");
  try {
    const user = await prisma.user.findUnique({
      where: {id},
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const {
    email,
    password,
    name,
    nationality,
    city,
    address,
    state,
    phone_number,
    dob
  } = req.body;

  var date = new Date(dob)

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        nationality,
        city,
        address,
        state,
        phone_number,
        dob : date
      },
    });
    console.log(user);
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
    );

    res.status(200);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed" });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email},
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
    );

    res.status(200);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

);
router.post("/update", verifyToken, async (req : any,res:any)=>{
  console.log("Updating");
  const data = req.body;
  console.log(data)
  const Id=req.user.userId;
  console.log(Id)
  var date = new Date(data.dob);

  try {
    var hash_Password;
  
    if (req.body.password){
      hash_Password = await hashPassword(req.body.password);
    }
    const user = await prisma.user.update({
      where: {id:Id},
      data: {
        ...data,
        password : hash_Password,
        dob: date
      },
  });

  res.status(200).send(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
