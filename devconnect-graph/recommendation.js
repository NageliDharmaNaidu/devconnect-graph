require("dotenv").config();
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER,
    process.env.COGNODB_PASSWORD
  )
);

async function recommendJobs() {
  const session = driver.session();

  const result = await session.run(
    `
    MATCH (u:User {name:$name})-[:HAS_SKILL]->(s)
    MATCH (j:Job)-[:REQUIRES]->(s)
    RETURN DISTINCT j.title AS job
    `,
    { name: "Dharma" }
  );

  result.records.forEach(record => {
    console.log(record.get("job"));
  });

  await session.close();
  await driver.close();
}

recommendJobs();
