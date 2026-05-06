import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
	it('renders the caption treatment with the provided color', () => {
		render(<Badge color="#0c5273">Premiere</Badge>);

		const badge = screen.getByText('Premiere');

		expect(badge.className).toContain('caption-caption-10-regular');
		expect(badge.className).toContain('rounded-[2px]');
		expect(badge.className).toContain('p-1');
		expect(badge.className).toContain('text-cinemata-neutral-50');
		expect(badge).toHaveStyle({ backgroundColor: 'rgb(12, 82, 115)' });
	});

	it('supports extra className and style overrides', () => {
		render(
			<Badge className="uppercase" color="#111111" style={{ letterSpacing: '0.12em' }}>
				Now Showing
			</Badge>
		);

		const badge = screen.getByText('Now Showing');

		expect(badge.className).toContain('uppercase');
		expect(badge).toHaveStyle({ letterSpacing: '0.12em' });
	});
});
