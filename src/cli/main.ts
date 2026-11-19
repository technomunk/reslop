import { ConfigError, loadConfig } from "../server/config.ts";
import { ResolveError, resolveTarget, type Target } from "../server/repo.ts";
import { VERSION } from "../shared/version.ts";
import { parseArgs, USAGE, UsageError } from "./args.ts";

function describe(t: Target): string {
  const where = t.nameWithOwner ? `${t.nameWithOwner} (${t.root})` : t.root;
  if (t.mode === "pr") return `PR #${t.number} of ${where}, fetched from ${t.remote}`;
  return `local change in ${where}: merge-base(${t.base}, ${t.head === "worktree" ? "HEAD" : t.head})..${t.head === "worktree" ? "working tree" : t.head}`;
}

export async function main(argv: string[], cwd = process.cwd()): Promise<number> {
  try {
    const cmd = parseArgs(argv);
    switch (cmd.kind) {
      case "version":
        console.log(VERSION);
        return 0;
      case "help":
        console.log(USAGE);
        return 0;
      case "stop":
        console.error("revtoo: the daemon is not implemented yet (RT-B03).");
        return 1;
      case "review": {
        const target = await resolveTarget(cmd.source, cwd, await loadConfig());
        console.log(`revtoo would review ${describe(target)}`);
        console.error("revtoo: the daemon and review UI are not implemented yet (RT-B03).");
        return 1;
      }
    }
  } catch (e) {
    if (e instanceof UsageError) {
      console.error(`revtoo: ${e.message}\n${USAGE}`);
      return 2;
    }
    if (e instanceof ResolveError || e instanceof ConfigError) {
      console.error(`revtoo: ${e.message}`);
      return 1;
    }
    throw e;
  }
}
