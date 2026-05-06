import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

const ITEMS = [
	{
		title: 'Labor Rights Collections',
		date: 'February 2025',
		href: 'https://example.com/labor-rights-collections',
	},
	{
		title: 'BlueOceans Film Price 2026 Playlist',
		date: 'February 2025',
		href: 'https://example.com/blueoceans-film-price-2026-playlist',
	},
];

describe('Stepper', () => {
	it('renders the header icon, label, timeline items, and links with the requested token classes', () => {
		const { container } = render(<Stepper label="Featured In..." items={ITEMS} />);

		const label = screen.getByText('Featured In...');
		const firstTitle = screen.getByText('Labor Rights Collections');
		const firstDate = screen.getAllByText('February 2025')[0];
		const firstLink = screen.getAllByRole('link', { name: 'VISIT LINK' })[0];
		const lines = container.querySelectorAll('[data-stepper-line]');
		const dots = container.querySelectorAll('[data-stepper-dot]');
		const icon = container.querySelector('[data-stepper-icon]');

		expect(label.className).toContain('body-body-14-regular');
		expect(label.className).toContain('text-cinemata-pacific-deep-300');
		expect(firstTitle.className).toContain('body-body-16-regular');
		expect(firstTitle.className).toContain('text-cinemata-pacific-deep-50');
		expect(firstDate.className).toContain('body-body-14-regular');
		expect(firstDate.className).toContain('text-cinemata-pacific-deep-300');
		expect(firstLink.className).toContain('body-body-14-bold');
		expect(firstLink.className).toContain('text-cinemata-sunset-horizon-400p');
		expect(lines).toHaveLength(ITEMS.length * 2);
		expect(dots).toHaveLength(ITEMS.length);
		expect(icon).not.toBeNull();
		expect(icon?.parentElement?.className).toContain('h-12');
		expect(icon?.parentElement?.className).toContain('sm:h-16');
		expect(label.className).toContain('min-w-0');
	});

	it('supports custom wrapper classes while keeping full-width layout', () => {
		const { container } = render(<Stepper items={ITEMS} className="max-w-[720px]" />);
		const wrapper = container.querySelector('[data-stepper]');

		expect(wrapper?.className).toContain('w-full');
		expect(wrapper?.className).toContain('max-w-[720px]');
	});

	it('uses per-item link labels when provided', () => {
		render(
			<Stepper
				items={[
					{
						title: 'Labor Rights Collections',
						date: 'February 2025',
						href: 'https://example.com/labor-rights-collections',
						linkLabel: 'OPEN ARCHIVE',
					},
				]}
			/>
		);

		expect(screen.getByRole('link', { name: 'OPEN ARCHIVE' })).toBeVisible();
	});
});
