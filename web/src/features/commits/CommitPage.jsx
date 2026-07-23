import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../app/ApiClient";
import { formatDate } from "../../utils/formatters";
function CommitPage() {
  const { repoName } = useParams();
  const [commits, setCommits] = useState([]);

  async function loadCommitMsgs(name) {
    try {
      const response = await baseUrl.get(`/api/v1/github/${name}/commits`);
      setCommits(response.data || []);
    } catch (error) {
      console.error("Failed to load commits", error);
    }
  }

  useEffect(() => {
    if (repoName) {
      loadCommitMsgs(repoName);
    }
  }, [repoName]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <h1 className="mb-4 text-2xl font-semibold">Commits for {repoName}</h1>
      <ul className="space-y-3">
        {commits.map((commit) => (
          <li key={commit.sha} className="rounded-md bg-slate-900 p-3">
            <p>{commit.commit?.message}</p>
            <p className="mt-1 text-sm text-slate-400">
              {formatDate(commit.commit?.committer?.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommitPage;
