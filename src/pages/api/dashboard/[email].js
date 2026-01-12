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

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { email },
      include: {
        organizations: {
          include: {
            organization: true,
          },
        },
        projectMemberships: {
          include: { project: true },
        },
        tasks: {
          include: { project: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!profile) {
      return res.status(200).json({ user: null, projects: [], tasks: [] });
    }

    const membership = profile.organizations[0];
    const user = {
      ...profile,
      name: profile.fullName || profile.email,
      organization: membership?.organization ?? null,
      organizationRole: membership?.role ?? null,
    };

    const projects = profile.projectMemberships.map((m) => ({
      ...m.project,
      createdAt: toTimestamp(m.project.createdAt),
      targetDate: m.project.targetDate,
    }));

    const tasks = profile.tasks.map((task) => ({
      ...task,
      project: task.project?.name || task.projectId,
      status: presentStatus[task.status] || task.status,
      createdAt: toTimestamp(task.createdAt),
      targetDate: task.targetDate,
    }));

    return res.status(200).json({ user, projects, tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching dashboard data" });
  }
}
