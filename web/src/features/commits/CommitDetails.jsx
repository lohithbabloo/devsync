import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../app/ApiClient";
import { formatDate, formatRelativeTime } from "../../utils/formatters";
import Badge from "../../common/Badge";
import Card from "../../common/Card";
import ErrorState from "../../common/ErrorState";
import PageHeader from "../../common/PageHeader";
import Skeleton from "../../common/Skeleton";
import Button from "../../common/Button";
import aiBaseUrl from "../../app/AiClientBaseUrl";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
function CommitDetails() {
  const { repoName, sha } = useParams();
  const navigate = useNavigate();
  const [commitDetails, setCommitDetails] = useState(null);
  const [status, setStatus] = useState("loading");
  const [summaryLoading, setSummaryLoading] = useState("");
  const [commitSummary, setCommitSummary] = useState(null);
  const loadCommitDetails = useCallback(async (name, commitSha) => {
    setStatus("loading");
    try {
      const response = await baseUrl.get(
        `/api/v1/github/${name}/commits/${commitSha}`,
      );
      setCommitDetails(response.data?.[0] ?? null);
      setStatus("ready");
    } catch (error) {
      console.error("Failed to load commit details", error);
      setStatus("error");
    }
  }, []);

  const generateCommitSummary = async () => {
    setSummaryLoading("loading");
    try {
      const fileChanges =
        commitDetails?.files?.map((file) => ({
          fileName: file.filename,
          fileDiff: file.patch,
        })) ?? [];

      const postbody = {
        model: "claude-sonnet-4-5",
        userPrompt: commitDetails?.commit?.message,
        fileChanges,
      };

      const response = await aiBaseUrl.post("/commit-summary", postbody);

      setCommitSummary(response.data.commitSummary);
      setSummaryLoading("ready");
    } catch (error) {
      console.error("Commit summary generation failed", error);
      setSummaryLoading("error");
    }
  };

  useEffect(() => {
    if (repoName && sha) {
      loadCommitDetails(repoName, sha);
    }
  }, [repoName, sha, loadCommitDetails]);

  const handleRetry = () => {
    if (repoName && sha) {
      loadCommitDetails(repoName, sha);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <button
        type="button"
        onClick={() => navigate(`/${repoName}/commits`)}
        className="mb-4 text-sm text-slate-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
      >
        &larr; Back to commits
      </button>

      {status === "loading" && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {status === "error" && (
        <ErrorState
          title="Couldn't load this commit"
          description="The commit details couldn't be fetched from GitHub."
          onRetry={handleRetry}
        />
      )}

      {status === "ready" && !commitDetails && (
        <ErrorState
          title="Commit not found"
          description="This commit may have been removed or the SHA is incorrect."
        />
      )}

      {status === "ready" && commitDetails && (
        <div className="space-y-6">
          <div className="flex justify-between">
            <PageHeader
              title={commitDetails.commit?.message}
              subtitle={`${commitDetails.sha}`}
            />
            <Button className="h-min" onClick={generateCommitSummary}>
              Generate Commit summary
            </Button>
          </div>
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
              <span>
                <span className="text-slate-500">Author: </span>
                {commitDetails.commit?.committer?.name || "Unknown"}
              </span>
              <span>
                <span className="text-slate-500">Committed: </span>
                {formatDate(commitDetails.commit?.committer?.date)}
                {commitDetails.commit?.committer?.date ? (
                  <span className="text-slate-500">
                    {" "}
                    ({formatRelativeTime(commitDetails.commit.committer.date)})
                  </span>
                ) : null}
              </span>
            </div>

            {commitDetails.stats ? (
              <div className="mt-3 flex items-center gap-2">
                <Badge tone="neutral">
                  {commitDetails.files?.length || 0} files changed
                </Badge>
                <Badge tone="success">
                  +{commitDetails.stats.additions ?? 0}
                </Badge>
                <Badge tone="danger">
                  -{commitDetails.stats.deletions ?? 0}
                </Badge>
              </div>
            ) : null}
          </Card>

          {commitDetails.files && commitDetails.files.length > 0 ? (
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-slate-300">
                Files changed
              </h2>
              {commitDetails.files.map((file) => (
                <details
                  key={file.filename}
                  className="group rounded-lg border border-slate-800 bg-slate-900"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm text-slate-200 marker:content-none">
                    <span className="truncate">{file.filename}</span>
                    <span className="ml-4 flex shrink-0 items-center gap-2 text-xs">
                      <span className="text-emerald-400">
                        +{file.additions ?? 0}
                      </span>
                      <span className="text-red-400">
                        -{file.deletions ?? 0}
                      </span>
                    </span>
                  </summary>
                  <pre className="overflow-x-auto border-t border-slate-800 px-4 py-3 text-xs text-slate-400">
                    {file.patch || "No preview available for this file."}
                  </pre>
                </details>
              ))}
            </div>
          ) : null}
        </div>
      )}
      {summaryLoading === "ready" && (
        <div className="py-6">
          <div className="text-white border-t-2 pt-2">
            <PageHeader
              title={"Commit Summary"}
              subtitle={"Generated By AI please verify before moving forward"}
            />
            <ReactMarkDown remarkPlugins={[remarkGfm]}>
              {commitSummary}
            </ReactMarkDown>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommitDetails;
