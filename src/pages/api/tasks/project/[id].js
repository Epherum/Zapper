import { prisma } from "@/lib/prisma";

function toTimestamp(date) {
  return date ? { seconds: Math.floor(new Date(date).getTime() / 1000) } : null;
}

const isUuid = (value) => /^[0-9a-fA-F-]{8}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{4}-[0-9a-fA-F-]{12}$/.test(value);

const presentStatus = {
  to_do: "To do",
  in_progress: "In progress",
  backlog: "Backlog",
  done: "Done",
};

export default async function handler(req, res) {
  const { id } = req.query;

  const project = isUuid(id)
    ? await prisma.project.findUnique({ where: { id } })
    : await prisma.project.findFirst({ where: { name: id } });
  if (!project) return res.status(404).json({ message: "Project not found" });

  const tasks = await prisma.task.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: "desc" },
  });

  const shaped = tasks.map((task) => ({
    ...task,
    status: presentStatus[task.status] || task.status,
    createdAt: toTimestamp(task.createdAt),
    targetDate: task.targetDate,
  }));

  res.status(200).json(shaped);
}
