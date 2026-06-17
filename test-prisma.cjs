const { PrismaClient } = require('@prisma/client');
const { PrismaLibSQL } = require('@prisma/adapter-libsql');

const url = 'libsql://bbditrainning-bbditrainning.aws-ap-northeast-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODExOTYwNzAsImlkIjoiMDE5ZWI3OGUtOGUwMS03YzBkLWE5NmMtY2Q3MzlmMTg0ZTZiIiwicmlkIjoiOTk5YmYxNDMtZjgyZS00Y2ZkLTkwYmItNGM3OWIzOTNlMWU2In0.XWQ07B0izduh6nbGpno9vvllxQl2yo1VK9jUjAxqTnNuKmAfUMxZTjldFGnaUsMFp6qzHZsXONiDwO6Ne5crCQ';

const adapter = new PrismaLibSQL({ url, authToken });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Querying trainings...');
  const t = Date.now();
  try {
    const trainings = await prisma.training.findMany({
      include: { progressRecords: true, department: true },
      orderBy: { order: "asc" }
    });
    console.log('Got 1', trainings.length, 'trainings');
    
    const trainings2 = await prisma.training.findMany({
      include: { progressRecords: true, department: true },
      orderBy: { order: "asc" }
    });
    console.log('Got 2', trainings2.length, 'trainings');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
