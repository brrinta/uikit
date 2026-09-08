import { lstatSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let allFiles = [];
const toIgnore = ['tiptap', 'stories', 'styles', 'chart.tsx', 'phone-country-input.tsx'];

function generateTs(dir) {
	const files = [];
	readdirSync(path.join(__dirname, dir)).forEach((file) => {
		if (toIgnore.includes(file) || /Impl\.tsx?$/.test(file)) return;
		if (file !== 'index.ts' && !file.endsWith('.scss')  && !file.endsWith('.md') && !file.endsWith('.css') && !file.endsWith('.stories.tsx') && file !== '.DS_Store') {
			const filePath = path.join(__dirname, dir, file);
			const stats = lstatSync(filePath);
			if (stats.isDirectory()) {
				generateTs(`${dir}/${file}`);
			} else {
				files.push(`export * from './${file.replace(/\.tsx?/, '')}';`);
				allFiles.push(`export * from './${dir.replace('src', '')}/${file.replace(/\.tsx?/, '')}';`.replace('//', '/'));
			}
		}
	});
	if (dir == 'src') {
		writeFileSync(path.join(__dirname, dir, 'index.ts'), allFiles.join('\n'), { encoding: 'utf8' });
		allFiles = [];
	} else {
		// writeFileSync(path.join(__dirname, dir, 'index.ts'), files.join('\n'), { encoding: 'utf8' });
	}
	console.log(`${dir} index file Generated Successfully!`);
}

generateTs('src');