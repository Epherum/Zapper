import { prisma } from "@/lib/prisma";

function toTimestamp(date) {
  return date ? { seconds: Math.floor(new Date(date).getTime() / 1000) } : null;
}

const isUuid = (value) => /^[0-9a-fA-F-]{8}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{12}$/.test(value);

const statusMap = {
  "To do": "to_do",
  "In progress": "in_progress",
  Backlog: "backlog",
  Done: "done",
};

const presentStatus = {
  to_do: "To do",
  in_progress: "In progress",
  backlog: "Backlog",
  done: "Done",
};

async function resolveProject(idOrName) {
  if (isUuid(idOrName)) {
    return prisma.project.findUnique({ where: { id: idOrName } });
  }
  return prisma.project.findFirst({ where: { name: idOrName } });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      title,
      description,
      status = "To do",
      priority = "low",
      assignee,
      targetDate,
      project,
      subtaskOf,
    } = req.body;

    const projectRecord = await resolveProject(project);
    if (!projectRecord) {
      return res.status(400).json({ message: "Project not found" });
    }

    let assigneeProfile = null;
    if (assignee) {
      assigneeProfile = await prisma.profile.upsert({
        where: { email: assignee },
        update: {},
        create: { email: assignee, userId: crypto.randomUUID() },
      });
    }

    const task = await prisma.task.create({
      data: {
        projectId: projectRecord.id,
        parentTaskId: subtaskOf || null,
        title,
        description,
        status: statusMap[status] || "to_do",
        priority,
        assigneeId: assigneeProfile?.id || null,
        targetDate: targetDate ? new Date(targetDate) : null,
      },
    });

    return res.status(201).json({
      ...task,
      status: presentStatus[task.status] || task.status,
      project: projectRecord.name,
      createdAt: toTimestamp(task.createdAt),
      targetDate: task.targetDate,
    });
  }

  if (req.method === "GET") {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(
      tasks.map((task) => ({
        ...task,
        status: presentStatus[task.status] || task.status,
        createdAt: toTimestamp(task.createdAt),
        targetDate: task.targetDate,
      }))
    );
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ message: "Method not allowed" });
}
