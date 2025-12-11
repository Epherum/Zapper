import { prisma } from "@/lib/prisma";

function toTimestamp(date) {
  return date ? { seconds: Math.floor(new Date(date).getTime() / 1000) } : null;
}

async function ensureDefaultOrg() {
  return prisma.organization.upsert({
    where: { name: "Default Org" },
    update: {},
    create: {
      name: "Default Org",
    },
  });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const projects = await prisma.project.findMany({
      include: {
        tasks: {
          take: 3,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const shaped = projects.map((project) => ({
      ...project,
      createdAt: toTimestamp(project.createdAt),
      targetDate: project.targetDate,
      tasks: project.tasks.map((task) => ({
        ...task,
        createdAt: toTimestamp(task.createdAt),
        targetDate: task.targetDate,
      })),
    }));

    return res.status(200).json(shaped);
  }

  if (req.method === "POST") {
    const org = await ensureDefaultOrg();
    const { name, description, targetDate, manager, members = [] } = req.body;

    const project = await prisma.project.create({
      data: {
        orgId: org.id,
        name,
        description,
        targetDate: targetDate ? new Date(targetDate) : null,
        managerId: manager
          ? (
              await prisma.profile.upsert({
                where: { email: manager },
                update: {},
                create: { email: manager, userId: crypto.randomUUID() },
              })
            ).id
          : null,
      },
    });

    // attach members
    for (const email of members) {
      const profile = await prisma.profile.upsert({
        where: { email },
        update: {},
        create: { email, userId: crypto.randomUUID() },
      });
      await prisma.projectMember.upsert({
        where: { projectId_userId: { projectId: project.id, userId: profile.id } },
        update: {},
        create: { projectId: project.id, userId: profile.id },
      });
    }

    return res.status(201).json({
      ...project,
      createdAt: toTimestamp(project.createdAt),
      targetDate: project.targetDate,
      tasks: [],
    });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ message: "Method not allowed" });
}
