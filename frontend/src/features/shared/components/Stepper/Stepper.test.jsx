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
	it('renders the header icon, label, timeline items, and links', () => {
		const { container } = render(<Stepper label="Featured In..." items={ITEMS} />);

		const label = screen.getByText('Featured In...');
		const firstTitle = screen.getByText('Labor Rights Collections');
		const firstDate = screen.getAllByText('February 2025')[0];
		const firstLink = screen.getAllByRole('link', { name: 'VISIT LINK' })[0];
		const lines = container.querySelectorAll('[data-stepper-line]');
		const dots = container.querySelectorAll('[data-stepper-dot]');
		const icon = container.querySelector('[data-stepper-icon]');

		expect(label).toBeVisible();
		expect(firstTitle).toBeVisible();
		expect(firstDate).toBeVisible();
		expect(firstLink).toBeVisible();
		expect(lines).toHaveLength(ITEMS.length * 2);
		expect(dots).toHaveLength(ITEMS.length);
		expect(icon).not.toBeNull();
	});

	it('supports custom wrapper classes without breaking rendering', () => {
		const { container } = render(<Stepper items={ITEMS} className="max-w-[720px]" />);
		const wrapper = container.querySelector('[data-stepper]');

		expect(wrapper).not.toBeNull();
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
