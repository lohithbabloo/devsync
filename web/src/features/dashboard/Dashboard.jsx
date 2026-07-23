import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../app/ApiClient";
import Button from "../../common/Button";

function Dashboard() {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);

  const loadRepos = async () => {
    try {
      const response = await baseUrl.get("/api/v1/github/repos");
      setRepos(response.data || []);
    } catch (error) {
      console.error("Failed to load repositories", error);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>
      <ul className="space-y-2">
        {repos.map((repo) => (
          <li key={repo.id}>
            <Button
              onClick={() => navigate(`${repo.name}/commits`)}
              className="w-full justify-start"
            >
              {repo.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
