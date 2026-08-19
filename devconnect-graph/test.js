require("dotenv").config();
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER,
    process.env.COGNODB_PASSWORD
  ),
);

async function main() {
  try {
    console.log("URI:", process.env.COGNODB_URI);

    const serverInfo = await driver.getServerInfo();

    console.log("CONNECTED!");
    console.log(serverInfo);
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
  } finally {
    await driver.close();
  }
}

main();
