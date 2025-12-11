const defaultRoles = [
  {
    key: "admin",
    name: "Admin",
    description: "Owns the workspace, manages billing, and keeps the system tidy.",
    capabilities: ["Full access", "Team management", "Settings"],
  },
  {
    key: "project_manager",
    name: "Project Manager",
    description: "Plans sprints, triages work, and keeps delivery moving.",
    capabilities: ["Projects", "Backlog curation", "Reports"],
  },
  {
    key: "developer",
    name: "Developer",
    description: "Builds features, updates status, and collaborates in context.",
    capabilities: ["Tasks", "Comments", "Attachments"],
  },
  {
    key: "submitter",
    name: "Submitter",
    description: "Creates requests and tracks progress without noise.",
    capabilities: ["Request intake", "Status tracking"],
  },
];

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ roles: defaultRoles });
  }

  if (req.method === "POST") {
    const { key, name, description = "", capabilities = [] } = req.body || {};
    if (!key || !name) {
      return res.status(400).json({ message: "key and name are required" });
    }

    const role = {
      id: crypto.randomUUID(),
      key,
      name,
      description,
      capabilities,
      persisted: false,
    };

    return res.status(201).json({ role });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ message: "Method not allowed" });
}
