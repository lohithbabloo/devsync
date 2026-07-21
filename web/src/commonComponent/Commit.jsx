import { useEffect, useState } from "react";
import baseUrl from "./ApiClient";
import { useParams } from "react-router-dom";
function Commit() {
  const { repoName } = useParams();
  const [commits, setCommits] = useState([]);
  async function loadCommitMsgs(repoName) {
    try {
      const response = await baseUrl.post(
        "/api/v1/github/" + repoName + "/commits",
      );
      // console.log(response.data);
      setCommits(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    loadCommitMsgs(repoName);
  }, [repoName]);
  useEffect(() => {
    if (commits.length) {
      loadFileChangesForCommit();
    }
  }, [commits]);
  async function loadFileChangesForCommit() {
    const shaValues = commits.map((item) => item.sha);
    console.log("shaVlaues:", shaValues);
  }

  return (
    <div>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha} className="text-white">
            {commit.commit.message}
            {commit.commit.committer.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Commit;
