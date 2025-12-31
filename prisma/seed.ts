import { PrismaClient, ProfileRole, TaskPriority, TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const adminEmail = "admin@example.com";
const adminPassword = "Password123!";

const demoUsers = [
  {
    email: adminEmail,
    fullName: "Admin User",
    role: ProfileRole.admin,
  },
  {
    email: "pm@zapper.io",
    fullName: "Jordan Lee",
    role: ProfileRole.project_manager,
  },
  {
    email: "dev1@zapper.io",
    fullName: "Riya Patel",
    role: ProfileRole.developer,
  },
  {
    email: "dev2@zapper.io",
    fullName: "Marcus Chen",
    role: ProfileRole.developer,
  },
  {
    email: "submitter@zapper.io",
    fullName: "Elena Cruz",
    role: ProfileRole.submitter,
  },
];

const projectsSeed = [
  {
    name: "Zapper Revamp",
    description: "Rebuilding Zapper on Supabase + Prisma + Gemini",
    targetOffset: 30,
    managerEmail: "pm@zapper.io",
  },
  {
    name: "Customer Onboarding",
    description: "Guided first-run experience, templates, and milestones for new teams.",
    targetOffset: 45,
    managerEmail: adminEmail,
  },
];

type DemoTaskSeed = {
  projectName: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeEmail?: string;
  targetOffset?: number;
  comments?: { authorEmail: string; body: string }[];
};

const taskSeeds: DemoTaskSeed[] = [
  {
    projectName: "Zapper Revamp",
    title: "Migrate auth to NextAuth + Prisma",
    description: "Use Supabase DB via Prisma, remove Firebase",
    status: TaskStatus.in_progress,
    priority: TaskPriority.high,
    assigneeEmail: adminEmail,
    targetOffset: 7,
    comments: [
      {
        authorEmail: "pm@zapper.io",
        body: "Scope confirmed. Please keep the migration steps documented in the repo.",
      },
      {
        authorEmail: adminEmail,
        body: "Credential flow is up; still need Google OAuth + session refresh.",
      },
    ],
  },
  {
    projectName: "Zapper Revamp",
    title: "Wire task board to Prisma API",
    description: "Replace Firestore calls with Prisma-backed API routes",
    status: TaskStatus.to_do,
    priority: TaskPriority.medium,
    assigneeEmail: "dev1@zapper.io",
    targetOffset: 10,
  },
  {
    projectName: "Zapper Revamp",
    title: "Finalize role-based access matrix",
    description: "Draft role permissions for admin, PM, dev, and submitter",
    status: TaskStatus.backlog,
    priority: TaskPriority.medium,
    assigneeEmail: "pm@zapper.io",
    targetOffset: 14,
  },
  {
    projectName: "Zapper Revamp",
    title: "Update activity feed UI",
    description: "Match feed cards to dashboard spacing and typography",
    status: TaskStatus.to_do,
    priority: TaskPriority.low,
    assigneeEmail: "dev2@zapper.io",
    targetOffset: 18,
  },
  {
    projectName: "Zapper Revamp",
    title: "Seed richer demo content",
    description: "Add projects, tasks, and comments so the app feels lived in",
    status: TaskStatus.in_progress,
    priority: TaskPriority.medium,
    assigneeEmail: adminEmail,
    targetOffset: 5,
  },
  {
    projectName: "Zapper Revamp",
    title: "Dashboard query performance pass",
    description: "Index common filters and remove N+1 queries",
    status: TaskStatus.backlog,
    priority: TaskPriority.high,
    assigneeEmail: "dev1@zapper.io",
    targetOffset: 21,
  },
  {
    projectName: "Zapper Revamp",
    title: "QA smoke test login + invite",
    description: "Validate auth, invites, and basic navigation flows",
    status: TaskStatus.to_do,
    priority: TaskPriority.low,
    assigneeEmail: "submitter@zapper.io",
    targetOffset: 12,
    comments: [
      {
        authorEmail: "submitter@zapper.io",
        body: "Will run through login + demo account on staging after PM sign-off.",
      },
    ],
  },
  {
    projectName: "Customer Onboarding",
    title: "Create onboarding checklist",
    description: "Step-by-step setup guide for new teams",
    status: TaskStatus.in_progress,
    priority: TaskPriority.medium,
    assigneeEmail: "pm@zapper.io",
    targetOffset: 6,
  },
  {
    projectName: "Customer Onboarding",
    title: "Design first-project template",
    description: "Starter milestones and default task columns",
    status: TaskStatus.to_do,
    priority: TaskPriority.low,
    assigneeEmail: "dev2@zapper.io",
    targetOffset: 12,
  },
  {
    projectName: "Customer Onboarding",
    title: "Add sample tasks + milestones",
    description: "Populate template with realistic issue examples",
    status: TaskStatus.to_do,
    priority: TaskPriority.medium,
    assigneeEmail: "dev1@zapper.io",
    targetOffset: 14,
    comments: [
      {
        authorEmail: "pm@zapper.io",
        body: "Use a mix of engineering + design tasks so the board feels balanced.",
      },
    ],
  },
  {
    projectName: "Customer Onboarding",
    title: "Write email reminder copy",
    description: "Short nudges for teams that stall in onboarding",
    status: TaskStatus.backlog,
    priority: TaskPriority.low,
    assigneeEmail: "submitter@zapper.io",
    targetOffset: 20,
  },
  {
    projectName: "Customer Onboarding",
    title: "Integrate help center links",
    description: "Embed support resources directly inside the checklist",
    status: TaskStatus.done,
    priority: TaskPriority.low,
    assigneeEmail: adminEmail,
    targetOffset: -2,
  },
  {
    projectName: "Customer Onboarding",
    title: "Track completion analytics",
    description: "Instrument drop-off points in onboarding flow",
    status: TaskStatus.to_do,
    priority: TaskPriority.high,
    assigneeEmail: "dev1@zapper.io",
    targetOffset: 25,
    comments: [
      {
        authorEmail: "dev1@zapper.io",
        body: "Will add an event map in PostHog for now, can swap later.",
      },
    ],
  },
];

function daysFromNow(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function main() {
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const profiles = await Promise.all(
    demoUsers.map((user) =>
      prisma.profile.upsert({
        where: { email: user.email },
        update: {
          fullName: user.fullName,
          role: user.role,
          passwordHash,
        },
        create: {
          email: user.email,
          passwordHash,
          fullName: user.fullName,
          role: user.role,
          userId: crypto.randomUUID(),
        },
      })
    )
  );

  const userByEmail = new Map(profiles.map((profile) => [profile.email, profile]));
  const admin = userByEmail.get(adminEmail);
  if (!admin) {
    throw new Error("Admin profile not created.");
  }

  const org = await prisma.organization.upsert({
    where: { name: "Default Org" },
    update: { createdBy: admin.id },
    create: {
      name: "Default Org",
      createdBy: admin.id,
    },
  });

  await Promise.all(
    profiles.map((profile) =>
      prisma.organizationMember.upsert({
        where: { orgId_userId: { orgId: org.id, userId: profile.id } },
        update: { role: profile.role ?? ProfileRole.submitter },
        create: {
          orgId: org.id,
          userId: profile.id,
          role: profile.role ?? ProfileRole.submitter,
        },
      })
    )
  );

  const projects = [] as Array<{ id: string; name: string }>;

  for (const seed of projectsSeed) {
    const manager = userByEmail.get(seed.managerEmail) ?? admin;
    const existingProject = await prisma.project.findFirst({
      where: { name: seed.name, orgId: org.id },
    });

    const project = existingProject
      ? await prisma.project.update({
          where: { id: existingProject.id },
          data: {
            description: seed.description,
            targetDate: daysFromNow(seed.targetOffset),
            managerId: manager.id,
          },
        })
      : await prisma.project.create({
          data: {
            orgId: org.id,
            name: seed.name,
            description: seed.description,
            targetDate: daysFromNow(seed.targetOffset),
            managerId: manager.id,
          },
        });

    projects.push({ id: project.id, name: project.name });

    await Promise.all(
      profiles.map((profile) =>
        prisma.projectMember.upsert({
          where: { projectId_userId: { projectId: project.id, userId: profile.id } },
          update: {},
          create: {
            projectId: project.id,
            userId: profile.id,
          },
        })
      )
    );
  }

  for (const project of projects) {
    const projectTasks = taskSeeds.filter(
      (task) => task.projectName === project.name
    );
    if (projectTasks.length === 0) continue;

    const titles = projectTasks.map((task) => task.title);
    const existingTasks = await prisma.task.findMany({
      where: {
        projectId: project.id,
        title: { in: titles },
      },
      select: { id: true, title: true },
    });

    const taskByTitle = new Map(
      existingTasks.map((task) => [task.title, task.id])
    );

    for (const seed of projectTasks) {
      if (taskByTitle.has(seed.title)) continue;
      const assignee = seed.assigneeEmail
        ? userByEmail.get(seed.assigneeEmail)
        : undefined;
      const created = await prisma.task.create({
        data: {
          projectId: project.id,
          title: seed.title,
          description: seed.description,
          status: seed.status,
          priority: seed.priority,
          assigneeId: assignee?.id,
          targetDate:
            seed.targetOffset !== undefined
              ? daysFromNow(seed.targetOffset)
              : undefined,
        },
      });
      taskByTitle.set(seed.title, created.id);
    }

    for (const seed of projectTasks) {
      if (!seed.comments?.length) continue;
      const taskId = taskByTitle.get(seed.title);
      if (!taskId) continue;

      for (const comment of seed.comments) {
        const author = userByEmail.get(comment.authorEmail);
        if (!author) continue;

        const existingComment = await prisma.taskComment.findFirst({
          where: {
            taskId,
            body: comment.body,
          },
        });

        if (!existingComment) {
          await prisma.taskComment.create({
            data: {
              taskId,
              authorId: author.id,
              body: comment.body,
            },
          });
        }
      }
    }
  }

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
