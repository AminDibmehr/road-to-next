import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
    deadline: "2024-01-01",
    bounty: 0,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN" as const,
    deadline: "2024-01-01",
    bounty: 0,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "IN_PROGRESS" as const,
    deadline: "2024-01-01",
    bounty: 0,
  },
];

async function seed() {
  const t0 = performance.now();
  console.log("DB Seed: Started...");
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });
  const t1 = performance.now();
  console.log(`DB Seed: Completed in ${t1 - t0} ms`);
}

seed();
