#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../app.config.ts");
const config = fs.readFileSync(configPath, "utf8");

const match = config.match(/version: "(\d+)\.(\d+)\.(\d+)"/);
if (!match) {
  console.error("Could not find version string in app.config.ts");
  process.exit(1);
}

const [, major, minor, patch] = match;
const newVersion = `${major}.${minor}.${parseInt(patch) + 1}`;

fs.writeFileSync(configPath, config.replace(/version: "\d+\.\d+\.\d+"/, `version: "${newVersion}"`));
console.log(`Version bumped to ${newVersion}`);
