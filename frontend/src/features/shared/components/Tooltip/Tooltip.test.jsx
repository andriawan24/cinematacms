import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Tooltip } from './Tooltip';

function TriggerButton() {
	return <Button variant="icon" aria-label="Open tooltip" icon={<Icon name="infoYellow" size={18} decorative />} />;
}

describe('Tooltip', () => {
	it('opens on hover by default', async () => {
		const user = userEvent.setup();

		render(
			<Tooltip content="Helpful copy">
				<TriggerButton />
			</Tooltip>
		);

		const trigger = screen.getByRole('button', { name: 'Open tooltip' });

		await user.hover(trigger);

		expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful copy');
	});

	it('toggles on click when click trigger mode is used', async () => {
		const user = userEvent.setup();

		render(
			<Tooltip content="Helpful copy" trigger="click">
				<TriggerButton />
			</Tooltip>
		);

		const trigger = screen.getByRole('button', { name: 'Open tooltip' });

		await user.click(trigger);
		expect(screen.getByRole('tooltip')).toBeInTheDocument();

		await user.click(trigger);
		expect(screen.queryByRole('tooltip')).toBeNull();
	});

	it('opens with the requested placement option', async () => {
		const user = userEvent.setup();

		render(
			<Tooltip content="Helpful copy" placement="right">
				<TriggerButton />
			</Tooltip>
		);

		await user.hover(screen.getByRole('button', { name: 'Open tooltip' }));

		expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful copy');
	});

	it('closes on outside click in click mode', async () => {
		const user = userEvent.setup();

		render(
			<div>
				<Tooltip content="Helpful copy" trigger="click">
					<TriggerButton />
				</Tooltip>
				<button type="button">Outside</button>
			</div>
		);

		await user.click(screen.getByRole('button', { name: 'Open tooltip' }));
		expect(screen.getByRole('tooltip')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Outside' }));
		expect(screen.queryByRole('tooltip')).toBeNull();
	});

	it('invokes the child click handler only once in click mode', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Tooltip content="Helpful copy" trigger="click">
				<Button
					variant="icon"
					aria-label="Open tooltip"
					icon={<Icon name="infoYellow" size={18} decorative />}
					onClick={handleClick}
				/>
			</Tooltip>
		);

		await user.click(screen.getByRole('button', { name: 'Open tooltip' }));

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(screen.getByRole('tooltip')).toBeInTheDocument();
	});
});
