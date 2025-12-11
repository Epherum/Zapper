import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

function toTimestamp(date) {
  return date ? { seconds: Math.floor(new Date(date).getTime() / 1000) } : null;
}

export default async function handler(req, res) {
  const { taskId } = req.query;

  if (req.method === "GET") {
    const comments = await prisma.taskComment.findMany({
      where: { taskId },
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    return res.status(200).json(
      comments.map((c) => ({
        ...c,
        createdAt: toTimestamp(c.createdAt),
        user: c.author?.email,
      }))
    );
  }

  if (req.method === "POST") {
    const { comment, userEmail } = req.body;
    if (!comment || !userEmail) {
      return res.status(400).json({ message: "Missing comment or userEmail" });
    }

    const profile = await prisma.profile.findUnique({
      where: { email: userEmail },
    });
    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = await prisma.taskComment.create({
      data: {
        id: uuidv4(),
        taskId,
        authorId: profile.id,
        body: comment,
      },
    });

    return res.status(201).json({
      ...newComment,
      createdAt: toTimestamp(newComment.createdAt),
      user: profile.email,
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Missing id" });
    await prisma.taskComment.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ message: "Method not allowed" });
}
