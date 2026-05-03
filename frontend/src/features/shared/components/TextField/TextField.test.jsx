import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';

describe('TextField', () => {
	it('renders label, placeholder, helper text, and default token classes', () => {
		render(<TextField label="Enter Title" placeholder="The Blue Boat" helperText="Visible helper copy" />);

		const input = screen.getByLabelText('Enter Title');
		const shell = input.parentElement;
		const helperText = screen.getByText('Visible helper copy');

		expect(shell.className).toContain('bg-cinemata-neutral-50');
		expect(shell.className).toContain('border-cinemata-pacific-deep-500');
		expect(shell.className).toContain('hover:bg-cinemata-pacific-deep-50');
		expect(shell.className).toContain('dark:bg-cinemata-pacific-deep-900');
		expect(shell.className).toContain('dark:hover:bg-cinemata-pacific-deep-800');
		expect(input.className).toContain('text-cinemata-pacific-deep-900');
		expect(input.className).toContain('dark:text-cinemata-strait-blue-50');
		expect(input.className).toContain('placeholder:text-cinemata-pacific-deep-400');
		expect(input.className).toContain('dark:placeholder:text-cinemata-pacific-deep-300');
		expect(helperText.className).toContain('mt-[7.5px]');
		expect(helperText.className).toContain('text-cinemata-sunset-horizon-400p');
	});

	it('includes dark-mode override classes driven by ancestor `.dark`', () => {
		render(<TextField label="Dark title" placeholder="The Blue Boat" helperText="Dark helper" />);

		const input = screen.getByLabelText('Dark title');
		const shell = input.parentElement;
		const label = screen.getByText('Dark title');

		expect(shell.className).toContain('dark:bg-cinemata-pacific-deep-900');
		expect(shell.className).toContain('dark:border-cinemata-pacific-deep-500');
		expect(label.className).toContain('text-cinemata-pacific-deep-900');
		expect(label.className).toContain('dark:text-cinemata-strait-blue-50');
		expect(input.className).toContain('dark:text-cinemata-strait-blue-50');
		expect(input.className).toContain('dark:placeholder:text-cinemata-pacific-deep-300');
	});

	it('supports shell padding overrides via className and forwards input props', () => {
		render(<TextField label="Custom field" className="px-4" name="headline" defaultValue="Blue Boat" />);

		const input = screen.getByLabelText('Custom field');
		const shell = input.parentElement;
		const container = shell.parentElement;
		const label = screen.getByText('Custom field');

		expect(container.className).toContain('px-4');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:border-cinemata-sunset-horizon-400p');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(label.className).toContain('dark:text-cinemata-pacific-deep-300');
		expect(input).toHaveAttribute('name', 'headline');
		expect(input).toHaveValue('Blue Boat');
	});

	it('keeps active state while typing and applies active border colors', async () => {
		const user = userEvent.setup();
		render(<TextField label="Focused field" placeholder="Type title" />);

		const input = screen.getByLabelText('Focused field');
		const label = screen.getByText('Focused field');
		const shell = input.parentElement;

		await user.click(input);
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(label.className).toContain('dark:text-cinemata-pacific-deep-300');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:border-cinemata-sunset-horizon-400p');
		expect(input.className).toContain('placeholder:text-cinemata-pacific-deep-400');
		expect(input.className).toContain('dark:placeholder:text-cinemata-pacific-deep-300');

		await user.type(input, 'A');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(label.className).toContain('dark:text-cinemata-pacific-deep-300');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:border-cinemata-sunset-horizon-400p');
	});

	it('switches to filled border colors in real time when user enters a value', async () => {
		const user = userEvent.setup();
		render(<TextField label="Filled field" />);

		const input = screen.getByLabelText('Filled field');
		const shell = input.parentElement;

		expect(shell.className).not.toContain('border-cinemata-coral-reef-400p');

		await user.type(input, 'Hello');

		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:border-cinemata-sunset-horizon-400p');
		expect(screen.getByText('Filled field').className).toContain('text-cinemata-pacific-deep-400');
		expect(screen.getByText('Filled field').className).toContain('dark:text-cinemata-pacific-deep-300');
	});

	it('uses error tokens and aria-invalid when invalid', () => {
		render(<TextField label="Title" helperText="Title is required." invalid />);

		const input = screen.getByLabelText('Title');
		const shell = input.parentElement;
		const label = screen.getByText('Title');
		const helperText = screen.getByText('Title is required.');

		expect(shell.className).toContain('border-cinemata-red-500');
		expect(label.className).toContain('text-cinemata-red-500');
		expect(label.className).toContain('dark:text-cinemata-red-500');
		expect(helperText.className).toContain('text-cinemata-red-500');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription('Title is required.');
	});

	it('uses disabled classes with dark overrides when requested', () => {
		const { rerender } = render(<TextField label="Title" helperText="Title is required." invalid />);

		let input = screen.getByLabelText('Title');
		let shell = input.parentElement;
		let label = screen.getByText('Title');

		expect(shell.className).toContain('bg-cinemata-neutral-50');
		expect(shell.className).toContain('border-cinemata-red-500');
		expect(label.className).toContain('text-cinemata-red-500');
		expect(input.className).toContain('text-cinemata-pacific-deep-900');
		expect(input.className).toContain('placeholder:text-cinemata-pacific-deep-900');

		rerender(<TextField label="Title" helperText="Unavailable" disabled />);

		input = screen.getByLabelText('Title');
		shell = input.parentElement;
		label = screen.getByText('Title');

		expect(shell.className).toContain('bg-cinemata-pacific-deep-50');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:bg-cinemata-pacific-deep-900');
		expect(shell.className).toContain('dark:border-cinemata-red-500');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(input.className).toContain('text-cinemata-pacific-deep-400');
		expect(input.className).toContain('placeholder:text-cinemata-pacific-deep-400');
		expect(input.className).toContain('dark:text-cinemata-pacific-deep-300');
		expect(input.className).toContain('dark:placeholder:text-cinemata-pacific-deep-300');
	});

	it('disables input semantics and disabled color tokens', () => {
		render(<TextField label="Disabled field" helperText="Read only for now." disabled defaultValue="Blue Boat" />);

		const input = screen.getByLabelText('Disabled field');
		const shell = input.parentElement;
		const label = screen.getByText('Disabled field');

		expect(input).toBeDisabled();
		expect(shell.className).toContain('cursor-not-allowed');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(input.className).toContain('text-cinemata-pacific-deep-400');
	});

	it('merges helper text id with existing aria-describedby', () => {
		render(
			<>
				<p id="external-description">External description</p>
				<TextField label="Merge descriptions" helperText="Local helper text" aria-describedby="external-description" />
			</>
		);

		const input = screen.getByLabelText('Merge descriptions');
		const describedBy = input.getAttribute('aria-describedby');

		expect(describedBy).toContain('external-description');
		expect(describedBy).toContain('helper-text');
		expect(input).toHaveAccessibleDescription('External description Local helper text');
	});
});
