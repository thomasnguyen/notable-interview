import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { doctorId, filterDate, selectedStatus } = req.query;

  const result = await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
      status: selectedStatus,
    },
    orderBy: {
      startDate: "asc",
    },
  });
  res.json(result);
}
