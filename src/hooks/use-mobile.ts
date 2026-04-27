import { useMediaQuery } from '@uikit/hooks/use-media-query';

export function useIsMobile() {
	return useMediaQuery('only screen and (max-width : 768px)');
}
