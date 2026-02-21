import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${key}`;
}

const email = (process.argv[2] ?? "").trim().toLowerCase();
const password = process.argv[3] ?? "";
const name = process.argv[4] ?? "demo-user";

if (!email || !password) {
  console.error("Usage: node scripts/set-password.mjs <email> <password> [name]");
  process.exit(1);
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

try {
  const passwordHash = hashPassword(password);
  const userCount = await prisma.user.count();
  const isBootstrap = userCount === 0;
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: { name, passwordHash },
        select: { id: true, email: true, name: true, role: true },
      })
    : await prisma.user.create({
        data: { email, name, role: isBootstrap ? "ADMIN" : "USER", passwordHash },
        select: { id: true, email: true, name: true, role: true },
      });

  if (isBootstrap) {
    console.log("Bootstrap user is forced to ADMIN role.");
  }
  console.log("Updated user:", user);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
