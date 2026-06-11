const { createClient } = require('@libsql/client');

async function main() {
  const url = 'libsql://bbditrainning-bbditrainning.aws-ap-northeast-1.turso.io';
  const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODExOTYwNzAsImlkIjoiMDE5ZWI3OGUtOGUwMS03YzBkLWE5NmMtY2Q3MzlmMTg0ZTZiIiwicmlkIjoiOTk5YmYxNDMtZjgyZS00Y2ZkLTkwYmItNGM3OWIzOTNlMWU2In0.XWQ07B0izduh6nbGpno9vvllxQl2yo1VK9jUjAxqTnNuKmAfUMxZTjldFGnaUsMFp6qzHZsXONiDwO6Ne5crCQ';
  
  const client = createClient({ url, authToken });
  
  try {
    const res = await client.execute('ALTER TABLE "Training" ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0');
    console.log('Success:', res);
  } catch (e) {
    if (e.message.includes('duplicate column name')) {
      console.log('Column already exists');
    } else {
      console.error('Error:', e);
    }
  }
}

main().catch(console.error);
