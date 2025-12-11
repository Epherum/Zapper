import { prisma } from "@/lib/prisma";

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
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    const membership = profile.organizations[0];
    if (!membership) {
      return res.status(404).json({ message: "No organization membership" });
    }

    res.status(200).json({
      ...profile,
      organization: membership.organization,
      organizationRole: membership.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching company user" });
  }
}
