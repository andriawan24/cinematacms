import { render, screen } from '@testing-library/react';
import { TextField } from './TextField';

describe('TextField', () => {
	it('renders label, placeholder, helper text, and default token classes', () => {
		render(<TextField label="Enter Title" placeholder="The Blue Boat" helperText="Visible helper copy" />);

		const input = screen.getByLabelText('Enter Title');
		const shell = input.parentElement;
		const helperText = screen.getByText('Visible helper copy');

		expect(shell.className).toContain('bg-cinemata-pacific-deep-900');
		expect(shell.className).toContain('border-cinemata-pacific-deep-500');
		expect(shell.className).toContain('hover:bg-cinemata-pacific-deep-500');
		expect(shell.className).toContain('focus-within:border-cinemata-sunset-horizon-400p');
		expect(input.className).toContain('text-cinemata-strait-blue-50');
		expect(input.className).toContain('placeholder:text-cinemata-pacific-deep-300');
		expect(helperText.className).toContain('mt-[7.5px]');
		expect(helperText.className).toContain('text-cinemata-sunset-horizon-400p');
	});

	it('supports shell padding overrides via className and forwards input props', () => {
		render(<TextField label="Custom field" className="px-4" name="headline" defaultValue="Blue Boat" />);

		const input = screen.getByLabelText('Custom field');
		const container = input.parentElement.parentElement;

		expect(container.className).toContain('px-4');
		expect(input).toHaveAttribute('name', 'headline');
		expect(input).toHaveValue('Blue Boat');
	});

	it('uses focus-within classes for active styling without extra props', () => {
		render(<TextField label="Focused field" />);

		const input = screen.getByLabelText('Focused field');
		const shell = input.parentElement;

		expect(shell.className).toContain('focus-within:border-cinemata-sunset-horizon-400p');
		expect(shell.className).toContain('focus-within:bg-cinemata-pacific-deep-900');
	});

	it('uses error tokens and aria-invalid when invalid', () => {
		render(<TextField label="Title" helperText="Title is required." invalid />);

		const input = screen.getByLabelText('Title');
		const shell = input.parentElement;
		const label = screen.getByText('Title');
		const helperText = screen.getByText('Title is required.');

		expect(shell.className).toContain('border-cinemata-red-500');
		expect(label.className).toContain('text-cinemata-red-50');
		expect(helperText.className).toContain('text-cinemata-red-500');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription('Title is required.');
	});

	it('disables input semantics and disabled color tokens', () => {
		render(<TextField label="Disabled field" helperText="Read only for now." disabled defaultValue="Blue Boat" />);

		const input = screen.getByLabelText('Disabled field');
		const shell = input.parentElement;
		const label = screen.getByText('Disabled field');

		expect(input).toBeDisabled();
		expect(shell.className).toContain('cursor-not-allowed');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(input.className).toContain('text-cinemata-pacific-deep-300');
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
