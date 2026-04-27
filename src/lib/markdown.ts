// lib/markdown.ts
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

marked.setOptions({
	gfm: true,
	breaks: true,
	pedantic: false,
});

export function markdownToHtml(markdown: string): string {
	if (!markdown) return '';
	const html = marked(markdown.replace(/\+\+(.*?)\+\+/g, '<u>$1</u>')) as string;
	return DOMPurify.sanitize(html);
}
