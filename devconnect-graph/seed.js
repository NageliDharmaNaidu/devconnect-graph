require("dotenv").config();
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER,
    process.env.COGNODB_PASSWORD
  )
);

async function seed() {
  const session = driver.session();

  try {
    await session.run(`
      CREATE (d:User {name:'Dharma'})
      CREATE (r:User {name:'Rahul'})
      CREATE (p:User {name:'Priya'})

      CREATE (devops:Skill {name:'DevOps'})
      CREATE (cloud:Skill {name:'Cloud'})
      CREATE (docker:Skill {name:'Docker'})

      CREATE (job1:Job {title:'DevOps Intern'})
      CREATE (job2:Job {title:'Cloud Engineer'})
      CREATE (job3:Job {title:'Site Reliability Engineer'})

      CREATE (d)-[:KNOWS]->(r)
      CREATE (r)-[:KNOWS]->(p)

      CREATE (d)-[:HAS_SKILL]->(devops)

      CREATE (p)-[:HAS_SKILL]->(cloud)
      CREATE (p)-[:HAS_SKILL]->(docker)

      CREATE (job1)-[:REQUIRES]->(devops)
      CREATE (job2)-[:REQUIRES]->(cloud)
      CREATE (job3)-[:REQUIRES]->(docker)
    `);

    console.log("Database Seeded Successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();
