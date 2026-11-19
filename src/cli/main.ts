import { VERSION } from "../shared/version.ts";

export function main(argv: string[]): number {
  if (argv.includes("--version") || argv.includes("-v")) {
    console.log(VERSION);
    return 0;
  }
  console.error("revtoo: reviews are not implemented yet (RT-B03).");
  return 1;
}

process.exitCode = main(process.argv.slice(2));
