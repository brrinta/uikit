const { lstatSync, readdirSync, writeFileSync } = require('node:fs');
const path = require('node:path');

let allFiles = [];
const toIgnore = ['tiptap', 'stories', 'styles'];

function generateTs(dir) {
	const files = [];
	readdirSync(path.join(__dirname, dir)).forEach((file) => {
		if (toIgnore.includes(file)) return;
		if (file !== 'index.ts' && !file.endsWith('.scss') && !file.endsWith('.css')&& !file.endsWith('.stories.tsx') && file !== '.DS_Store') {
			const filePath = path.join(__dirname, dir, file);
			const stats = lstatSync(filePath);
			if (stats.isDirectory()) {
				generateTs(`${dir}/${file}`);
				// files.push(`export * from './${file}';`);
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

// watch(path.join(__dirname, 'src/lib'), { recursive: true }, (eventType, filename) => {
// 	console.log(`File ${filename} was changed, event type: ${eventType}`);
// 	generateTs('src');
// });
