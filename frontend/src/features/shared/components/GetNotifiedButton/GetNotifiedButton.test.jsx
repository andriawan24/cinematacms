import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GetNotifiedButton } from './GetNotifiedButton';

describe('GetNotifiedButton', () => {
	it('renders default bell state', () => {
		render(<GetNotifiedButton />);

		const button = screen.getByRole('button', { name: 'Get Notified' });

		expect(button).toHaveAttribute('aria-pressed', 'false');
		expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
		expect(screen.getByText('Get Notified')).toBeInTheDocument();
		expect(button).toHaveStyle({
			backgroundColor: 'var(--cinemata-strait-blue-700)',
			color: 'var(--cinemata-neutral-50)',
		});
	});

	it('renders active bell plus right check state', () => {
		render(<GetNotifiedButton notified />);

		const button = screen.getByRole('button', { name: 'Get Notified' });

		expect(button).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
		expect(screen.getByTestId('check-icon')).toBeInTheDocument();
		expect(screen.queryByText('Get Notified')).not.toBeInTheDocument();
		expect(button).toHaveStyle({
			backgroundColor: 'var(--cinemata-strait-blue-700)',
			color: 'var(--cinemata-neutral-50)',
		});
	});

	it('uses hover color when inactive', async () => {
		const user = userEvent.setup();
		render(<GetNotifiedButton />);

		const button = screen.getByRole('button', { name: 'Get Notified' });

		await user.hover(button);
		expect(button).toHaveStyle({
			backgroundColor: 'var(--cinemata-strait-blue-800)',
		});

		await user.unhover(button);
		expect(button).toHaveStyle({
			backgroundColor: 'var(--cinemata-strait-blue-700)',
		});
	});

	it('shakes when switching from inactive to active', () => {
		const animate = vi.fn();
		const { rerender } = render(<GetNotifiedButton />);

		const bellWrapper = screen.getByTestId('bell-icon').parentElement;
		const originalAnimate = bellWrapper.animate;
		bellWrapper.animate = animate;

		try {
			rerender(<GetNotifiedButton notified />);
			expect(animate).toHaveBeenCalledOnce();
		} finally {
			bellWrapper.animate = originalAnimate;
		}
	});
});
