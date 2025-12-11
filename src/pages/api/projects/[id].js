import { prisma } from "@/lib/prisma";

function toTimestamp(date) {
  return date ? { seconds: Math.floor(new Date(date).getTime() / 1000) } : null;
}

const isUuid = (value) => /^[0-9a-fA-F-]{8}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{12}$/.test(value);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const project = isUuid(id)
      ? await prisma.project.findUnique({
          where: { id },
          include: { tasks: { orderBy: { createdAt: "desc" } } },
        })
      : await prisma.project.findFirst({
          where: { name: id },
          include: { tasks: { orderBy: { createdAt: "desc" } } },
        });

    if (!project) return res.status(404).json({ message: "Not found" });

    return res.status(200).json({
      ...project,
      createdAt: toTimestamp(project.createdAt),
      targetDate: project.targetDate,
      tasks: project.tasks.map((task) => ({
        ...task,
        createdAt: toTimestamp(task.createdAt),
        targetDate: task.targetDate,
      })),
    });
  }

  if (req.method === "PUT") {
    const { description, targetDate, archived, manager, members = [] } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        description,
        targetDate: targetDate ? new Date(targetDate) : null,
        archived: !!archived,
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

    // sync members
    await prisma.projectMember.deleteMany({ where: { projectId: project.id } });
    for (const email of members) {
      const profile = await prisma.profile.upsert({
        where: { email },
        update: {},
        create: { email, userId: crypto.randomUUID() },
      });
      await prisma.projectMember.create({
        data: { projectId: project.id, userId: profile.id },
      });
    }

    return res.status(200).json({
      ...project,
      createdAt: toTimestamp(project.createdAt),
      targetDate: project.targetDate,
    });
  }

  if (req.method === "DELETE") {
    await prisma.task.deleteMany({ where: { projectId: id } });
    await prisma.project.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ message: "Method not allowed" });
}
