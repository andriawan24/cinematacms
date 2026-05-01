import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FollowButton } from './FollowButton';

describe('FollowButton', () => {
	it('renders unfollowed label with person name and follow icon', () => {
		render(<FollowButton personName="Alexandra" />);

		const button = screen.getByRole('button', { name: 'Follow Alexandra' });

		expect(button).toHaveAttribute('aria-pressed', 'false');
		expect(screen.getByTestId('follow-icon')).toBeInTheDocument();
		expect(button).toHaveStyle({
			backgroundColor: 'var(--cinemata-sunset-horizon-500)',
			color: 'var(--cinemata-neutral-50)',
		});
	});

	it('switches to followed treatment', () => {
		render(<FollowButton personName="Alexandra" followed />);

		const button = screen.getByRole('button', { name: 'Following' });

		expect(button).toHaveAttribute('aria-pressed', 'true');
		expect(button.style.backgroundColor).toBe('transparent');
		expect(button.style.borderColor).toBe('var(--cinemata-sunset-horizon-500)');
		expect(button.style.color).toBe('var(--cinemata-sunset-horizon-500)');
	});

	it('uses hover color when unfollowed', async () => {
		const user = userEvent.setup();
		render(<FollowButton personName="Alexandra" />);

		const button = screen.getByRole('button', { name: 'Follow Alexandra' });

		await user.hover(button);
		expect(button).toHaveStyle({
			backgroundColor: 'var(--cinemata-sunset-horizon-700)',
		});

		await user.unhover(button);
		expect(button).toHaveStyle({
			backgroundColor: 'var(--cinemata-sunset-horizon-500)',
		});
	});
});
