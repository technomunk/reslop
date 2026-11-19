import pkg from "../../package.json" with { type: "json" };

// Single source of truth for the CLI/daemon version handshake (RT-B03).
export const VERSION: string = pkg.version;
