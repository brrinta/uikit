import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Tooltip } from '../ui/tooltip';
import { cn } from '../lib/utils';
import { Flex, FlexProps } from '../ui/flex';

interface CopyButtonProps extends FlexProps {
	/** The string value to copy to clipboard */
	value: string;
	/** Duration in ms to show the checkmark after copying (default: 2000) */
	timeout?: number;
	/** Optional text to display in the tooltip when idle */
	tooltipText?: string;
}

export function CopyButton({ value, className, timeout = 2000, tooltipText = 'Copy to clipboard', children, ...props }: CopyButtonProps) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		if (!hasCopied) return;

		const t = setTimeout(() => {
			setHasCopied(false);
		}, timeout);

		return () => clearTimeout(t);
	}, [hasCopied, timeout]);

	const onCopy = (e: any) => {
		// e.preventDefault();
		// e.stopPropagation();

		// Copy to clipboard
		navigator?.clipboard?.writeText(value);
		setHasCopied(true);

		// Call original onClick if provided
		props.onClick?.(e as any);
	};

	return (
		<Tooltip>
			<Tooltip.Trigger
				render={
					<Flex
						className={cn('transition-all items-center gap-1 w-fit', className)}
						onClick={onCopy}
						{...props}>
						{children ? (
							hasCopied ? (
								<>
									<Check className="size-5 text-green-500 animate-in zoom-in-50 duration-300" />
									{children}
								</>
							) : (
								children
							)
						) : (
							<Copy className="h-4 w-4" />
						)}
						<span className="sr-only">Copy</span>
					</Flex>
				}
			/>
			<Tooltip.Content side="top">
				<p>{hasCopied ? 'Copied!' : tooltipText}</p>
			</Tooltip.Content>
		</Tooltip>
	);
}
