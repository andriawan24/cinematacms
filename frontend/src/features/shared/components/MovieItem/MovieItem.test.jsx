import { render, screen } from '@testing-library/react';
import { HorizontalMovieItem, MovieItem, VerticalMovieItem } from './MovieItem';

const samplePoster =
	'data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"%3E%3Crect width="160" height="90" rx="6" fill="%23102746"/%3E%3Ccircle cx="120" cy="24" r="20" fill="%2385c4ff" fill-opacity="0.35"/%3E%3Cpath d="M0 66c24-18 47-27 68-27 21 0 52 12 92 35v16H0V66z" fill="%23D0735F"/%3E%3C/svg%3E';

describe('MovieItem', () => {
	it('renders the horizontal layout with badge and duration overlays', () => {
		render(
			<HorizontalMovieItem
				imageSrc={samplePoster}
				imageAlt="Arrival poster"
				title="Arrival"
				subtitle="Sci-Fi Drama"
				metadata={['2026', 'PG-13', '4K']}
				badge="Premiere"
				duration="2h 3m"
			/>
		);

		const article = screen.getByRole('article');
		const image = screen.getByRole('img', { name: 'Arrival poster' });
		const badge = screen.getByText('Premiere');
		const duration = screen.getByText('2h 3m');

		expect(article.className).toContain('flex');
		expect(article.className).toContain('items-start');
		expect(article.className).toContain('gap-4');
		expect(image.parentElement?.className).toContain('aspect-video');
		expect(image.parentElement?.className).toContain('w-[180px]');
		expect(badge.className).toContain('absolute');
		expect(duration.className).toContain('bg-[#111111]/90');
		expect(screen.getByText('2026')).toBeVisible();
		expect(screen.getByText('PG-13')).toBeVisible();
		expect(screen.getByText('4K')).toBeVisible();
		expect(screen.getByText('Arrival').className).toContain('line-clamp-3');
		expect(article.querySelector('[data-movie-copy]')?.className).toContain('gap-3');
		expect(article.className).toContain('w-full');
	});

	it('renders the vertical layout with the top-right icon chip', () => {
		render(
			<VerticalMovieItem
				imageSrc={samplePoster}
				imageAlt="Festival poster"
				title="Past Lives"
				subtitle="Romance"
				metadata={['2025', 'Award Winner']}
				badge="Official Selection"
				duration="1h 46m"
				iconName="eyeSlash"
				iconLabel="Hidden"
			/>
		);

		const article = screen.getByRole('article');
		const icon = article.querySelector('svg[data-icon="eyeSlash"]');
		const iconChip = article.querySelector('[data-movie-item-icon-chip]');

		expect(article.className).toContain('flex-col');
		expect(article.className).toContain('gap-3');
		expect(iconChip?.className).toContain('top-3');
		expect(iconChip?.className).toContain('right-3');
		expect(iconChip?.className).toContain('px-2');
		expect(iconChip?.className).toContain('py-1');
		expect(iconChip?.className).toContain('bg-cinemata-sunset-horizon-400p');
		expect(iconChip?.className).not.toContain('/90');
		expect(icon).not.toBeNull();
		expect(screen.getByText('Official Selection')).toBeVisible();
		expect(screen.getByText('1h 46m')).toBeVisible();
		expect(screen.getByText('Past Lives').className).toContain('line-clamp-3');
		expect(article.querySelector('[data-movie-copy]')?.className).toContain('gap-2');
		expect(article.className).toContain('w-full');
	});

	it('switches variants through the generic MovieItem orientation prop', () => {
		const { rerender } = render(
			<MovieItem
				orientation="horizontal"
				imageSrc={samplePoster}
				imageAlt="Horizontal poster"
				title="The Blue Boat"
				metadata={['2024', 'Documentary']}
			/>
		);

		expect(screen.getByRole('article').className).toContain('gap-4');

		rerender(
			<MovieItem
				orientation="vertical"
				imageSrc={samplePoster}
				imageAlt="Vertical poster"
				title="The Blue Boat"
				metadata={['2024', 'Documentary']}
			/>
		);

		expect(screen.getByRole('article').className).toContain('flex-col');
	});
});
