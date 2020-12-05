import fs from "fs";
import path from "path";
import readline from "readline";
import { execSync } from "child_process";

function askQuestion(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("SIGINT", () => {
    // Necessary to stop publish from working if sigint
    console.log("SIGINT");
    process.exit(1);
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

const packagePath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8")
);
const newVersion = pkg.version.split(".");
newVersion[2] = `${parseInt(newVersion[2], 10) + 1}`;
const newPkg = { ...pkg, version: newVersion.join(".") };
const newPkgJson = JSON.stringify(newPkg, null, 2);

async function run() {
  await askQuestion(
    `Press enter to update from v${pkg.version} to v${newPkg.version}.`
  );
  execSync(`yarn && yarn build`, { stdio: "inherit" });
  fs.writeFileSync(packagePath, newPkgJson);
  execSync(
    `git commit -am 'Upgrade to version v${newPkg.version}' && git tag v${newPkg.version} && git push origin v${newPkg.version}`,
    { stdio: "inherit" }
  );
}
run().catch(console.error);
