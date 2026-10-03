/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

// When this build runs inside GitHub Actions (for GitHub Pages deployment),
// the site is served from https://<user>.github.io/<repo>/ instead of the
// domain root, so every internal link/asset needs that "/<repo>" prefix.
// Locally (npm run dev / a plain npm run build) GITHUB_ACTIONS is unset,
// so basePath stays empty and nothing changes for local development.
if (process.env.GITHUB_ACTIONS) {
  const repo = (process.env.GITHUB_REPOSITORY || "").split("/")[1];
  if (repo) {
    nextConfig.basePath = `/${repo}`;
    nextConfig.assetPrefix = `/${repo}/`;
  }
}

module.exports = nextConfig;
