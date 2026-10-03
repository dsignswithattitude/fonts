const minimumNpmVersion = [11, 10, 0];
const userAgent = process.env.npm_config_user_agent ?? "";
const npmVersionToken = userAgent.split(" ").find((token) => token.startsWith("npm/"));
const npmVersion = npmVersionToken?.slice(4).split(".").map(Number);

const supportsMinimumReleaseAge =
  npmVersion?.length === minimumNpmVersion.length &&
  npmVersion.every(Number.isFinite) &&
  (npmVersion[0] > minimumNpmVersion[0] ||
    (npmVersion[0] === minimumNpmVersion[0] &&
      (npmVersion[1] > minimumNpmVersion[1] ||
        (npmVersion[1] === minimumNpmVersion[1] && npmVersion[2] >= minimumNpmVersion[2]))));

if (!supportsMinimumReleaseAge) {
  console.error(
    `This repository requires npm >= ${minimumNpmVersion.join(".")} to enforce its 7-day dependency release-age policy. Detected: ${npmVersionToken ?? "unknown"}.`
  );
  process.exit(1);
}
