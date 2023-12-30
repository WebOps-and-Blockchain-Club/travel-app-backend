import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.post('/addData', async (req: Request, res: Response) => {
  try {
    const {
      name,
      gender,
      nationality,
      city,
      address,
      state,
      email,
      phone,
      password
    }: {
      name: string;
      gender: string;
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

// Start the server
const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
