import { prisma } from "@/lib/prisma";

function toTimestamp(date) {
  return date ? { seconds: Math.floor(new Date(date).getTime() / 1000) } : null;
}

export default async function handler(req, res) {
  const { email } = req.query;

  const profile = await prisma.profile.findUnique({
    where: { email },
    include: {
      projectMemberships: {
        include: { project: true },
      },
    },
  });

  if (!profile) return res.status(200).json([]);

  const projects = profile.projectMemberships.map((m) => ({
    ...m.project,
    createdAt: toTimestamp(m.project.createdAt),
    targetDate: m.project.targetDate,
  }));

  return res.status(200).json(projects);
}
