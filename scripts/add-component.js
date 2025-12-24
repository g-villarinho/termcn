#!/usr/bin/env node

import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
	console.error("❌ Usage: pnpm add-component <component-name>");
	console.error("\nAvailable components:");
	console.error("  - button");
	console.error("  - card");
	console.error("  - input");
	console.error("  - badge");
	console.error("  - alert");
	console.error("  - separator");
	process.exit(1);
}

const projectRoot = resolve(__dirname, "..");
const source = resolve(projectRoot, `registry/ui/${componentName}.tsx`);
const dest = resolve(projectRoot, `src/components/ui/${componentName}.tsx`);

if (!existsSync(source)) {
	console.error(`❌ Component "${componentName}" not found in registry.`);
	console.error("\nAvailable components:");
	console.error("  - button");
	console.error("  - card");
	console.error("  - input");
	console.error("  - badge");
	console.error("  - alert");
	console.error("  - separator");
	process.exit(1);
}

if (existsSync(dest)) {
	console.warn(`⚠️  Component "${componentName}" already exists in src/components/ui/`);
	console.warn("   Skipping to avoid overwriting.");
	process.exit(0);
}

try {
	mkdirSync(dirname(dest), { recursive: true });
	copyFileSync(source, dest);
	console.log(`✅ Component "${componentName}" added successfully!`);
	console.log(`   Location: src/components/ui/${componentName}.tsx`);
	console.log("\nYou can now import it:");
	console.log(`   import { ${toPascalCase(componentName)} } from "@/components/ui/${componentName}";`);
} catch (error) {
	console.error(`❌ Error: ${error.message}`);
	process.exit(1);
}

function toPascalCase(str) {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
}
