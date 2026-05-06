import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

const OPTIONS = [
	{ label: 'Feature film', value: 'feature-film' },
	{ label: 'Documentary', value: 'documentary' },
	{ label: 'Short form', value: 'short-form' },
];

describe('Dropdown', () => {
	it('renders placeholder, label, helper text, and chevron icon', () => {
		render(
			<Dropdown label="Category" placeholder="Choose category" helperText="Pick one option" options={OPTIONS} />
		);

		const trigger = screen.getByRole('button', { name: 'Choose category' });
		const shell = trigger.parentElement;
		const helperText = screen.getByText('Pick one option');
		const icon = shell.querySelector('svg[data-icon="chevronDown"]');

		expect(helperText).toBeVisible();
		expect(icon).not.toBeNull();
	});

	it('opens menu and selects option in uncontrolled mode', async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();

		render(<Dropdown label="Category" placeholder="Choose category" options={OPTIONS} onChange={onChange} />);

		const trigger = screen.getByRole('button', { name: 'Choose category' });
		await user.click(trigger);
		expect(screen.getByRole('listbox')).toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: 'Documentary' }));

		expect(onChange).toHaveBeenCalledWith('documentary', OPTIONS[1]);
		expect(screen.getByRole('button', { name: 'Documentary' })).toHaveAttribute('aria-expanded', 'false');
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('supports controlled value', () => {
		render(<Dropdown label="Category" value="short-form" options={OPTIONS} />);

		const trigger = screen.getByRole('button', { name: 'Short form' });
		expect(trigger).toBeInTheDocument();
		expect(screen.getByText('Category')).toBeVisible();
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

	it('uses invalid and disabled semantics', () => {
		const { rerender } = render(<Dropdown label="Category" helperText="Required" invalid options={OPTIONS} />);

		let trigger = screen.getByRole('button', { name: 'Select option' });
		expect(trigger).toHaveAttribute('aria-invalid', 'true');

		rerender(<Dropdown label="Category" helperText="Unavailable" disabled options={OPTIONS} />);

		trigger = screen.getByRole('button', { name: 'Select option' });
		expect(trigger).toBeDisabled();
	});

	it('accepts custom className without breaking rendering', () => {
		render(<Dropdown label="Category" className="px-4" options={OPTIONS} />);

		expect(screen.getByRole('button', { name: 'Select option' })).toBeInTheDocument();
	});
});
