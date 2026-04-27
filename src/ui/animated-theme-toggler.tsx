'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@uikit/lib/utils';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useUikitProvider } from '@uikit/hooks/provider';
import { Button, ButtonProps } from '@uikit/ui/button';

type AnimatedThemeTogglerProps = Omit<ButtonProps, 'onClick'> & {
	duration?: number;
	label?: string;
};

export const AnimatedThemeToggler = ({ className, label, duration = 400, ...props }: AnimatedThemeTogglerProps) => {
	const { setTheme, theme } = useUikitProvider();
	const [isDark, setIsDark] = useState(theme === 'dark');
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const updateTheme = () => {
			setIsDark(document.documentElement.classList.contains('dark'));
		};

		updateTheme();

		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	const toggleTheme = useCallback(async () => {
		if (!buttonRef.current) return;

		await document.startViewTransition(() => {
			flushSync(() => {
				const newTheme = !isDark;
				setIsDark(newTheme);
				document.documentElement.classList.toggle('dark');
				setTheme(newTheme ? 'dark' : 'light');
			});
		}).ready;

		const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top));

		document.documentElement.animate(
			{
				clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
			},
			{
				duration,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)',
			},
		);
	}, [isDark, duration]);

	return (
		<Button
			radius={'full'}
			mode={'icon'}
			variant={'dashed'}
			color={'secondary'}
			ref={buttonRef}
			onClick={toggleTheme}
			className={cn('cursor-pointer overflow-hidden', className)}
			{...props}>
			{isDark ? <SunIcon /> : <MoonIcon />}
			<span className={cn({ 'sr-only': !label })}>{label || 'Toggle theme'}</span>
		</Button>
	);
};
