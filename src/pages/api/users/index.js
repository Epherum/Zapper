import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await prisma.profile.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { email, username, password, role } = req.body;
    const passwordHash = password ? await hash(password, 12) : null;
    const allowedRoles = ["admin", "project_manager", "developer", "submitter"];
    const normalizedRole = allowedRoles.includes(role) ? role : null;

    const user = await prisma.profile.upsert({
      where: { email },
      update: {
        fullName: username,
        passwordHash,
        ...(normalizedRole ? { role: normalizedRole } : {}),
      },
      create: {
        email,
        fullName: username,
        passwordHash,
        userId: crypto.randomUUID(),
        role: normalizedRole || undefined,
      },
    });

    return res.status(201).json(user);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ message: "Method not allowed" });
}
