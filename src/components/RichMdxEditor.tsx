// src/components/RichMdxEditor.tsx
// Lazy shell — the exported component. All heavy imports (@mdxeditor/editor,
// lexical, @lexical/*, codemirror via codeMirrorPlugin, mdxeditor css) live in
// RichMdxEditorImpl and load on first render, not on kit import.
import React, { lazy, Suspense } from 'react';
import type { JsxComponentDescriptor } from '@mdxeditor/editor';
import { cn } from '../lib/utils';
import type { FormFieldProps } from '../ui/form-field';
import type { FieldControlProps } from '../ui/field';
import type { TemplateUserValue } from '../schema';

type MdxEditorProps = Pick<FieldControlProps, 'defaultValue' | 'onValueChange' | 'value' | 'readOnly'>;

export type ToolbarNames =
	| 'undoRedo'
	| 'boldItalicUnderline'
	| 'blockTypeSelect'
	| 'listsToggle'
	| 'insertAdmonition'
	| 'insertCodeBlock'
	| 'insertImage'
	| 'insertTable'
	| 'insertThematicBreak'
	| 'alignmentToggles'
	| 'insertLinkButton'
	| 'colorToggles'
	| 'userValues';

export type RichMdxEditorProps = Omit<FormFieldProps, 'children' | 'onChange'> &
	Pick<FieldControlProps, keyof MdxEditorProps> & {
	placeholder?: string;
	items?: TemplateUserValue[];
	editorProps?: {
		jsxComponentDescriptors?: JsxComponentDescriptor[];
	};
	classNames?: {
		editor?: string;
		wrapper?: string;
		content?: string;
	};
	inputProps?: Omit<FieldControlProps, keyof MdxEditorProps>;
	onChange?: (markdown: string) => void;
	hide?: ToolbarNames[];
};

const RichMdxEditorImpl = lazy(() => import('./RichMdxEditorImpl').then((m) => ({ default: m.RichMdxEditorImpl })));

const RichMdxEditor: React.FC<RichMdxEditorProps> = (props) => {
	return (
		<Suspense
			fallback={
				<div className={cn('size-full', props.classNames?.wrapper)}>
					<div className={cn('markdown-content min-h-75 max-h-100 rounded-md border bg-muted/30 animate-pulse', props.classNames?.content)} />
				</div>
			}>
			<RichMdxEditorImpl {...props} />
		</Suspense>
	);
};

export { RichMdxEditor };