import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentButton } from './SegmentButton';

const OPTIONS = [
	{ value: 'dark', label: 'Dark', iconName: 'moon' },
	{ value: 'light', label: 'Light', iconName: 'sun' },
];

describe('SegmentButton', () => {
	it('renders the segmented container with icon-and-label options and selected styling', () => {
		render(<SegmentButton options={OPTIONS} defaultValue="dark" aria-label="Theme mode" />);

		const group = screen.getByLabelText('Theme mode');
		const darkButton = screen.getByRole('button', { name: 'Dark' });
		const lightButton = screen.getByRole('button', { name: 'Light' });

		expect(group.className).toContain('rounded-[4px]');
		expect(group.className).toContain('overflow-hidden');
		expect(group.className).toContain('inline-flex');
		expect(darkButton.className).toContain('body-body-12-medium');
		expect(darkButton.className).toContain('gap-1');
		expect(darkButton.className).toContain('shrink-0');
		expect(darkButton.className).not.toContain('flex-1');
		expect(darkButton.className).toContain('bg-cinemata-sunset-horizon-500');
		expect(lightButton.className).toContain('bg-cinemata-pacific-deep-800');
		expect(darkButton).toHaveAttribute('aria-pressed', 'true');
		expect(lightButton).toHaveAttribute('aria-pressed', 'false');
	});

	it('supports full-width distributed segments when layout is fill', () => {
		render(
			<SegmentButton
				options={OPTIONS}
				defaultValue="dark"
				layout="fill"
				aria-label="Theme mode"
			/>
		);

		const group = screen.getByLabelText('Theme mode');
		const darkButton = screen.getByRole('button', { name: 'Dark' });

		expect(group.className).toContain('w-full');
		expect(group.className).toContain('flex');
		expect(darkButton.className).toContain('flex-1');
		expect(darkButton.className).not.toContain('shrink-0');
	});

	it('supports uncontrolled single selection changes', async () => {
		const user = userEvent.setup();
		render(<SegmentButton options={OPTIONS} defaultValue="dark" aria-label="Theme mode" />);

		await user.click(screen.getByRole('button', { name: 'Light' }));

		expect(screen.getByRole('button', { name: 'Light' })).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByRole('button', { name: 'Dark' })).toHaveAttribute('aria-pressed', 'false');
	});

	it('supports multiple selected values', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(
			<SegmentButton
				multiple
				options={[
					{ value: 'films', label: 'Films', iconName: 'spark' },
					{ value: 'audio', label: 'Audio', iconName: 'notificationBell' },
				]}
				defaultValue={['films']}
				onValueChange={handleChange}
				aria-label="Media filters"
			/>
		);

		await user.click(screen.getByRole('button', { name: 'Audio' }));

		expect(screen.getByRole('button', { name: 'Films' })).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByRole('button', { name: 'Audio' })).toHaveAttribute('aria-pressed', 'true');
		expect(handleChange).toHaveBeenLastCalledWith(['films', 'audio']);
	});

	it('supports controlled selection updates', async () => {
		const user = userEvent.setup();

		function ControlledSegmentButton() {
			const [value, setValue] = useState('dark');

			return (
				<SegmentButton
					options={OPTIONS}
					value={value}
					onValueChange={setValue}
					aria-label="Theme mode"
				/>
			);
		}

		render(<ControlledSegmentButton />);

		await user.click(screen.getByRole('button', { name: 'Light' }));

		expect(screen.getByRole('button', { name: 'Light' })).toHaveAttribute('aria-pressed', 'true');
	});
});
