import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { id, content } = req.body;

  const result = await prisma.doctor.findMany({});
  res.json(result);
}
