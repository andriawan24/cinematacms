import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
	it('renders label on left with checked switch on right', () => {
		render(<Switch checked>AUTOPLAY</Switch>);

		const input = screen.getByRole('checkbox', { name: 'AUTOPLAY' });
		const label = screen.getByText('AUTOPLAY');
		const track = input.parentElement.querySelector('[data-switch-track]');

		expect(input).toBeChecked();
		expect(label).toBeInTheDocument();
		expect(track).not.toBeNull();
		expect(track).toHaveStyle({ width: '30px', height: '20px' });
	});

	it('uses cyan track and moved thumb when checked', () => {
		render(<Switch checked>AUTOPLAY</Switch>);

		const track = screen
			.getByRole('checkbox', { name: 'AUTOPLAY' })
			.parentElement.querySelector('[data-switch-track]');
		const thumb = screen
			.getByRole('checkbox', { name: 'AUTOPLAY' })
			.parentElement.querySelector('[data-switch-thumb]');

		expect(track).toHaveStyle({ backgroundColor: 'rgb(199, 231, 238)' });
		expect(thumb).toHaveStyle({ width: '14px', height: '14px', left: '13px', top: '3px' });
	});

	it('resets thumb position when unchecked', () => {
		render(<Switch checked={false}>AUTOPLAY</Switch>);

		const input = screen.getByRole('checkbox', { name: 'AUTOPLAY' });
		const thumb = input.parentElement.querySelector('[data-switch-thumb]');

		expect(thumb).toHaveStyle({ left: '3px', top: '3px' });
	});

	it('supports dynamic width while keeping thumb size and padding defaults', () => {
		render(
			<Switch checked width={52}>
				AUTOPLAY
			</Switch>
		);

		const input = screen.getByRole('checkbox', { name: 'AUTOPLAY' });
		const track = input.parentElement.querySelector('[data-switch-track]');
		const thumb = input.parentElement.querySelector('[data-switch-thumb]');

		expect(track).toHaveStyle({ width: '52px', height: '20px' });
		expect(thumb).toHaveStyle({ left: '35px', top: '3px' });
	});

	it('fires change when toggled', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(
			<Switch checked={false} onChange={handleChange}>
				AUTOPLAY
			</Switch>
		);

		await user.click(screen.getByRole('checkbox', { name: 'AUTOPLAY' }));

		expect(handleChange).toHaveBeenCalledTimes(1);
	});
});
