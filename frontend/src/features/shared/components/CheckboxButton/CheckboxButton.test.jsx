import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxButton } from './CheckboxButton';

describe('CheckboxButton', () => {
	it('supports uncontrolled usage through defaultChecked', async () => {
		const user = userEvent.setup();

		render(<CheckboxButton defaultChecked={false}>Require Password</CheckboxButton>);

		const checkbox = screen.getByRole('checkbox', { name: 'Require Password' });
		expect(checkbox).not.toBeChecked();

		await user.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	it('marks controlled usage without onChange as read-only', () => {
		render(<CheckboxButton checked>Require Password</CheckboxButton>);

		expect(screen.getByRole('checkbox', { name: 'Require Password' })).toHaveAttribute('readOnly');
	});
});
