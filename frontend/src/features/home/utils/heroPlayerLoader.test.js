import { describe, it, expect, vi } from 'vitest';
import { createHeroPlayerLoader } from './heroPlayerLoader';

describe('createHeroPlayerLoader', () => {
	it('requests the module once and shares the result across activations', async () => {
		const heroPlayerModule = { default: function HeroVideoPlayer() {} };
		const importHeroPlayer = vi.fn().mockResolvedValue(heroPlayerModule);
		const loadHeroPlayer = createHeroPlayerLoader(importHeroPlayer);

		const first = loadHeroPlayer();
		const second = loadHeroPlayer();

		expect(first).toBe(second);
		await expect(first).resolves.toBe(heroPlayerModule);
		expect(importHeroPlayer).toHaveBeenCalledTimes(1);

		await expect(loadHeroPlayer()).resolves.toBe(heroPlayerModule);
		expect(importHeroPlayer).toHaveBeenCalledTimes(1);
	});

	it('retries the import after a failed load instead of caching the rejection', async () => {
		const heroPlayerModule = { default: function HeroVideoPlayer() {} };
		const importHeroPlayer = vi
			.fn()
			.mockRejectedValueOnce(new Error('offline'))
			.mockResolvedValueOnce(heroPlayerModule);
		const loadHeroPlayer = createHeroPlayerLoader(importHeroPlayer);

		await expect(loadHeroPlayer()).rejects.toThrow('offline');
		await expect(loadHeroPlayer()).resolves.toBe(heroPlayerModule);
		expect(importHeroPlayer).toHaveBeenCalledTimes(2);
	});
});
