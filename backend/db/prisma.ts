import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
console.log("Hello")

async function main() {
  try {
    // Try to perform a query
    await prisma.user.findMany();
    console.log("Prisma Initialized!")
  } catch (error) {
    console.error("Error initializing Prisma\n", error)
  } finally {
    await prisma.$disconnect()
  }
}

main();

export default prisma;