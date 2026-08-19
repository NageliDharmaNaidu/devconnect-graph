require("dotenv").config();
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER,
    process.env.COGNODB_PASSWORD
  )
);

async function fetchData() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User)
      RETURN u.name AS name
    `);

    result.records.forEach(record => {
      console.log(record.get("name"));
    });

  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
    await driver.close();
  }
}

fetchData();
