import { HOME_QUERY_KEYS } from './queryClient';

/**
 * Server-injected initial data lives in json_script elements rendered by
 * templates/cms/index_revamp.html. Each block is parsed independently so one
 * malformed payload does not discard the others.
 */
const INITIAL_DATA_SCRIPT_IDS = {
	featured: 'home-initial-data-featured',
	recommended: 'home-initial-data-recommended',
	indexFeatured: 'home-initial-data-index-featured',
	latest: 'home-initial-data-latest',
};

const INITIAL_DATA_QUERY_KEYS = {
	featured: HOME_QUERY_KEYS.featured,
	recommended: HOME_QUERY_KEYS.recommended,
	indexFeatured: HOME_QUERY_KEYS.indexFeatured,
	latest: HOME_QUERY_KEYS.recent,
};

function parseJsonScript(id) {
	const el = document.getElementById(id);
	if (!el) {
		return undefined;
	}

	try {
		return JSON.parse(el.textContent);
	} catch {
		return undefined;
	}
}

export function isMediaListPayload(value) {
	return Array.isArray(value) || Array.isArray(value?.results);
}

/**
 * Returns the available { featured, recommended, indexFeatured, latest }
 * blocks, or null if every tag is absent.
 */
export function readInitialDataFromDom() {
	const data = {};
	let found = false;

	for (const [key, id] of Object.entries(INITIAL_DATA_SCRIPT_IDS)) {
		const value = parseJsonScript(id);
		if (value !== undefined) {
			found = true;
		}
		data[key] = value;
	}

	return found ? data : null;
}

/**
 * Seed the query cache from server-injected data so the first render paints
 * without API round trips and without skeleton rows that shift the layout
 * when the response lands. Only list-shaped payloads are seeded; a null or
 * malformed block leaves its query to fetch normally.
 */
export function seedHomeQueryClient(queryClient, initialData) {
	if (!initialData) {
		return;
	}

	for (const [key, queryKey] of Object.entries(INITIAL_DATA_QUERY_KEYS)) {
		if (isMediaListPayload(initialData[key])) {
			queryClient.setQueryData(queryKey, initialData[key]);
		}
	}
}
