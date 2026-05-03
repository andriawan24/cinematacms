import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorField } from './EditorField';

describe('EditorField', () => {
	it('renders label, textarea, helper text, and default token classes', () => {
		render(<EditorField label="Synopsis" placeholder="The Blue Boat sails again" helperText="Visible helper copy" />);

		const textarea = screen.getByLabelText('Synopsis');
		const shell = textarea.parentElement;
		const helperText = screen.getByText('Visible helper copy');

		expect(textarea.tagName).toBe('TEXTAREA');
		expect(textarea).toHaveAttribute('rows', '5');
		expect(shell.className).toContain('bg-cinemata-neutral-50');
		expect(shell.className).toContain('border-cinemata-pacific-deep-500');
		expect(shell.className).toContain('hover:bg-cinemata-pacific-deep-50');
		expect(shell.className).toContain('dark:bg-cinemata-pacific-deep-900');
		expect(textarea.className).toContain('text-cinemata-pacific-deep-900');
		expect(textarea.className).toContain('dark:text-cinemata-strait-blue-50');
		expect(textarea.className).toContain('placeholder:text-cinemata-pacific-deep-400');
		expect(textarea.className).toContain('resize-none');
		expect(helperText.parentElement).toBe(shell);
		expect(helperText.className).toContain('text-cinemata-sunset-horizon-400p');
	});

	it('clamps rows to a minimum of five and allows larger values', () => {
		const { rerender } = render(<EditorField label="Synopsis" rows={2} />);

		expect(screen.getByLabelText('Synopsis')).toHaveAttribute('rows', '5');

		rerender(<EditorField label="Synopsis" rows={8} />);

		expect(screen.getByLabelText('Synopsis')).toHaveAttribute('rows', '8');
	});

	it('supports shell padding overrides and forwards textarea props', () => {
		render(<EditorField label="Notes" className="px-4" name="notes" defaultValue="Blue Boat notes" />);

		const textarea = screen.getByLabelText('Notes');
		const shell = textarea.parentElement;
		const container = shell.parentElement;
		const label = screen.getByText('Notes');

		expect(container.className).toContain('px-4');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(textarea).toHaveAttribute('name', 'notes');
		expect(textarea).toHaveValue('Blue Boat notes');
	});

	it('keeps active state while typing and applies active border colors', async () => {
		const user = userEvent.setup();
		render(<EditorField label="Focused editor" placeholder="Type synopsis" />);

		const textarea = screen.getByLabelText('Focused editor');
		const label = screen.getByText('Focused editor');
		const shell = textarea.parentElement;

		await user.click(textarea);
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(shell.className).toContain('dark:border-cinemata-sunset-horizon-400p');
		expect(textarea.className).toContain('placeholder:text-cinemata-pacific-deep-400');
		expect(textarea.className).toContain('dark:placeholder:text-cinemata-pacific-deep-300');

		await user.type(textarea, 'A');
		expect(label.className).toContain('dark:text-cinemata-pacific-deep-300');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
	});

	it('uses error tokens and aria-invalid when invalid', () => {
		render(<EditorField label="Synopsis" helperText="Synopsis is required." invalid />);

		const textarea = screen.getByLabelText('Synopsis');
		const shell = textarea.parentElement;
		const label = screen.getByText('Synopsis');
		const helperText = screen.getByText('Synopsis is required.');

		expect(shell.className).toContain('border-cinemata-red-500');
		expect(label.className).toContain('text-cinemata-red-500');
		expect(helperText.className).toContain('text-cinemata-red-500');
		expect(textarea).toHaveAttribute('aria-invalid', 'true');
		expect(textarea).toHaveAccessibleDescription('Synopsis is required.');
	});

	it('uses disabled classes and disabled textarea semantics', () => {
		render(<EditorField label="Synopsis" helperText="Read only for now." disabled defaultValue="Blue Boat summary" />);

		const textarea = screen.getByLabelText('Synopsis');
		const shell = textarea.parentElement;
		const label = screen.getByText('Synopsis');

		expect(textarea).toBeDisabled();
		expect(shell.className).toContain('cursor-not-allowed');
		expect(shell.className).toContain('border-cinemata-coral-reef-400p');
		expect(label.className).toContain('text-cinemata-pacific-deep-400');
		expect(textarea.className).toContain('text-cinemata-pacific-deep-400');
	});
});
