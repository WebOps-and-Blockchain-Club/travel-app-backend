"use strict";
// import express from 'express';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// const app = express();
// app.use(express.json());
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });
//     if (user && user.password === password) {
//       // Homepage
//       res.json({ message: 'Login successful' });
//     } else {
//       // Login failed
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
