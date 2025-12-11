import { prisma } from "@/lib/prisma";

function toTimestamp(date) {
  return date ? { seconds: Math.floor(new Date(date).getTime() / 1000) } : null;
}

const presentStatus = {
  to_do: "To do",
  in_progress: "In progress",
  backlog: "Backlog",
  done: "Done",
};

export default async function handler(req, res) {
  const { email } = req.query;

  const profile = await prisma.profile.findUnique({
    where: { email },
  });

  if (!profile) return res.status(200).json([]);

  const tasks = await prisma.task.findMany({
    where: { assigneeId: profile.id },
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
