export const endpoints = {
  github_url: {
    repos: "/api/v1/github/repos",
    commits: (repo) => `/api/v1/github/${repo}/commits`,
  },

  ai_url: {
    bulk_summary: "/commit/summary",
    standalone_summary: "/commit-summary",
  },
};
