#!/usr/bin/env node
// Node 26 strips TypeScript types natively, so the CLI runs from source without a build step.
import { main } from "../src/cli/main.ts";

process.exitCode = await main(process.argv.slice(2));
