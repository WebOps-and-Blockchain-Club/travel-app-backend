import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { Router } from "express";
import { prisma } from "..";
const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is your Express server!');
});

router.post('/addData', async (req: Request, res: Response) => {
  try {
    const {
      name,
      nationality,
      city,
      address,
      state,
      email,
      phone,
      password
    }: {
      name: string;
      nationality: string;
      city: string;
      address: string;
      state: string;
      email: string;
      phone: string;
      password:string;
    } = req.body;

    const newData = await prisma.user.create({
      data: {
        name,
        nationality,
        city,
        address,
        state,
        email,
        phone_number: phone,
        password
      }
    });

    res.status(201).json({ message: 'Data added successfully', data: newData });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while adding data' });
  }
});

