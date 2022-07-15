import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { doctorId, filterDate } = req.query;

  const result = await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
    },
    orderBy: {
      startDate: "asc",
    },
  });
  res.json(result);
}
