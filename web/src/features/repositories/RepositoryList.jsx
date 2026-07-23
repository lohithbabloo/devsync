import { useEffect, useState } from "react";
import baseUrl from "../../app/ApiClient";

function RepositoryList() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const response = await baseUrl.get("/api/v1/github/repos");
        setRepos(response.data || []);
      } catch (error) {
        console.error("Failed to load repositories", error);
      }
    };

    loadRepos();
  }, []);

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  );
}

export default RepositoryList;
