import { useEffect, useState } from "react";
import baseUrl from "./ApiClient";
import { useParams } from "react-router-dom";
function Commit() {
  const { repoName } = useParams();
  const [commits, setCommits] = useState([]);
  async function loadCommitMsgs(repoName) {
    const response = await baseUrl.get(
      "/api/v1/github/" + repoName + "/commits",
    );
    console.log(response.data);
    setCommits(response.data);
  }
  useEffect(() => {
    loadCommitMsgs(repoName);
  }, []);
  return (
    <div>
      <div>hello commits</div>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha} className="text-white">
            {commit.commit.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Commit;
