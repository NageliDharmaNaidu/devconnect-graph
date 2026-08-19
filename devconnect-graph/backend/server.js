require("dotenv").config();
const express = require("express");
const cors = require("cors");
const neo4j = require("neo4j-driver");

const app = express();

app.use(cors());
app.use(express.json());

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER,
    process.env.COGNODB_PASSWORD
  )
);

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "DevConnect API Running" });
});

// Get All Users
app.get("/users", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User) RETURN u.name AS name"
    );

    const users = result.records.map(
      r => r.get("name")
    );

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

// Skill-Based Job Recommendations
app.get("/recommendations/:name", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {name:$name})-[:HAS_SKILL]->(s:Skill)
      MATCH (j:Job)-[:REQUIRES]->(s)
      RETURN DISTINCT j.title AS job
      `,
      { name: req.params.name }
    );

    const jobs = result.records.map(
      r => r.get("job")
    );

    res.json(jobs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

// Referral Network Query (Multi-Hop Traversal)
app.get("/referrals/:name", async (req, res) => {
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
      { name: req.params.name }
    );

    const jobs = result.records.map(
      r => r.get("job")
    );

    res.json(jobs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
