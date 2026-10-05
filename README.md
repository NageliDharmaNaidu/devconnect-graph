# DevConnect Graph

> A full-stack developer recommendation app that uses a graph database to connect skills with relevant career opportunities.

## What it does

DevConnect Graph models relationships between developers, skills and opportunities, then uses those relationships to generate relevant recommendations.

### Highlights

- Graph-based recommendation logic
- REST API backend
- React frontend
- Neo4j graph database
- Environment-based configuration
- Separate frontend and backend structure

## Tech Stack

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express
- **Database:** Neo4j
- **Version Control:** Git, GitHub

## Architecture

```
React / Vite
     │
     ▼
REST API
     │
     ▼
Node.js + Express
     │
     ▼
Neo4j Graph Database
```

## Getting Started

### 1. Clone

```bash
git clone https://github.com/NageliDharmaNaidu/devconnect-graph.git
cd devconnect-graph
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file with your Neo4j connection settings.

> Never commit credentials or secrets to GitHub.

### 4. Start the backend

```bash
node server.js
```

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

## Why I built it

I wanted to learn how graph databases can represent relationships that are difficult to model with a traditional relational approach, and use those relationships for practical recommendations.

## What I learned

- Modeling connected data with Neo4j
- Building REST APIs with Node.js
- Connecting React applications to backend services
- Managing environment configuration
- Designing recommendation logic around graph relationships

## Author

**Nageli Dharma Naidu**

GitHub: https://github.com/NageliDharmaNaidu
