import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

function TestIcon() {
	return (
		<svg data-testid="left-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
}

describe('Button', () => {
	it('renders primary variant with requested typography and default type', () => {
		render(<Button>Browse films</Button>);

		const button = screen.getByRole('button', { name: 'Browse films' });

		expect(button).toHaveAttribute('type', 'button');
		expect(button).toHaveClass('body-body-14-bold');
		expect(button.className).toContain('bg-cinemata-strait-blue-600p');
		expect(button.className).toContain('hover:bg-cinemata-strait-blue-800');
	});

	it('renders optional left icon at design-system size', () => {
		render(<Button icon={<TestIcon />}>Continue</Button>);

		const icon = screen.getByTestId('left-icon');
		const iconWrapper = icon.parentElement;

		expect(iconWrapper).toHaveStyle({ width: 'var(--size-20)', height: 'var(--size-20)' });
	});

	it('uses secondary variant token classes when requested', () => {
		render(<Button variant="secondary">Learn more</Button>);

		const button = screen.getByRole('button', { name: 'Learn more' });

		expect(button.className).toContain('bg-cinemata-sunset-horizon-500');
		expect(button.className).toContain('hover:bg-cinemata-sunset-horizon-700');
	});

	it('uses primary outline variant token classes when requested', () => {
		render(<Button variant="primary-outline">Outline</Button>);

		const button = screen.getByRole('button', { name: 'Outline' });

		expect(button.className).toContain('border-cinemata-strait-blue-600p');
		expect(button.className).toContain('bg-transparent');
		expect(button.className).toContain('text-cinemata-strait-blue-600p');
		expect(button.className).toContain('hover:bg-cinemata-strait-blue-600p');
		expect(button.className).toContain('hover:text-cinemata-white');
	});

	it('uses secondary outline variant token classes when requested', () => {
		render(<Button variant="secondary-outline">Outline secondary</Button>);

		const button = screen.getByRole('button', { name: 'Outline secondary' });

		expect(button.className).toContain('border-cinemata-sunset-horizon-500');
		expect(button.className).toContain('bg-transparent');
		expect(button.className).toContain('text-cinemata-sunset-horizon-500');
		expect(button.className).toContain('hover:bg-cinemata-sunset-horizon-500');
		expect(button.className).toContain('hover:text-cinemata-white');
	});

	it('uses special variant token classes when requested', () => {
		render(<Button variant="special">See all</Button>);

		const button = screen.getByRole('button', { name: 'See all' });

		expect(button.className).toContain('bg-cinemata-pacific-deep-950');
		expect(button.className).toContain('hover:bg-cinemata-pacific-deep-900');
	});

	it('uses text variant without background or border', () => {
		render(<Button variant="text">Read more</Button>);

		const button = screen.getByRole('button', { name: 'Read more' });

		expect(button.className).toContain('border-none');
		expect(button.className).toContain('bg-transparent');
		expect(button.className).toContain('text-cinemata-strait-blue-600p');
		expect(button.className).toContain('hover:text-cinemata-strait-blue-800');
	});

	it('uses requested text color token classes when provided', () => {
		render(
			<Button variant="text" color="red-500">
				Delete item
			</Button>
		);

		const button = screen.getByRole('button', { name: 'Delete item' });

		expect(button.className).toContain('text-cinemata-red-500');
		expect(button.className).toContain('hover:text-cinemata-red-600');
	});

	it('supports strait blue and neutral text color options', () => {
		const { rerender } = render(
			<Button variant="text" color="strait-blue-100">
				Soft link
			</Button>
		);

		let button = screen.getByRole('button', { name: 'Soft link' });

		expect(button.className).toContain('text-cinemata-strait-blue-100');
		expect(button.className).toContain('hover:text-cinemata-strait-blue-400');

		rerender(
			<Button variant="text" color="strait-blue-400">
				More details
			</Button>
		);

		button = screen.getByRole('button', { name: 'More details' });
		expect(button.className).toContain('text-cinemata-strait-blue-400');
		expect(button.className).toContain('hover:text-cinemata-strait-blue-600p');

		rerender(
			<Button variant="text" color="neutral-600">
				Dismiss
			</Button>
		);

		button = screen.getByRole('button', { name: 'Dismiss' });
		expect(button.className).toContain('text-cinemata-neutral-600');
		expect(button.className).toContain('hover:text-cinemata-neutral-700');
	});

	it('renders special variant icon on the right', () => {
		render(
			<Button variant="special" icon={<TestIcon />}>
				See all
			</Button>
		);

		const button = screen.getByRole('button', { name: 'See all' });
		const label = screen.getByText('See all');
		const icon = screen.getByTestId('left-icon');

		expect(label.nextElementSibling).toBe(icon.parentElement);
		expect(button.firstElementChild).toBe(label);
	});

	it('falls back to primary variant for unsupported variants', () => {
		render(<Button variant="unsupported">Fallback</Button>);

		const button = screen.getByRole('button', { name: 'Fallback' });

		expect(button.className).toContain('bg-cinemata-strait-blue-600p');
		expect(button.className).not.toContain('bg-cinemata-sunset-horizon-500');
	});

	it('falls back to primary text color for unsupported text color', () => {
		render(
			<Button variant="text" color="unsupported">
				Fallback text
			</Button>
		);

		const button = screen.getByRole('button', { name: 'Fallback text' });

		expect(button.className).toContain('text-cinemata-strait-blue-600p');
		expect(button.className).toContain('hover:text-cinemata-strait-blue-800');
	});

	it('renders long labels without creating icon wrapper when icon is absent', () => {
		render(
			<Button>
				International documentary showcase with a much longer call to action than the default example
			</Button>
		);

		expect(
			screen.getByRole('button', {
				name: 'International documentary showcase with a much longer call to action than the default example',
			})
		).toBeInTheDocument();
		expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
	});

	it('forwards native disabled and click behavior', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		render(
			<Button disabled onClick={onClick}>
				Processing
			</Button>
		);

		const button = screen.getByRole('button', { name: 'Processing' });

		expect(button).toBeDisabled();
		await user.click(button);
		expect(onClick).not.toHaveBeenCalled();
	});
});
