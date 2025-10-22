console.log("✅ Starting Next.js on port:", process.env.PORT);
import { spawn } from "child_process";

const proc = spawn("npm", ["run", "start-real"], { stdio: "inherit" });
proc.on("exit", (code) => process.exit(code));
