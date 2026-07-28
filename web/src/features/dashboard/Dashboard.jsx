import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import baseUrl from "../../app/ApiClient";
import Card from "../../common/Card";
import EmptyState from "../../common/EmptyState";
import ErrorState from "../../common/ErrorState";
import PageHeader from "../../common/PageHeader";
import { SkeletonList } from "../../common/Skeleton";

function Dashboard() {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  const loadRepos = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await baseUrl.get("/api/v1/github/repos");
      setRepos(response.data || []);
      setStatus("ready");
    } catch (error) {
      console.error("Failed to load repositories", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  const handleRetry = () => {
    loadRepos().catch(() => {});
  };

  const handleSync = async () => {
    const promise = loadRepos();
    toast.promise(promise, {
      loading: "Syncing repositories...",
      success: "Repositories synced",
      error: "Failed to sync repositories",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <PageHeader
        title="Dashboard"
        subtitle="Repositories connected to your account"
        toolbar={
          <button
            type="button"
            onClick={handleSync}
            className="text-sm font-medium text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Sync repositories
          </button>
        }
      />

      {status === "loading" && <SkeletonList rows={6} rowClassName="h-20" />}

      {status === "error" && <ErrorState onRetry={handleRetry} />}

      {status === "ready" && repos.length === 0 && (
        <EmptyState
          title="No repositories yet"
          description="Connect a GitHub repository to start tracking commits here."
        />
      )}

      {status === "ready" && repos.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <li key={repo.id}>
              <Card
                as="button"
                onClick={() => navigate(`${repo.name}/commits`)}
                className="w-full p-4 text-left transition hover:border-slate-700 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                <p className="truncate text-sm font-medium text-white">
                  {repo.name}
                </p>
                {repo.description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                    {repo.description}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
