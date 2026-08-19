import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  const fetchRecommendations = async () => {
    const res = await axios.get(
      `http://localhost:5000/recommendations/${selectedUser}`
    );
    setJobs(res.data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>DevConnect Graph</h1>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Choose User</option>

        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>

      <button
        onClick={fetchRecommendations}
        style={{ marginLeft: "10px" }}
      >
        Get Recommendations
      </button>

      <h2>Recommended Jobs</h2>

      <ul>
        {jobs.map((job) => (
          <li key={job}>{job}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
