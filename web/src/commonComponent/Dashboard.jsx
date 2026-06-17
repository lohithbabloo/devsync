import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "./ApiClient";
function DashBoard() {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const loadRepos = async () => {
    const response = await baseUrl.get("/api/v1/github/repos");
    console.log(response.data);
    setRepos(response.data);
  };
  console.log(repos);
  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <div>
      <p className="text-white">Dashboard page</p>
      <ul>
        {repos.map((t) => (
          <li key={t.id} className="text-white">
            <button onClick={() => navigate(`${t.name}/commits`)}>
              {t.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashBoard;
