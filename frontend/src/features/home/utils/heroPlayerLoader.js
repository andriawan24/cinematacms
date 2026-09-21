/**
 * The hero player pulls in the legacy VideoPlayer, @mediacms/media-player and
 * Video.js (through the import-map shim, roughly 570 KB before compression)
 * plus the player stylesheet. Importing it statically put all of that on the
 * homepage critical path and delayed the first paint on slow mobile
 * connections (issue #750). The module is fetched only when a viewer activates
 * the hero.
 */
export function createHeroPlayerLoader(importHeroPlayer) {
	let pending = null;

	return function loadHeroPlayer() {
		if (!pending) {
			// A failed load clears the cache so the next activation retries the
			// request instead of replaying the same rejection.
			pending = importHeroPlayer().catch((error) => {
				pending = null;
				throw error;
			});
		}

		return pending;
	};
}

export const loadHeroVideoPlayer = createHeroPlayerLoader(() => import('../components/HeroVideoPlayer'));
