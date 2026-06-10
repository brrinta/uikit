// libs/shared/db/localforage-collection.ts
import localforage from 'localforage'
import type { SyncConfig } from '@tanstack/react-db'

type ChangeMessage<T> =
	| { type: 'insert' | 'update'; key: string; value: T }
	| { type: 'delete'; key: string; value: T }

export interface LocalForageCollectionConfig<T extends object> {
	id: string
	getKey: (item: T) => string
	/** localforage `name` (the IndexedDB database name) */
	dbName?: string
	/** localforage `storeName` (the object store) */
	storeName?: string
	/** Sync changes across tabs via BroadcastChannel (default: true) */
	crossTab?: boolean
	schema?: unknown
}

export function localForageCollectionOptions<T extends object>(
	config: LocalForageCollectionConfig<T>,
) {
	const {
		id,
		getKey,
		dbName = 'uikit-db',
		storeName = id,
		crossTab = true,
		schema,
	} = config

	const store = localforage.createInstance({
		name: dbName,
		storeName,
		description: `TanStack DB collection: ${id}`,
	})

	const channel =
		crossTab && typeof BroadcastChannel !== 'undefined'
			? new BroadcastChannel(`tdb:${dbName}:${storeName}`)
			: null

	// Captured from sync() so mutation handlers can confirm
	// optimistic writes into the synced store.
	let syncParams: Parameters<SyncConfig<T>['sync']>[0] | null = null

	const applySynced = (changes: ChangeMessage<T>[]) => {
		if (!syncParams) return
		const { begin, write, commit } = syncParams
		begin()
		for (const change of changes) {
			write({ type: change.type, value: change.value })
		}
		commit()
	}

	const sync: SyncConfig<T> = {
		sync: (params) => {
			syncParams = params
			const { begin, write, commit, markReady } = params

			// Initial load
			const rows: T[] = []
			store
				.iterate<T, void>((value) => {
					rows.push(value)
				})
				.then(() => {
					begin()
					for (const row of rows) {
						write({ type: 'insert', value: row })
					}
					commit()
				})
				.catch((err) => {
					console.error(`[${id}] localforage load failed:`, err)
				})
				.finally(() => markReady())

			// Apply changes broadcast from other tabs
			if (channel) {
				channel.onmessage = (e: MessageEvent<ChangeMessage<T>[]>) => {
					applySynced(e.data)
				}
			}

			return () => {
				channel?.close()
				syncParams = null
			}
		},
		getSyncMetadata: () => ({ dbName, storeName }),
	}

	const persistAndConfirm = async (changes: ChangeMessage<T>[]) => {
		// 1. Persist
		await Promise.all(
			changes.map((c) =>
				c.type === 'delete'
					? store.removeItem(c.key)
					: store.setItem(c.key, c.value),
			),
		)
		// 2. Confirm into local synced state
		applySynced(changes)
		// 3. Notify other tabs
		channel?.postMessage(changes)
	}

	return {
		id,
		getKey,
		schema,
		sync,
		onInsert: async ({ transaction }) => {
			await persistAndConfirm(
				transaction.mutations.map((m) => ({
					type: 'insert' as const,
					key: getKey(m.modified as T),
					value: m.modified as T,
				})),
			)
		},
		onUpdate: async ({ transaction }) => {
			await persistAndConfirm(
				transaction.mutations.map((m) => ({
					type: 'update' as const,
					key: getKey(m.modified as T),
					value: m.modified as T,
				})),
			)
		},
		onDelete: async ({ transaction }) => {
			await persistAndConfirm(
				transaction.mutations.map((m) => ({
					type: 'delete' as const,
					key: getKey(m.original as T),
					value: m.original as T,
				})),
			)
		},
	}
}

/** Wipe a collection's persisted data (useful for logout/reset) */
export async function clearLocalForageCollection(
	dbName: string,
	storeName: string,
) {
	const store = localforage.createInstance({ name: dbName, storeName })
	await store.clear()
}