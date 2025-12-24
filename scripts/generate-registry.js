#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = resolve(__dirname, "..");
const registryDir = resolve(projectRoot, "registry/ui");
const outputDir = resolve(projectRoot, "public/r/styles/termcn");

// Criar diretório de saída
mkdirSync(outputDir, { recursive: true });

// Mapa de dependências por componente
const componentDeps = {
	button: ["class-variance-authority", "@radix-ui/react-slot"],
	card: [],
	input: [],
	badge: ["class-variance-authority"],
	alert: ["class-variance-authority"],
	separator: [],
};

// Ler todos os componentes
const components = readdirSync(registryDir)
	.filter((file) => file.endsWith(".tsx"))
	.map((file) => file.replace(".tsx", ""));

console.log(`📦 Generating registry for ${components.length} components...`);

// Gerar JSON para cada componente
for (const componentName of components) {
	const sourceFile = resolve(registryDir, `${componentName}.tsx`);
	const content = readFileSync(sourceFile, "utf-8");

	const componentJson = {
		name: componentName,
		type: "registry:ui",
		dependencies: componentDeps[componentName] || [],
		registryDependencies: [],
		files: [
			{
				path: `ui/${componentName}.tsx`,
				content: content,
				type: "registry:ui",
				target: `components/ui/${componentName}.tsx`,
			},
		],
	};

	const outputFile = resolve(outputDir, `${componentName}.json`);
	writeFileSync(outputFile, JSON.stringify(componentJson, null, 2));
	console.log(`✅ Generated ${componentName}.json`);
}

// Gerar index com todos os componentes
const indexJson = components.map((name) => ({
	name,
	type: "registry:ui",
	dependencies: componentDeps[name] || [],
	registryDependencies: [],
	files: [
		{
			path: `ui/${name}.tsx`,
			type: "registry:ui",
			target: `components/ui/${name}.tsx`,
		},
	],
}));

const indexFile = resolve(outputDir, "index.json");
writeFileSync(indexFile, JSON.stringify(indexJson, null, 2));
console.log(`✅ Generated index.json`);

console.log(`\n🎉 Registry generated successfully!`);
console.log(`   Location: public/r/styles/termcn/`);
console.log(`   Components: ${components.join(", ")}`);
console.log(
	`\n📖 Users can now install components with:\n   npx shadcn@latest add https://your-domain.com/r/styles/termcn/button.json`,
);
