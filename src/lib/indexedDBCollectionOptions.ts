import localforage from 'localforage';

export interface IndexedDBCollectionOptions<T> {
	id: string;
	storageKey?: string;
	dbName?: string;
	getKey: (item: T) => string;
	onInsert?: (ctx: any) => Promise<void> | void;
	onUpdate?: (ctx: any) => Promise<void> | void;
	onDelete?: (ctx: any) => Promise<void> | void;
}

export function indexedDBCollectionOptions<T>(options: IndexedDBCollectionOptions<T>) {
	const storageKey = options.storageKey || options.id;

	// Create an isolated IndexedDB instance for this specific collection
	const store = localforage.createInstance({
		name: options.dbName || 'UiKitDB', // You can rename this to your app's name
		storeName: storageKey,
	});

	// The in-memory state required by TanStack DB's sync config
	let memoryState: T[] = [];

	return {
		id: options.id,
		getKey: options.getKey,

		// Satisfy TanStack DB's requirement for synchronous memory operations
		sync: {
			read: () => memoryState,
			write: (items: T[]) => {
				memoryState = items;
			},
		},

		// Intercept TanStack DB mutations, save to IndexedDB, then call custom hooks
		onInsert: async (ctx: any) => {
			const { changes, key } = ctx.transaction.mutations[0];
			await store.setItem(key, changes);
			if (options.onInsert) await options.onInsert(ctx);
		},

		onUpdate: async (ctx: any) => {
			const { modified, key } = ctx.transaction.mutations[0];
			await store.setItem(key, modified);
			if (options.onUpdate) await options.onUpdate(ctx);
		},

		onDelete: async (ctx: any) => {
			const { key } = ctx.transaction.mutations[0];
			await store.removeItem(key);
			if (options.onDelete) await options.onDelete(ctx);
		},
	};
}

/**
 * Utility function to load data from IndexedDB into the collection on startup.
 * Call this once when your app or provider mounts.
 */
export async function hydrateIndexedDBCollection(collection: any, storageKey: string, dbName: string = 'UiKitDB') {
	const store = localforage.createInstance({
		name: dbName,
		storeName: storageKey,
	});

	const items: any[] = [];
	await store.iterate((value) => {
		items.push(value);
	});

	if (items.length > 0) {
		items.forEach((item) => collection.insert(item));
	}
}