import { ArrowUp } from 'lucide-react';
import { useWindowScroll } from '@uikit/hooks/use-window-scroll';
import { Affix } from '@uikit/ui/affix';
import { Button } from '@uikit/ui/button';
export const ScrollToTop = () => {
	const [scroll, scrollTo] = useWindowScroll();
	return (
		<>
			{/* Only show when scrolled down 200px */}
			{scroll.y > 200 && (
				<Affix position={{ bottom: 30, right: 30 }}>
					<Button
						size="icon"
						className="rounded-full shadow-lg"
						onClick={() => scrollTo({ y: 0 })}>
						<ArrowUp className="h-4 w-4" />
					</Button>
				</Affix>
			)}
		</>
	);
};
