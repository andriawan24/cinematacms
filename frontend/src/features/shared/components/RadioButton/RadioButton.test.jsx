import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioButton } from './RadioButton';

describe('RadioButton', () => {
	it('supports uncontrolled usage through defaultChecked', () => {
		render(<RadioButton defaultChecked>Public</RadioButton>);

		expect(screen.getByRole('radio', { name: 'Public' })).toBeChecked();
	});

	it('supports uncontrolled native radio-group changes', async () => {
		const user = userEvent.setup();

		render(
			<div>
				<RadioButton name="visibility" value="public" defaultChecked>
					Public
				</RadioButton>
				<RadioButton name="visibility" value="private">
					Private
				</RadioButton>
			</div>
		);

		const publicRadio = screen.getByRole('radio', { name: 'Public' });
		const privateRadio = screen.getByRole('radio', { name: 'Private' });

		expect(publicRadio).toBeChecked();
		expect(privateRadio).not.toBeChecked();

		await user.click(privateRadio);

		expect(privateRadio).toBeChecked();
		expect(publicRadio).not.toBeChecked();
	});

	it('marks controlled usage without onChange as read-only', () => {
		render(<RadioButton checked>Public</RadioButton>);

		expect(screen.getByRole('radio', { name: 'Public' })).toHaveAttribute('readOnly');
	});
});
