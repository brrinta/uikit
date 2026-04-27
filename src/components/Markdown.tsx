import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkIns from 'remark-ins';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { cn, parseStyle } from '../lib/utils';
import '@mdxeditor/editor/style.css';

interface MarkdownPreviewProps {
	content: string;
	className?: string;
	maxHeight?: string;
}

// Custom remark plugin to handle directives
function remarkDirectiveProcessor() {
	return (tree: any) => {
		visit(tree, (node: any) => {
			if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
				const data = node.data || (node.data = {});
				const hName = node.name;

				if (hName === 'note' || hName === 'warning' || hName === 'tip' || hName === 'caution' || hName === 'danger' || hName === 'info') {
					data.hName = 'div';
					data.hProperties = {
						className: `mdxeditor-admonition mdxeditor-admonition-${hName}`,
						'data-admonition-type': hName,
					};
				} else if (hName === 'linkButton') {
					// Use div instead of a to prevent paragraph wrapping
					data.hName = 'div';
					data.hProperties = {
						className: 'mdxeditor-link-button-wrapper',
						'data-href': node.attributes?.href || '#',
						'data-target': node.attributes?.target || '_self',
						'data-rel': node.attributes?.target === '_blank' ? 'noopener noreferrer nofollow' : undefined,
						'data-color': node.attributes?.color || 'white',
						'data-bg': node.attributes?.bg || '#1b2942',
						'data-style': node.attributes?.style || '',
					};
				}
			}
		});
	};
}

/**
 * MarkdownPreview Component - Matches MDXEditor Styling
 *
 * This component renders markdown with the exact same styling as MDXEditor,
 * making the preview look identical to the editor output.
 */
export const Markdown: React.FC<MarkdownPreviewProps> = ({ content, className }) => {
	return (
		<div
			data-html={'markdown-content'}
			className={cn('mdxeditor-preview markdown-content', className)}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkIns, remarkDirective, remarkMath, remarkDirectiveProcessor]}
				rehypePlugins={[rehypeRaw, rehypeKatex]}
				components={{
					// Admonitions and Link Buttons - matching MDXEditor style
					div({ node, className, children, ...props }: any) {
						const admonitionType = props['data-admonition-type'];

						// Handle admonitions
						if (admonitionType) {
							const admonitionConfig: Record<string, { class: string; icon: string }> = {
								note: { class: '_admonitionNote_cdebt_25', icon: 'ℹ️' },
								tip: { class: '_admonitionTip_cdebt_29', icon: '💡' },
								info: { class: '_admonitionInfo_cdebt_33', icon: 'ℹ️' },
								caution: { class: '_admonitionCaution_cdebt_37', icon: '⚠️' },
								danger: { class: '_admonitionDanger_cdebt_41', icon: '🔥' },
								warning: { class: '_admonitionWarning_cdebt_45', icon: '⚠️' },
							};

							const config = admonitionConfig[admonitionType] || admonitionConfig.note;

							return <div className={cn('_admonitionContainer_cdebt_13', config.class, 'p-4 rounded-lg border-l-4')}>{children}</div>;
						}

						// Handle link buttons
						if (className?.includes('mdxeditor-link-button-wrapper')) {
							const href = props['data-href'] || '#';
							const target = props['data-target'] || '_self';
							const rel = props['data-rel'];
							const color = props['data-color'] || 'white';
							const bg = props['data-bg'] || '#1b2942';
							const customStyle = props['data-style'] || '';

							return (
								<div className="flex justify-center">
									<a
										href={href}
										target={target}
										rel={rel}
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: bg,
											color: color,
											borderRadius: '6px',
											padding: '8px 24px',
											textDecoration: 'none',
											fontSize: '18px',
											cursor: 'pointer',
											transition: 'opacity 0.2s',
											border: 'none',
											...parseStyle(customStyle),
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.opacity = '0.9';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.opacity = '1';
										}}>
										{children}
									</a>
								</div>
							);
						}

						return (
							<div
								className={className}
								{...props}>
								{children}
							</div>
						);
					},

					// Regular links only
					a({ href, children, ...props }: any) {
						return (
							<a
								href={href}
								className="text-blue-600 hover:underline"
								target="_blank"
								rel="noopener noreferrer">
								{children}
							</a>
						);
					},

					// Code blocks - simple styling
					code({ node, className, children, ...props }: any) {
						const match = /language-(\w+)/.exec(className || '');
						return match ? (
							<pre className="bg-gray-900 text-gray-100 rounded-md my-4 p-4 overflow-x-auto">
								<code
									className={`language-${match[1]} text-sm font-mono`}
									{...props}>
									{children}
								</code>
							</pre>
						) : (
							<code
								className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600"
								{...props}>
								{children}
							</code>
						);
					},

					// Headers - matching MDXEditor
					h1: ({ children, style }: any) => (
						<h1
							className="text-3xl font-bold leading-tight"
							style={parseStyle(style)}>
							{children}
						</h1>
					),
					h2: ({ children, style }: any) => (
						<h2
							className="text-2xl font-bold leading-tight"
							style={parseStyle(style)}>
							{children}
						</h2>
					),
					h3: ({ children, style }: any) => (
						<h3
							className="text-xl font-bold leading-tight"
							style={parseStyle(style)}>
							{children}
						</h3>
					),
					h4: ({ children, style }: any) => (
						<h4
							className="text-lg font-semibold"
							style={parseStyle(style)}>
							{children}
						</h4>
					),
					h5: ({ children, style }: any) => (
						<h5
							className="text-base font-semibold"
							style={parseStyle(style)}>
							{children}
						</h5>
					),
					h6: ({ children, style }: any) => (
						<h6
							className="text-sm font-semibold"
							style={parseStyle(style)}>
							{children}
						</h6>
					),

					// Paragraphs - no default margin
					p: ({ node, children, ...props }: any) => (
						<p
							className="leading-relaxed"
							{...props}
							style={parseStyle(props.style)}>
							{children}
						</p>
					),

					span: ({ node, children, ...props }: any) => (
						<span
							{...props}
							style={parseStyle(props.style)}>
							{children}
						</span>
					),

					ins: ({ node, children, ...props }: any) => (
						<ins
							{...props}
							style={parseStyle(props.style)}>
							{children}
						</ins>
					),

					// Lists - matching MDXEditor
					ul: ({ children }) => <ul className="list-disc list-outside">{children}</ul>,
					ol: ({ children }) => <ol className="list-decimal list-outside">{children}</ol>,
					li: ({ children }) => <li className="leading-relaxed">{children}</li>,

					// Blockquotes - matching MDXEditor
					blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 italic text-gray-700">{children}</blockquote>,

					// Tables - matching MDXEditor
					table: ({ children }) => (
						<div className="overflow-x-auto">
							<table className="min-w-full border-collapse">{children}</table>
						</div>
					),
					thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
					tbody: ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>,
					tr: ({ children }) => <tr>{children}</tr>,
					th: ({ children }) => <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border border-gray-300">{children}</th>,
					td: ({ children }) => <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">{children}</td>,

					// Images - matching MDXEditor
					img: ({ src, alt }) => (
						<img
							src={src}
							alt={alt}
							className="max-w-full h-auto"
						/>
					),

					// Horizontal rule
					hr: () => <hr className="border-t border-gray-300" />,

					// Text formatting
					strong: ({ children }) => <strong className="font-bold">{children}</strong>,
					em: ({ children }) => <em className="italic">{children}</em>,
					del: ({ children }) => <del className="line-through">{children}</del>,

					// Task lists
					input: ({ type, checked, ...props }) => {
						if (type === 'checkbox') {
							return (
								<input
									type="checkbox"
									checked={checked}
									disabled
									className="mr-2 align-middle"
									{...props}
								/>
							);
						}
						return (
							<input
								type={type}
								{...props}
							/>
						);
					},
				}}>
				{content}
			</ReactMarkdown>

			{/* Additional CSS for exact MDXEditor matching */}
			<style>{`
				.mdxeditor-preview {
					font-family:
						system-ui,
						-apple-system,
						BlinkMacSystemFont,
						'Segoe UI',
						Roboto,
						sans-serif;
					font-size: 16px;
					line-height: 1.6;
					color: #24292e;
				}

				/* Remove all default margins */
				.mdxeditor-preview * {
					margin: 0;
					padding: 0;
				}

				/* Re-add only explicit margins for elements that need them */
				.mdxeditor-preview h1 {
					margin-top: 1.5rem;
					margin-bottom: 1rem;
				}

				.mdxeditor-preview h2 {
					margin-top: 1.25rem;
					margin-bottom: 0.75rem;
				}

				.mdxeditor-preview h3 {
					margin-top: 1rem;
					margin-bottom: 0.5rem;
				}

				.mdxeditor-preview h4 {
					margin-top: 0.75rem;
					margin-bottom: 0.5rem;
				}

				.mdxeditor-preview h5,
				.mdxeditor-preview h6 {
					margin-top: 0.5rem;
					margin-bottom: 0.25rem;
				}


				.mdxeditor-preview ul,
				.mdxeditor-preview ol {
					margin-bottom: 1rem;
					padding-left: 1.5rem;
				}

				.mdxeditor-preview li {
					margin-bottom: 0.25rem;
				}

				.mdxeditor-preview blockquote {
					margin: 1rem 0;
					padding-left: 1rem;
				}

				.mdxeditor-preview table {
					margin: 1rem 0;
				}

				.mdxeditor-preview hr {
					margin: 1.5rem 0;
				}

				.mdxeditor-preview img {
					margin: 1rem 0;
				}

				.mdxeditor-preview pre,
				.mdxeditor-preview code {
					margin: 0;
				}

				/* Admonition base styles */
				._admonitionContainer_cdebt_13 {
					border-left-width: 4px;
					border-radius: 8px;
					padding: 1rem;
					margin: 1rem 0;
				}

				/* Note admonition */
				._admonitionNote_cdebt_25 {
					background-color: #e7f2ff;
					border-left-color: #0969da;
				}

				/* Tip admonition */
				._admonitionTip_cdebt_29 {
					background-color: #dafbe1;
					border-left-color: #1a7f37;
				}

				/* Info admonition */
				._admonitionInfo_cdebt_33 {
					background-color: #edf2ff;
					border-left-color: #6639ba;
				}

				/* Caution admonition */
				._admonitionCaution_cdebt_37 {
					background-color: #fff8c5;
					border-left-color: #bf8700;
				}

				/* Danger admonition */
				._admonitionDanger_cdebt_41 {
					background-color: #ffebe9;
					border-left-color: #cf222e;
				}

				/* Warning admonition */
				._admonitionWarning_cdebt_45 {
					background-color: #fff5e7;
					border-left-color: #fb8500;
				}
			`}</style>
		</div>
	);
};
