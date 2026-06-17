import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import { InputVariant } from '../lib/variants';

type Theme = 'dark' | 'light' | 'system';

type UiKitProviderProps = {
	prefix?: string;
	children: React.ReactNode;
	defaultTheme?: Theme;
	inputVariant?: InputVariant
	storageKey?: string;
};
type UiKitProviderState = {
	prefix?: string;
	theme: Theme;
	inputVariant?: InputVariant
	setTheme: (theme: Theme) => void;
};
const initialProps: UiKitProviderState = {
	prefix: 'uikit-',
	theme: 'system',
	inputVariant: 'outlined',
	setTheme: () => null,
};
const UiKitProviderContext = createContext<UiKitProviderState>(initialProps);

const UiKitProvider: React.FC<UiKitProviderProps> = ({
	                                                     children,
	                                                     defaultTheme = 'system',
	                                                     storageKey = 'app-theme',
	                                                     prefix = 'uikit-',
	                                                     inputVariant = 'outlined',
	                                                     ...props
                                                     }) => {
	const [theme, setTheme] = useLocalStorage<Theme>({
		defaultValue: defaultTheme,
		key: storageKey,
	});
	// const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove('light', 'dark');

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	return (
		<UiKitProviderContext.Provider
			{...props}
			value={{
				prefix,
				theme,
				inputVariant,
				setTheme: (theme: Theme) => {
					localStorage.setItem(storageKey, theme);
					setTheme(theme);
				},
			}}>
			{children}
		</UiKitProviderContext.Provider>
	);
};

const useUikitProvider = () => {
	const context = useContext(UiKitProviderContext);

	if (context === undefined) throw new Error('useUikitProvider must be used within a UiKitProvider');

	return context;
};

export { UiKitProvider, useUikitProvider };
