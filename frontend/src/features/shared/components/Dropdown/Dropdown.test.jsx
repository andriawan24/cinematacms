import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

const OPTIONS = [
	{ label: 'Feature film', value: 'feature-film' },
	{ label: 'Documentary', value: 'documentary' },
	{ label: 'Short form', value: 'short-form' },
];

describe('Dropdown', () => {
	it('renders placeholder, label, helper text, and chevron icon classes', () => {
		render(
			<Dropdown label="Category" placeholder="Choose category" helperText="Pick one option" options={OPTIONS} />
		);

		const trigger = screen.getByRole('button', { name: 'Choose category' });
		const shell = trigger.parentElement;
		const helperText = screen.getByText('Pick one option');
		const icon = shell.querySelector('svg[data-icon="chevronDown"]');

		expect(shell.className).toContain('bg-cinemata-neutral-50');
		expect(shell.className).toContain('dark:bg-cinemata-pacific-deep-900');
		expect(helperText.className).toContain('text-cinemata-sunset-horizon-400p');
		expect(icon).not.toBeNull();
	});

	it('opens menu and selects option in uncontrolled mode', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Dropdown label="Category" placeholder="Choose category" options={OPTIONS} onChange={onChange} />);

		const trigger = screen.getByRole('button', { name: 'Choose category' });
		const shell = trigger.parentElement;
		await user.click(trigger);
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:border-cinemata-sunset-horizon-400p');
		await user.click(screen.getByRole('button', { name: 'Documentary' }));

		expect(onChange).toHaveBeenCalledWith('documentary', OPTIONS[1]);
		expect(screen.getByRole('button', { name: 'Documentary' })).toHaveAttribute('aria-expanded', 'false');
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('supports controlled value', () => {
		render(<Dropdown label="Category" value="short-form" options={OPTIONS} />);

		const trigger = screen.getByRole('button', { name: 'Short form' });
		const shell = trigger.parentElement;
		const label = screen.getByText('Category');

		expect(trigger).toBeInTheDocument();
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:border-cinemata-sunset-horizon-400p');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(label.className).toContain('dark:text-cinemata-pacific-deep-300');
	});

	it('closes menu on outside click and escape', () => {
		render(<Dropdown label="Category" placeholder="Choose category" options={OPTIONS} />);

		const trigger = screen.getByRole('button', { name: 'Choose category' });
		fireEvent.click(trigger);
		expect(screen.getByRole('listbox')).toBeInTheDocument();

		fireEvent.keyDown(document, { key: 'Escape' });
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

		fireEvent.click(trigger);
		expect(screen.getByRole('listbox')).toBeInTheDocument();

		fireEvent.mouseDown(document.body);
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('uses error and disabled token classes', () => {
		const { rerender } = render(<Dropdown label="Category" helperText="Required" invalid options={OPTIONS} />);

		let trigger = screen.getByRole('button', { name: 'Select option' });
		let shell = trigger.parentElement;
		let label = screen.getByText('Category');

		expect(shell.className).toContain('border-cinemata-red-500');
		expect(label.className).toContain('text-cinemata-red-500');
		expect(trigger).toHaveAttribute('aria-invalid', 'true');

		rerender(<Dropdown label="Category" helperText="Unavailable" disabled options={OPTIONS} />);

		trigger = screen.getByRole('button', { name: 'Select option' });
		shell = trigger.parentElement;
		label = screen.getByText('Category');

		expect(trigger).toBeDisabled();
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
	});

	it('supports container className overrides only', () => {
		render(<Dropdown label="Category" className="px-4" options={OPTIONS} />);

		const trigger = screen.getByRole('button', { name: 'Select option' });
		const container = trigger.parentElement.parentElement;

		expect(container.className).toContain('px-4');
	});
});
