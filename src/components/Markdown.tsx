import React, { lazy, Suspense } from 'react';
import { cn } from '../lib/utils';

export interface MarkdownPreviewProps {
	content: string;
	className?: string;
	maxHeight?: string;
}

const MarkdownImpl = lazy(() => import('./MarkdownImpl').then((m) => ({ default: m.MarkdownImpl })));

export const Markdown: React.FC<MarkdownPreviewProps> = (props) => {
	return (
		<Suspense
			fallback={
				<div
					data-html={'markdown-content'}
					className={cn('mdxeditor-preview markdown-content animate-pulse min-h-8', props.className)}
				/>
			}>
			<MarkdownImpl {...props} />
		</Suspense>
	);
};