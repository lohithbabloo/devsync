import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../app/ApiClient";
import { formatDate } from "../../utils/formatters";
import Card from "../../common/Card";
import EmptyState from "../../common/EmptyState";
import ErrorState from "../../common/ErrorState";
import PageHeader from "../../common/PageHeader";
import { SkeletonList } from "../../common/Skeleton";
import aiBaseUrl from "../../app/AiClientBaseUrl";

function CommitPage() {
  const { repoName } = useParams();
  const [commits, setCommits] = useState([]);
  const [selectedCommits, setSelectedCommits] = useState(new Set());
  const [status, setStatus] = useState("loading");
  // const [commitDetials, setCommitDetails] = useState([]);

  const navigate = useNavigate();

  const loadCommitMsgs = useCallback(async (name) => {
    setStatus("loading");

    try {
      const response = await baseUrl.get(`/api/v1/github/${name}/commits`);
      setCommits(response.data || []);
      setSelectedCommits(new Set());
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

  const toggleCommit = (sha) => {
    setSelectedCommits((previous) => {
      const updated = new Set(previous);

      if (updated.has(sha)) {
        updated.delete(sha);
      } else {
        updated.add(sha);
      }

      return updated;
    });
  };

  const handleGenerateSummary = async () => {
    const selected = commits.filter((commit) =>
      selectedCommits.has(commit.sha),
    );

    const shaValues = selected.map((x) => x.sha);
    try {
      const response = await baseUrl.post(
        `/api/v1/github/${repoName}/commits`,
        shaValues,
      );
      console.log(response.data);
      const commitDetails = response.data;
      generateSummaryForCommits(commitDetails);
    } catch (e) {
      console.log("Exception occured in commitpage.jsx", e);
    }
    // TODO:
    // Send selected commits / SHAs to backend
    // navigate to summary generation flow
    //so now selected sha will be send to the authify backend and that response will be fed to ai servic
  };

  const generateSummaryForCommits = async (commitDetails) => {
    try {
      const userRequestDto = commitDetails.map((y) => ({
        userPrompt: y.commit.message,
        fileChanges: y.files.map((file) => ({
          fileName: file.filename,
          fileDiff: file.patch,
        })),
      }));
      console.log(userRequestDto);
      const postBody = {
        model: "claude-sonnet-4-5",
        userRequestDto: userRequestDto,
      };
      console.log(postBody);

      const aiResponse = await aiBaseUrl.post("/commit-summary", postBody);
      console.log(aiResponse.data.commitSummary);
    } catch (e) {}
  };

  const selectAll = () => {
    setSelectedCommits(new Set(commits.map((commit) => commit.sha)));
  };

  const clearSelection = () => {
    setSelectedCommits(new Set());
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
        <div className="space-y-4">
          {/* Selection toolbar */}
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3">
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-300">
                {selectedCommits.size === 0
                  ? "Select commits to generate a summary"
                  : `${selectedCommits.size} commit${
                      selectedCommits.size > 1 ? "s" : ""
                    } selected`}
              </p>

              {selectedCommits.size > 0 && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs text-slate-400 transition hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {selectedCommits.size < commits.length && (
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs text-slate-400 transition hover:text-white"
                >
                  Select all
                </button>
              )}

              <button
                type="button"
                disabled={selectedCommits.size === 0}
                onClick={handleGenerateSummary}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate Summary
              </button>
            </div>
          </div>

          {/* Commit list */}
          <ul className="space-y-2">
            {commits.map((commit) => {
              const isSelected = selectedCommits.has(commit.sha);

              return (
                <li key={commit.sha}>
                  <Card
                    className={`flex items-center gap-4 p-4 transition ${
                      isSelected
                        ? "border-indigo-500/60 bg-indigo-950/30"
                        : "hover:border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCommit(commit.sha)}
                      aria-label={`Select commit ${commit.commit?.message}`}
                      className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Commit details */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/${repoName}/commits/${commit.sha}`)
                      }
                      className="min-w-0 flex-1 text-left focus-visible:outline-none"
                    >
                      <p className="truncate text-sm font-medium text-white">
                        {commit.commit?.message}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatDate(commit.commit?.committer?.date)}
                      </p>
                    </button>

                    {/* Arrow */}
                    <span className="shrink-0 text-slate-500">→</span>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CommitPage;
