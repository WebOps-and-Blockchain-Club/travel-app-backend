// import express from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// const app = express();

// app.use(express.json());

// app.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password,
//       },
//     });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'User registration failed' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

