"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_SECRET = 'abcdefgh';
const hashPassword = (password) => bcrypt_1.default.hash(password, 10);
const verifyPassword = (password, hashedPassword) => bcrypt_1.default.compare(password, hashedPassword);
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
app.post('/register', async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User registration failed' });
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const passwordMatch = await verifyPassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200);
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You have access to this protected route' });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
