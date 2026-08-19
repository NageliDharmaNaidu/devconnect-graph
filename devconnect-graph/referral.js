require("dotenv").config();
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER,
    process.env.COGNODB_PASSWORD
  )
);

async function referralRecommendations() {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {name:$name})
            -[:KNOWS]->(:User)
            -[:KNOWS]->(friend:User)
            -[:HAS_SKILL]->(s:Skill)
            <-[:REQUIRES]-(j:Job)

      RETURN DISTINCT j.title AS job
      `,
      { name: "Dharma" }
    );

    console.log("Jobs through network:");

    result.records.forEach(record => {
      console.log(record.get("job"));
    });

  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
    await driver.close();
  }
}

referralRecommendations();
