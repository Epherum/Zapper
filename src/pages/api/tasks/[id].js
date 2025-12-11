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

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const task = isUuid(id)
      ? await prisma.task.findUnique({ where: { id }, include: { project: true } })
      : await prisma.task.findFirst({ where: { id }, include: { project: true } });
    if (!task) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({
      ...task,
      project: task.project?.name || task.projectId,
      status: presentStatus[task.status] || task.status,
      createdAt: toTimestamp(task.createdAt),
      targetDate: task.targetDate,
    });
  }

  if (req.method === "PUT") {
    const { title, description, status, priority, assignee, targetDate } =
      req.body;

    let assigneeProfile = null;
    if (assignee) {
      assigneeProfile = await prisma.profile.upsert({
        where: { email: assignee },
        update: {},
        create: { email: assignee, userId: crypto.randomUUID() },
      });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status: statusMap[status] || "to_do",
        priority,
        assigneeId: assigneeProfile?.id || null,
        targetDate: targetDate ? new Date(targetDate) : null,
      },
    });

    return res.status(200).json({
      ...updated,
      status: presentStatus[updated.status] || updated.status,
      createdAt: toTimestamp(updated.createdAt),
      targetDate: updated.targetDate,
    });
  }

  if (req.method === "DELETE") {
    await prisma.taskComment.deleteMany({ where: { taskId: id } });
    await prisma.task.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ message: "Method not allowed" });
}
