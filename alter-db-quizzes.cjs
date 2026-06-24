const { createClient } = require('@libsql/client');

async function main() {
  const url = 'libsql://bbditrainning-bbditrainning.aws-ap-northeast-1.turso.io';
  const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODExOTYwNzAsImlkIjoiMDE5ZWI3OGUtOGUwMS03YzBkLWE5NmMtY2Q3MzlmMTg0ZTZiIiwicmlkIjoiOTk5YmYxNDMtZjgyZS00Y2ZkLTkwYmItNGM3OWIzOTNlMWU2In0.XWQ07B0izduh6nbGpno9vvllxQl2yo1VK9jUjAxqTnNuKmAfUMxZTjldFGnaUsMFp6qzHZsXONiDwO6Ne5crCQ';
  
  const client = createClient({ url, authToken });
  
  try {
    const res = await client.execute(`
      CREATE TABLE IF NOT EXISTS "StudentQuizResult" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "studentId" TEXT NOT NULL,
          "trainingId" TEXT NOT NULL,
          "lessonId" TEXT NOT NULL,
          "score" INTEGER NOT NULL,
          "total" INTEGER NOT NULL,
          "passed" BOOLEAN NOT NULL,
          "answers" TEXT,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "StudentQuizResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    console.log('Success creating table:', res);
  } catch (e) {
    console.error('Error:', e);
  }
}

main().catch(console.error);
