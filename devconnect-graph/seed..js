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
      CREATE
      (d:User {name:'Dharma'}),
      (r:User {name:'Rahul'}),
      (p:User {name:'Priya'}),
      (a:User {name:'Anjali'}),
      (k:User {name:'Kiran'}),
      (ar:User {name:'Arjun'}),

      (devops:Skill {name:'DevOps'}),
      (aws:Skill {name:'AWS'}),
      (docker:Skill {name:'Docker'}),
      (k8s:Skill {name:'Kubernetes'}),
      (java:Skill {name:'Java'}),
      (react:Skill {name:'React'}),

      (amazon:Company {name:'Amazon'}),
      (google:Company {name:'Google'}),
      (microsoft:Company {name:'Microsoft'}),
      (wexa:Company {name:'Wexa AI'}),
      (infosys:Company {name:'Infosys'}),

      (j1:Job {title:'DevOps Intern'}),
      (j2:Job {title:'Cloud Engineer'}),
      (j3:Job {title:'Backend Developer'}),

      (d)-[:KNOWS]->(r),
      (r)-[:KNOWS]->(p),
      (p)-[:KNOWS]->(a),
      (a)-[:KNOWS]->(k),
      (k)-[:KNOWS]->(ar),

      (d)-[:HAS_SKILL]->(devops),
      (d)-[:HAS_SKILL]->(aws),
      (d)-[:HAS_SKILL]->(docker),

      (r)-[:HAS_SKILL]->(java),
      (p)-[:HAS_SKILL]->(react),
      (a)-[:HAS_SKILL]->(k8s),

      (r)-[:WORKS_AT]->(amazon),
      (p)-[:WORKS_AT]->(google),
      (a)-[:WORKS_AT]->(microsoft),
      (k)-[:WORKS_AT]->(wexa),

      (amazon)-[:POSTED]->(j1),
      (google)-[:POSTED]->(j2),
      (wexa)-[:POSTED]->(j3),

      (j1)-[:REQUIRES]->(devops),
      (j1)-[:REQUIRES]->(aws),

      (j2)-[:REQUIRES]->(aws),
      (j2)-[:REQUIRES]->(k8s),

      (j3)-[:REQUIRES]->(java)
    `);

    console.log("DevConnect Graph Seeded Successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();
