import { PrismaClient, ProfileRole, TaskPriority, TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "Password123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.profile.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      fullName: "Admin User",
      role: ProfileRole.admin,
      userId: crypto.randomUUID(),
    },
  });

  const org = await prisma.organization.upsert({
    where: { name: "Default Org" },
    update: {},
    create: {
      name: "Default Org",
      createdBy: admin.id,
    },
  });

  await prisma.organizationMember.upsert({
    where: { orgId_userId: { orgId: org.id, userId: admin.id } },
    update: {},
    create: {
      orgId: org.id,
      userId: admin.id,
      role: ProfileRole.admin,
    },
  });

  const existingProject = await prisma.project.findFirst({
    where: { name: "Zapper Revamp", orgId: org.id },
  });

  const project =
    existingProject ||
    (await prisma.project.create({
      data: {
        orgId: org.id,
        name: "Zapper Revamp",
        description: "Rebuilding Zapper on Supabase + Prisma + Gemini",
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        managerId: admin.id,
      },
    }));

  await prisma.projectMember.upsert({
    where: { projectId_userId: { projectId: project.id, userId: admin.id } },
    update: {},
    create: {
      projectId: project.id,
      userId: admin.id,
    },
  });

  const task1 = await prisma.task.create({
    data: {
      projectId: project.id,
      title: "Migrate auth to NextAuth + Prisma",
      description: "Use Supabase DB via Prisma, remove Firebase",
      status: TaskStatus.in_progress,
      priority: TaskPriority.high,
      assigneeId: admin.id,
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const task2 = await prisma.task.create({
    data: {
      projectId: project.id,
      title: "Wire task board to Prisma API",
      description: "Replace Firestore calls with Prisma-backed API routes",
      status: TaskStatus.to_do,
      priority: TaskPriority.medium,
      assigneeId: admin.id,
      targetDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.taskComment.create({
    data: {
      taskId: task1.id,
      authorId: admin.id,
      body: "Initial migration work seeded.",
    },
  });

  console.info("Seed complete. Admin login:", adminEmail, adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
