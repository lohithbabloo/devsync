import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../app/ApiClient";
import { formatDate } from "../../utils/formatters";
import Card from "../../common/Card";
import EmptyState from "../../common/EmptyState";
import ErrorState from "../../common/ErrorState";
import PageHeader from "../../common/PageHeader";
import { SkeletonList } from "../../common/Skeleton";

function CommitPage() {
  const { repoName } = useParams();
  const [commits, setCommits] = useState([]);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  const loadCommitMsgs = useCallback(async (name) => {
    setStatus("loading");
    try {
      const response = await baseUrl.get(`/api/v1/github/${name}/commits`);
      setCommits(response.data || []);
      setStatus("ready");
    } catch (error) {
      console.error("Failed to load commits", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (repoName) {
      loadCommitMsgs(repoName);
    }
  }, [repoName, loadCommitMsgs]);

  const handleRetry = () => {
    if (repoName) {
      loadCommitMsgs(repoName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <PageHeader title={`Commits for ${repoName}`} />

      {status === "loading" && <SkeletonList rows={6} />}

      {status === "error" && <ErrorState onRetry={handleRetry} />}

      {status === "ready" && commits.length === 0 && (
        <EmptyState
          title="No commits found"
          description="This repository doesn't have any commits yet."
        />
      )}

      {status === "ready" && commits.length > 0 && (
        <ul className="space-y-2">
          {commits.map((commit) => (
            <li key={commit.sha}>
              <Card
                as="button"
                onClick={() => navigate(`/${repoName}/commits/${commit.sha}`)}
                className="w-full p-3 text-left transition hover:border-slate-700 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                <p className="text-sm font-medium text-white">
                  {commit.commit?.message}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {formatDate(commit.commit?.committer?.date)}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommitPage;
