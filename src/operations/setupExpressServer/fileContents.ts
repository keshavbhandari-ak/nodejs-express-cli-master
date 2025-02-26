export const configFileContent = `export const config = {
  PORT: process.env.PORT || 5000,
};
`;

export const serverFileContent = `import app from "./src/app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

export const appFileContent = `import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import dotenv from "dotenv";

const envFile = \`.env.\${process.env.NODE_ENV || "development"}\`;
dotenv.config({ path: envFile });

const app: Application = express();

// Middleware
app.use(express.json());

// Root route defined here
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the homepage!");
});

// Routes
app.use("/api/users", userRoutes);

export default app;
`;

export const controllersFileContent = `import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export const getUsers = (req: Request, res: Response) => {
  const users = getAllUsers();
  res.json(users);
};
`;

export const modelsFileContent = `export interface User {
  id: string;
  name: string;
  email: string;
}
`;

export const routesFileContent = `import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);

export default router;
`;

export const servicesFileContent = `import { User } from "../models/user.model";

// Mock Data
const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Doe", email: "jane@example.com" }
];

export const getAllUsers = () => users;
`;
