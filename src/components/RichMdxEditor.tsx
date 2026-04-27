import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	activeEditor$,
	addExportVisitor$,
	addImportVisitor$,
	AdmonitionDirectiveDescriptor,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	codeBlockPlugin,
	codeMirrorPlugin,
	ConditionalContents,
	diffSourcePlugin,
	DiffSourceToggleWrapper,
	DirectiveDescriptor,
	DirectiveEditorProps,
	directivesPlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	InsertAdmonition,
	InsertCodeBlock,
	insertDirective$,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	JsxComponentDescriptor,
	jsxPlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	ListsToggle,
	markdownShortcutPlugin,
	MDXEditor,
	MDXEditorMethods,
	NestedLexicalEditor,
	quotePlugin,
	searchPlugin,
	Separator,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
	useCellValue,
	useMdastNodeUpdater,
	usePublisher,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { Tooltip } from '@uikit/ui/tooltip';
import { Button } from '@uikit/ui/button';
import { Popover } from '@uikit/ui/popover';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Baseline, Highlighter, MousePointer2, SettingsIcon, Variable } from 'lucide-react';
import { cn, parseStyle } from '@uikit/lib/utils';
import { FormField, FormFieldProps } from '@uikit/ui/form-field';
import { Field, FieldControlProps } from '@uikit/ui/field';
import { Dialog } from '@uikit/ui/dialog';
import { TextInput } from '@uikit/ui/text-input';
import { FieldTypes, TemplateUserValue } from '@uikit/schema';
import { uniqBy } from 'lodash-es';
import { $createParagraphNode, $getSelection, $isRangeSelection, ElementFormatType, FORMAT_ELEMENT_COMMAND } from 'lexical';
import { $createHeadingNode, HeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $patchStyleText } from '@lexical/selection';

type MdxEditorProps = Pick<FieldControlProps, 'defaultValue' | 'onValueChange' | 'value' | 'readOnly'>;

type RichMdxEditorProps = Omit<FormFieldProps, 'children' | 'onChange'> &
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
	};

const DEFAULT_LINK_BUTTON_STYLE =
	'display: flex; align-items: center; justify-content: center; border-radius: 6px; cursor: pointer; ' +
	'width: fit-content; margin: 0 auto; color: white; backgroundColor: #1b2942; padding: 8px 24px; text-decoration: unset; font-size: 18px;';

// Predefined autocomplete suggestions
// const DEFAULT_SUGGESTIONS: TemplateUserValue[] = [
// 	// Variables
// 	// { trigger: '..name', param: '{{name}}', description: 'Name Variable' },
//
// 	// Snippets
// 	// { trigger: '/regards', param: 'Best regards,\n[Your Name]', description: 'Email closing' },
//
// 	// Templates
// 	// { trigger: '/note', param: ':::note\n📝 **Note:** \n:::', description: 'Note admonition', label: '', path: '' },
// 	// { trigger: '/tip', param: ':::tip\n💡 **Tip:** \n:::', description: 'Tip admonition', label: '', path: '' },
// 	{
// 		trigger: '/linkButton',
// 		param: `:::linkButton{bg="#1b2942" color="white" style="${DEFAULT_LINK_BUTTON_STYLE}" href=''}
// **Link Button:**
// :::`,
// 		description: 'Link Button admonition',
// 		label: '',
// 		path: '',
// 	},
//
// 	// Code snippets
// 	// { trigger: '/js', param: '```javascript\nconst example = "Hello";\nconsole.log(example);\n```', description: 'JavaScript code block' },
// 	// { trigger: '/ts', param: '```typescript\nconst example: string = "Hello";\nconsole.log(example);\n```', description: 'TypeScript code block' },
// 	// { trigger: '/py', param: '```python\nprint("Hello World")\n```', description: 'Python code block' },
// 	// { trigger: '/html', param: '```html\n<div>\n  <h1>Hello World</h1>\n</div>\n```', description: 'HTML code block' },
// 	// { trigger: '/css', param: '```css\n.example {\n  color: red;\n}\n```', description: 'CSS code block' },
// 	// { trigger: '/json', param: '```json\n{\n  "key": "value"\n}\n```', description: 'JSON code block' },
// ];

const addLinkCommands = (items: TemplateUserValue[]) => {
	const links = items
		.filter((item) => item.type === FieldTypes.Link)
		.map((link) => ({
			...link,
			trigger: `/${link.path}`,
			param: `:::linkButton{bg="#1b2942" color="white" style="${DEFAULT_LINK_BUTTON_STYLE}" href='${link.param}' target='_blank'}
**${link.label}**
:::`,
			description: link.description || `${link.label} Button ${link.param}`,
		}));
	return uniqBy([...items, ...links], 'trigger');
};

const LinkButtonEditor: React.FC<DirectiveEditorProps> = (props) => {
	const { bg, color, style, target, href } = props.mdastNode.attributes || {};
	const updateMdastNode = useMdastNodeUpdater();
	const [isOpen, setIsOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		href: (href as string) || '',
		color: (color as string) || 'white',
		bg: (bg as string) || '#1b2942',
		style: (style as string) || DEFAULT_LINK_BUTTON_STYLE,
		target: (target as string) || '',
	});

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setFormValues({
			href: (href as string) || '',
			color: (color as string) || 'white',
			bg: (bg as string) || '#1b2942',
			style: (style as string) || DEFAULT_LINK_BUTTON_STYLE,
			target: (target as string) || '',
		});
	}, [href, color, bg, style, target]);

	const handleInputChange = (field: string, value: string) => {
		setFormValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		updateMdastNode({
			attributes: formValues,
		});
		setIsOpen(false);
	};

	const handleCancel = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setFormValues({
			href: (href as string) || '',
			color: (color as string) || 'white',
			bg: (bg as string) || '#1b2942',
			style: (style as string) || DEFAULT_LINK_BUTTON_STYLE,
			target: (target as string) || '',
		});
		setIsOpen(false);
	};

	return (
		<a
			href={href as string}
			target={target as string}
			rel="noopener noreferrer nofollow"
			onClick={(e) => e.preventDefault()}
			data-type="button-link-node"
			className="group relative"
			style={{ ...parseStyle(style as string), ...(color ? { color } : {}), ...(bg ? { backgroundColor: bg } : {}) }}>
			<NestedLexicalEditor
				getContent={(node: any) => node.children}
				getUpdatedMdastNode={(node: any, children: any) => ({ ...node, children })}
			/>
			<div
				className={
					'absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none group-hover:pointer-events-auto'
				}>
				<Button
					type="button"
					size="xs"
					variant="ghost"
					mode="icon"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setIsOpen(true);
					}}
					className="bg-white shadow-md hover:bg-gray-100">
					<SettingsIcon className="size-3.5" />
				</Button>
			</div>

			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}>
				<Dialog.Content className={'max-w-100 md:px-8'}>
					<Dialog.Header>
						<Dialog.Title>LinkButton Attributes</Dialog.Title>
					</Dialog.Header>
					<Dialog.Body className="space-y-4">
						<TextInput
							label="href"
							value={formValues.href}
							onValueChange={(v) => handleInputChange('href', v)}
							placeholder="https://example.com"
						/>
						<TextInput
							label="color"
							value={formValues.color}
							onValueChange={(v) => handleInputChange('color', v)}
							placeholder="white"
						/>
						<TextInput
							label="bg"
							value={formValues.bg}
							onValueChange={(v) => handleInputChange('bg', v)}
							placeholder="#1b2942"
						/>
						<TextInput
							label="style"
							value={formValues.style}
							onValueChange={(v) => handleInputChange('style', v)}
							placeholder="CSS styles"
						/>
						<TextInput
							label="target"
							value={formValues.target}
							onValueChange={(v) => handleInputChange('target', v)}
							placeholder="_blank"
						/>
					</Dialog.Body>
					<Dialog.Footer>
						<Button
							variant="outline"
							onClick={handleCancel}>
							Cancel
						</Button>
						<Button onClick={handleSave}>Save</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog>
		</a>
	);
};

const LINK_BUTTON_DIRECTIVE_DESCRIPTOR: DirectiveDescriptor = {
	name: 'linkButton',
	testNode(node) {
		return node.name === 'linkButton';
	},
	attributes: ['href', 'color', 'bg', 'style', 'target'],
	hasChildren: true,
	type: 'containerDirective',
	Editor: LinkButtonEditor,
};

/**
 * Plugin to handle alignment using style attributes on p and h tags
 * This ensures that Lexical's native alignment is exported as MDX/JSX style
 */
const alignmentPlugin = () => {
	return {
		init(realm: any) {
			realm.pub(addExportVisitor$, [
				{
					testLexicalNode: (node: any) =>
						(node.getType() === 'paragraph' || node.getType() === 'heading') && !['', 'left'].includes(node.getFormatType()),
					visitLexicalNode: ({ lexicalNode, actions }: any) => {
						const alignment = lexicalNode.getFormatType();
						const isHeading = lexicalNode.getType() === 'heading';
						const tag = isHeading ? (lexicalNode as HeadingNode).getTag() : 'p';

						actions.addAndStepInto('mdxJsxFlowElement', {
							name: tag,
							attributes: [{ type: 'mdxJsxAttribute', name: 'style', value: `text-align: ${alignment}` }],
						});
					},
					priority: 10,
				},
			]);

			realm.pub(addImportVisitor$, [
				{
					testNode: (node: any) => node.type === 'mdxJsxFlowElement' && ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.name),
					visitNode: ({ mdastNode, actions }: any) => {
						const styleAttr = (mdastNode.attributes as any)?.find((a: any) => a.name === 'style');
						const style = styleAttr?.value || '';
						const alignmentMatch = style.match(/text-align:\s*(center|right|justify|left|start|end)/i);
						const alignment = alignmentMatch ? alignmentMatch[1].toLowerCase() : '';

						let node;
						if (mdastNode.name === 'p') {
							node = $createParagraphNode();
						} else {
							node = $createHeadingNode(mdastNode.name as HeadingTagType);
						}

						if (alignment) {
							node.setFormat(alignment as ElementFormatType);
						}

						actions.addAndStepInto(node);
						actions.visitChildren(mdastNode, node);
					},
					priority: 10,
				},
			]);
		},
	};
};

const InsertLinkButton: React.FC = () => {
	const insertDirective = usePublisher(insertDirective$);
	return (
		<Tooltip>
			<Tooltip.Trigger
				render={
					<Button
						type="button"
						size="xs"
						variant="ghost"
						mode="icon"
						title="Insert Link Button"
						onClick={() =>
							insertDirective({
								name: 'linkButton',
								type: 'containerDirective',
								attributes: { href: '', color: 'white', bg: '#1b2942', style: DEFAULT_LINK_BUTTON_STYLE },
								children: [{ type: 'text', value: 'Button text' }],
							} as any)
						}
						className="h-7 w-7">
						<MousePointer2 className="h-4 w-4" />
					</Button>
				}
			/>
			<Tooltip.Content>Insert Link Button</Tooltip.Content>
		</Tooltip>
	);
};

const AlignmentToggles: React.FC = () => {
	const editor = useCellValue(activeEditor$);
	const [currentAlignment, setCurrentAlignment] = useState<string>('left');

	useEffect(() => {
		if (!editor) return;
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					const node = selection.anchor.getNode();
					const element = node.getTopLevelElement();
					if (element) {
						setCurrentAlignment(element.getFormatType() || 'left');
					}
				}
			});
		});
	}, [editor]);

	const alignments = [
		{ id: 'left', title: 'Align Left', icon: AlignLeft },
		{ id: 'center', title: 'Align Center', icon: AlignCenter },
		{ id: 'right', title: 'Align Right', icon: AlignRight },
		{ id: 'justify', title: 'Justify', icon: AlignJustify },
	];

	const handleAlignment = (alignment: string) => {
		if (!editor) return;
		editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment as ElementFormatType);
	};

	return (
		<>
			{alignments.map((align) => (
				<Tooltip key={align.id}>
					<Tooltip.Trigger
						render={
							<Button
								type="button"
								size="xs"
								appearance={currentAlignment === align.id ? 'default' : 'ghost'}
								mode="icon"
								variant={'ghost'}
								title={align.title}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => handleAlignment(align.id)}
								className="h-7 w-7">
								<align.icon className="h-4 w-4" />
							</Button>
						}
					/>
					<Tooltip.Content>{align.title}</Tooltip.Content>
				</Tooltip>
			))}
		</>
	);
};

const PRESET_COLORS = [
	'#000000',
	'#ffffff',
	'#ef4444',
	'#f97316',
	'#f59e0b',
	'#eab308',
	'#84cc16',
	'#22c55e',
	'#10b981',
	'#14b8a6',
	'#06b6d4',
	'#0ea5e9',
	'#3b82f6',
	'#6366f1',
	'#8b5cf6',
	'#a855f7',
	'#d946ef',
	'#ec4899',
	'#f43f5e',
	'#71717a',
];

const ColorToggles: React.FC = () => {
	const editor = useCellValue(activeEditor$);

	const applyColor = (color: string) => {
		editor?.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				$patchStyleText(selection, { color });
			}
		});
	};

	const applyBgColor = (backgroundColor: string) => {
		editor?.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				$patchStyleText(selection, { 'background-color': backgroundColor });
			}
		});
	};

	const clearStyle = () => {
		editor?.update(() => {
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				$patchStyleText(selection, { color: null, 'background-color': null });
			}
		});
	};

	const ColorGrid = ({ onSelect }: { onSelect: (color: string) => void }) => (
		<div className="p-3">
			<div className="grid grid-cols-5 gap-1 mb-3">
				{PRESET_COLORS.map((color) => (
					<button
						key={color}
						type="button"
						className="w-6 h-6 rounded-md border border-gray-200 transition-transform hover:scale-110 active:scale-95"
						style={{ backgroundColor: color }}
						onClick={() => onSelect(color)}
						title={color}
					/>
				))}
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-xs font-medium text-gray-500">Custom Color</label>
				<input
					type="color"
					className="w-full h-8 cursor-pointer rounded-md border-none p-0"
					onChange={(e) => onSelect(e.target.value)}
				/>
			</div>
		</div>
	);

	return (
		<div className="flex items-center gap-0.5">
			<Popover>
				<Tooltip>
					<Tooltip.Trigger
						render={
							<Popover.Trigger
								render={
									<Button
										type="button"
										size="xs"
										variant="ghost"
										mode="icon"
										onMouseDown={(e) => e.preventDefault()}
										className="h-7 w-7">
										<Baseline className="h-4 w-4" />
									</Button>
								}
							/>
						}
					/>
					<Tooltip.Content>Text Color</Tooltip.Content>
				</Tooltip>
				<Popover.Content className="w-44 p-0">
					<ColorGrid onSelect={applyColor} />
				</Popover.Content>
			</Popover>

			<Popover>
				<Tooltip>
					<Tooltip.Trigger
						render={
							<Popover.Trigger
								render={
									<Button
										type="button"
										size="xs"
										variant="ghost"
										mode="icon"
										onMouseDown={(e) => e.preventDefault()}
										className="h-7 w-7">
										<Highlighter className="h-4 w-4" />
									</Button>
								}
							/>
						}
					/>
					<Tooltip.Content>Background Color</Tooltip.Content>
				</Tooltip>
				<Popover.Content className="w-44 p-0">
					<ColorGrid onSelect={applyBgColor} />
				</Popover.Content>
			</Popover>

			<Tooltip>
				<Tooltip.Trigger
					render={
						<Button
							type="button"
							size="xs"
							variant="ghost"
							mode="icon"
							onMouseDown={(e) => e.preventDefault()}
							onClick={clearStyle}
							className="h-7 w-7 group">
							<div className="relative">
								<Baseline className="h-4 w-4" />
								<div
									className={
										'absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full w-2.5 h-2.5 flex items-center justify-center border border-white'
									}>
									<span className="text-[7px] font-bold leading-none">×</span>
								</div>
							</div>
						</Button>
					}
				/>
				<Tooltip.Content>Clear Color</Tooltip.Content>
			</Tooltip>
		</div>
	);
};

const UserValues: React.FC<{
	items: TemplateUserValue[];
	onSelect: (item: TemplateUserValue) => void;
}> = ({ items, onSelect }) => {
	return (
		<Popover>
			<Tooltip>
				<Tooltip.Trigger
					render={
						<Popover.Trigger
							render={
								<Button
									type="button"
									size="xs"
									variant="ghost"
									mode="icon"
									onMouseDown={(e) => e.preventDefault()}
									className="h-7 w-7">
									<Variable className="h-4 w-4" />
								</Button>
							}
						/>
					}
				/>
				<Tooltip.Content>User Variable</Tooltip.Content>
			</Tooltip>
			<Popover.Content className="w-75 h-100">
				<div className="flex flex-col gap-1">
					{items.map((item, index) => (
						<div
							key={`${item.trigger}-${index}`}
							className={
								'flex gap-1 p-1 rounded-lg cursor-pointer transition-all items-center hover:bg-gray-50 border-2 border-transparent justify-center'
							}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => onSelect(item)}>
							<div className="shrink-0 bg-blue-600 text-white p-1 my-auto rounded-md font-mono text-xs font-semibold self-start">{item.trigger}</div>
							<div className="flex-1 min-w-0">
								<div className="font-mono text-sm text-gray-900 truncate font-medium">
									{item.label.substring(0, 50)}
									{item.label.length > 50 ? '...' : ''}
								</div>
								<div className="text-xs text-gray-600 mt-1">{item.description || item.param}</div>
							</div>
						</div>
					))}
				</div>
			</Popover.Content>
		</Popover>
	);
};

// Autocomplete Suggestions Component
const AutocompleteSuggestions: React.FC<{
	items: TemplateUserValue[];
	selectedIndex: number;
	onSelect: (suggestion: TemplateUserValue) => void;
	onHover: (index: number) => void;
	onClose: () => void;
}> = ({ items, selectedIndex, onSelect, onHover, onClose }) => {
	if (items.length === 0) return null;

	return (
		<div
			className={`fixed bottom-5 right-5 w-112.5 max-w-[90vw] max-h-100 bg-white rounded-xl shadow-2xl z-9999 overflow-hidden
				animate-slide-up border border-gray-200`}>
			<div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-3 flex justify-between items-center">
				<span className={'font-semibold text-sm'}>💡 Suggestions</span>
				<div className="flex items-center gap-2">
					<span className="text-xs opacity-90 hidden sm:block">↑↓ • Enter/Tab • Esc</span>
					<button
						onClick={onClose}
						className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
						title="Close suggestions">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<line
								x1="18"
								y1="6"
								x2="6"
								y2="18"></line>
							<line
								x1="6"
								y1="6"
								x2="18"
								y2="18"></line>
						</svg>
					</button>
				</div>
			</div>
			<div className="max-h-87.5 overflow-y-auto p-2">
				{items.map((item, index) => (
					<div
						key={`${item.trigger}-${index}`}
						className={`flex gap-3 p-3 m-1 rounded-lg cursor-pointer transition-all items-center ${
							index === selectedIndex ? 'bg-blue-50 border-2 border-blue-400' : 'hover:bg-gray-50 border-2 border-transparent'
						}`}
						onMouseDown={(e) => e.preventDefault()}
						onClick={() => onSelect(item)}
						onMouseEnter={() => onHover(index)}>
						<div className="shrink-0 bg-blue-600 text-white px-2.5 py-1.5 rounded-md font-mono text-xs font-semibold self-start">{item.trigger}</div>
						<div className="flex-1 min-w-0">
							<div className="font-mono text-sm text-gray-900 truncate font-medium">
								{item.label.substring(0, 50)}
								{item.label.length > 50 ? '...' : ''}
							</div>
							<div className="text-xs text-gray-600 mt-1">{item.description || item.param}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const RichMdxEditor: React.FC<RichMdxEditorProps> = ({
	defaultValue,
	onValueChange,
	onChange,
	value,
	readOnly = false,
	inputProps,
	editorProps,
	items = [],
	classNames,
	...props
}) => {
	const editorRef = useRef<MDXEditorMethods>(null);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [filteredSuggestions, setFilteredSuggestions] = useState<TemplateUserValue[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [triggerInfo, setTriggerInfo] = useState<{ trigger: string; search: string } | null>(null);

	const initialContent = useMemo(() => (value ?? defaultValue ?? '') as string, [value, defaultValue]);

	const allSuggestions = addLinkCommands(items || []);

	const checkForTriggers = useCallback(
		(text: string) => {
			const lines = text.split('\n');
			const lastLine = lines[lines.length - 1];

			if (lastLine.includes('..')) {
				const lastDotIndex = lastLine.lastIndexOf('..');
				const afterDots = lastLine.substring(lastDotIndex + 2);

				if (lastDotIndex === lastLine.length - 2 || /^\w*$/.test(afterDots)) {
					const filtered = allSuggestions.filter(
						(s) =>
							s.trigger.startsWith('..') &&
							(s.trigger.toLowerCase().startsWith(('..' + afterDots).toLowerCase()) || s.param.toLowerCase().includes(afterDots.toLowerCase())),
					);

					if (filtered.length > 0) {
						setFilteredSuggestions(filtered);
						setTriggerInfo({ trigger: '..', search: afterDots });
						setShowSuggestions(true);
						setSelectedIndex(0);
						return;
					}
				}
			}

			const slashMatch = lastLine.match(/\/(\w*)$/);
			if (slashMatch) {
				const search = slashMatch[0];
				const filtered = allSuggestions.filter((s) => s.trigger.startsWith('/') && s.trigger.toLowerCase().startsWith(search.toLowerCase()));

				if (filtered.length > 0) {
					setFilteredSuggestions(filtered);
					setTriggerInfo({ trigger: '/', search });
					setShowSuggestions(true);
					setSelectedIndex(0);
					return;
				}
			}

			setShowSuggestions(false);
			setTriggerInfo(null);
		},
		[allSuggestions],
	);

	const insertSuggestion = useCallback(
		(suggestion: TemplateUserValue) => {
			if (!editorRef.current || !triggerInfo) return;

			const currentMarkdown = editorRef.current.getMarkdown();
			const lines = currentMarkdown.split('\n');
			const lastLineIndex = lines.length - 1;
			const lastLine = lines[lastLineIndex];

			let newLastLine: string;
			if (triggerInfo.trigger === '..') {
				newLastLine = lastLine.replace(/\.\.(\w*)$/, suggestion.param);
			} else if (triggerInfo.trigger === '/') {
				newLastLine = lastLine.replace(/\/\w*$/, suggestion.param);
			} else {
				newLastLine = lastLine;
			}

			lines[lastLineIndex] = newLastLine;
			const newMarkdown = lines.join('\n');

			setTimeout(() => {
				editorRef.current?.setMarkdown(newMarkdown);
			}, 0);

			setShowSuggestions(false);
			setTriggerInfo(null);
		},
		[triggerInfo],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!showSuggestions || filteredSuggestions.length === 0) return;

			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					e.stopPropagation();
					setSelectedIndex((prev) => (prev + 1) % filteredSuggestions.length);
					break;
				case 'ArrowUp':
					e.preventDefault();
					e.stopPropagation();
					setSelectedIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
					break;
				case 'Enter':
				case 'Tab':
					if (filteredSuggestions[selectedIndex]) {
						e.preventDefault();
						e.stopPropagation();
						insertSuggestion(filteredSuggestions[selectedIndex]);
					}
					break;
				case 'Escape':
					e.preventDefault();
					e.stopPropagation();
					setShowSuggestions(false);
					setTriggerInfo(null);
					break;
			}
		},
		[showSuggestions, filteredSuggestions, selectedIndex, insertSuggestion],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown, true);
		return () => document.removeEventListener('keydown', handleKeyDown, true);
	}, [handleKeyDown]);

	useEffect(() => {
		if (value !== undefined && editorRef.current && value !== editorRef.current.getMarkdown()) {
			editorRef.current.setMarkdown(value as string);
		}
	}, [value]);

	const handleCloseSuggestions = useCallback(() => {
		setShowSuggestions(false);
		setTriggerInfo(null);
	}, []);

	const handleChange = useCallback(
		(markdown: string): void => {
			checkForTriggers(markdown);
			// @ts-ignore
			onValueChange?.(markdown, null);
			onChange?.(markdown);
		},
		[onValueChange, onChange, checkForTriggers],
	);

	const handleUserValueSelect = useCallback((item: TemplateUserValue) => {
		editorRef.current?.focus();
		editorRef.current?.insertMarkdown(item.param);
	}, []);

	return (
		<>
			<FormField {...props}>
				<Field.Control
					value={value}
					className={'px-1'}
					render={
						<div className={cn('size-full', classNames?.wrapper)}>
							<MDXEditor
								ref={editorRef}
								markdown={initialContent}
								onChange={handleChange}
								readOnly={readOnly}
								contentEditableClassName={cn('markdown-content min-h-75 max-h-100 p-2 overflow-y-auto focus:outline-none', classNames?.content)}
								plugins={[
									// Core editing plugins
									headingsPlugin(),
									listsPlugin(),
									quotePlugin(),
									thematicBreakPlugin(),
									searchPlugin(),

									// Formatting plugins
									linkPlugin(),
									linkDialogPlugin(),
									imagePlugin({}),
									tablePlugin(),

									// Code plugins
									codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
									codeMirrorPlugin({
										codeBlockLanguages: {
											js: 'JavaScript',
											jsx: 'JSX',
											ts: 'TypeScript',
											tsx: 'TSX',
											javascript: 'JavaScript',
											typescript: 'TypeScript',
											python: 'Python',
											py: 'Python',
											html: 'HTML',
											css: 'CSS',
											json: 'JSON',
											xml: 'XML',
											sql: 'SQL',
											bash: 'Bash',
											shell: 'Shell',
											yaml: 'YAML',
											yml: 'YAML',
											markdown: 'Markdown',
											md: 'Markdown',
											java: 'Java',
											cpp: 'C++',
											c: 'C',
											csharp: 'C#',
											php: 'PHP',
											ruby: 'Ruby',
											go: 'Go',
											rust: 'Rust',
											swift: 'Swift',
											kotlin: 'Kotlin',
										},
									}),

									// Frontmatter plugin
									frontmatterPlugin(),

									// HTML/JSX support
									directivesPlugin({
										directiveDescriptors: [AdmonitionDirectiveDescriptor, LINK_BUTTON_DIRECTIVE_DESCRIPTOR],
									}),
									jsxPlugin({
										jsxComponentDescriptors: editorProps?.jsxComponentDescriptors ?? [],
									}),
									alignmentPlugin(),

									// Source view toggle
									diffSourcePlugin({
										viewMode: 'rich-text',
										diffMarkdown: initialContent,
									}),

									// Markdown shortcuts (like ## for h2, **bold**, etc.)
									markdownShortcutPlugin(),

									// Toolbar
									toolbarPlugin({
										toolbarClassName: 'md:[&_svg]:!size-5 !p-1 flex-wrap',
										toolbarContents: () => (
											<DiffSourceToggleWrapper>
												<UndoRedo />
												<Separator />
												<BoldItalicUnderlineToggles />
												<Separator />
												<AlignmentToggles />
												<Separator />
												<ColorToggles />
												<Separator />
												<BlockTypeSelect />
												{/*<Separator />*/}
												{/*<CreateLink />*/}
												<InsertImage />
												<Separator />
												<ListsToggle />
												<Separator />
												<InsertTable />
												<InsertThematicBreak />
												<ConditionalContents
													options={[
														{
															when: (editor) => editor?.editorType === 'codeblock',
															contents: () => <></>,
														},
														{
															fallback: () => (
																<>
																	<InsertCodeBlock />
																	<Separator />
																</>
															),
														},
													]}
												/>
												<InsertAdmonition />
												<InsertLinkButton />
												{/*<InsertFrontmatter />*/}
												{items.length > 0 ? (
													<>
														<Separator />
														<UserValues
															items={items}
															onSelect={handleUserValueSelect}
														/>
													</>
												) : null}
											</DiffSourceToggleWrapper>
										),
									}),
								]}
							/>
						</div>
					}
					{...inputProps}
				/>
			</FormField>
			{showSuggestions && (
				<AutocompleteSuggestions
					items={filteredSuggestions}
					selectedIndex={selectedIndex}
					onSelect={insertSuggestion}
					onHover={setSelectedIndex}
					onClose={handleCloseSuggestions}
				/>
			)}

			<style>{`
				@keyframes slide-up {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-slide-up {
					animation: slide-up 0.2s ease-out;
				}

				/* Set max height for source editor and diff view */
				.mdxeditor .cm-editor {
					max-height: 400px;
				}

				.mdxeditor .cm-scroller {
					max-height: 400px;
					overflow-y: auto;
				}

				/* Diff view max height */
				.mdxeditor [role="textbox"] {
					max-height: 400px;
					overflow-y: auto;
				}

				.mdxeditor [contenteditable="true"] h1,
				.mdxeditor [contenteditable="true"] h2,
				.mdxeditor [contenteditable="true"] h3,
				.mdxeditor [contenteditable="true"] h4,
				.mdxeditor [contenteditable="true"] h5,
				.mdxeditor [contenteditable="true"] h6,
				.mdxeditor [contenteditable="true"] p,
				.mdxeditor [contenteditable="true"] ul,
				.mdxeditor [contenteditable="true"] ol,
				.mdxeditor [contenteditable="true"] li,
				.mdxeditor [contenteditable="true"] blockquote,
				.mdxeditor [contenteditable="true"] table,
				.mdxeditor [contenteditable="true"] hr,
				.mdxeditor [contenteditable="true"] img,
				.mdxeditor [contenteditable="true"] div {
					margin-top: 0 !important;
					margin-bottom: 0 !important;
					margin-left: 0 !important;
					margin-right: 0 !important;
				}

				.mdxeditor .ContentEditable__root h1,
				.mdxeditor .ContentEditable__root h2,
				.mdxeditor .ContentEditable__root h3,
				.mdxeditor .ContentEditable__root h4,
				.mdxeditor .ContentEditable__root h5,
				.mdxeditor .ContentEditable__root h6,
				.mdxeditor .ContentEditable__root p,
				.mdxeditor .ContentEditable__root ul,
				.mdxeditor .ContentEditable__root ol,
				.mdxeditor .ContentEditable__root li,
				.mdxeditor .ContentEditable__root blockquote,
				.mdxeditor .ContentEditable__root div {
					margin: 0 !important;
				}

				/* Re-add only essential padding */
				.mdxeditor blockquote {
					padding-left: 1rem !important;
				}

				.mdxeditor ul,
				.mdxeditor ol {
					padding-left: 1.5rem !important;
				}

				.mdxeditor th,
				.mdxeditor td {
					padding: 0.5rem 1rem !important;
				}


				/* Admonitions - no margin */
				.mdxeditor ._admonitionContainer_cdebt_13 {
					margin: 0 !important;
					padding: 1rem !important;
				}
			`}</style>
		</>
	);
};

export { RichMdxEditor };
