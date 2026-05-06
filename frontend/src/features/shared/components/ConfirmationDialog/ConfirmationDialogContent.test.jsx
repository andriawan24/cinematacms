import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { Dialog, DialogTrigger } from '../Dialog';
import { ConfirmationDialogContent } from './ConfirmationDialogContent';

describe('ConfirmationDialogContent', () => {
	it('renders the standardized confirmation shell with the configured title, subtitle, icon, and action buttons', () => {
		render(
			<Dialog defaultOpen>
				<ConfirmationDialogContent
					aria-label="Submit confirmation"
					title="Submit changes?"
					subtitle="Your updated metadata will be published and become visible to collaborators."
				/>
			</Dialog>
		);

		const dialog = screen.getByRole('dialog', { name: 'Submit confirmation' });
		const title = screen.getByRole('heading', { name: 'Submit changes?' });
		const cancelButton = screen.getByRole('button', { name: 'Cancel' });
		const confirmButton = screen.getByRole('button', { name: 'Yes, Submit' });
		const decorativeImage = dialog.querySelector('img');
		const contentSection = title.parentElement;
		const shell = dialog.firstElementChild;

		expect(dialog.className).toContain('max-w-[520px]');
		expect(dialog.className).toContain('min-w-2xl');
		expect(dialog.className).toContain('p-0');
		expect(shell?.className).toContain('rounded-2xl');
		expect(shell?.className).toContain('p-[26px]');
		expect(shell?.className).toContain('border-cinemata-strait-blue-300');
		expect(title.className).toContain('heading-h5-24-medium');
		expect(title.className).toContain('text-cinemata-strait-blue-50');
		expect(contentSection?.className).toContain('items-start');
		expect(contentSection?.className).toContain('text-left');
		expect(
			screen.getByText('Your updated metadata will be published and become visible to collaborators.').className
		).toContain('text-cinemata-pacific-deep-300');
		expect(dialog.querySelector('svg[data-icon="info3d"]')).not.toBeNull();
		expect(cancelButton.className).toContain('bg-cinemata-strait-blue-600p');
		expect(confirmButton.className).toContain('bg-cinemata-sunset-horizon-500');
		expect(decorativeImage).not.toBeNull();
	});

	it('closes by default when cancel is clicked and still calls the cancel handler', async () => {
		const user = userEvent.setup();
		const handleCancel = vi.fn();

		render(
			<Dialog defaultOpen>
				<ConfirmationDialogContent aria-label="Submit confirmation" onCancel={handleCancel} />
			</Dialog>
		);

		await user.click(screen.getByRole('button', { name: 'Cancel' }));

		expect(handleCancel).toHaveBeenCalledTimes(1);
		expect(screen.queryByRole('dialog', { name: 'Submit confirmation' })).toBeNull();
	});

	it('can keep the dialog open after confirm when closeOnConfirm is disabled', async () => {
		const user = userEvent.setup();
		const handleConfirm = vi.fn();

		render(
			<Dialog defaultOpen>
				<ConfirmationDialogContent
					aria-label="Submit confirmation"
					closeOnConfirm={false}
					onConfirm={handleConfirm}
				/>
			</Dialog>
		);

		await user.click(screen.getByRole('button', { name: 'Yes, Submit' }));

		expect(handleConfirm).toHaveBeenCalledTimes(1);
		expect(screen.getByRole('dialog', { name: 'Submit confirmation' })).toBeVisible();
	});

	it('works inside the base dialog trigger flow', async () => {
		const user = userEvent.setup();

		render(
			<Dialog>
				<DialogTrigger>
					<Button>OPEN CONFIRMATION</Button>
				</DialogTrigger>
				<ConfirmationDialogContent aria-label="Submit confirmation" />
			</Dialog>
		);

		await user.click(screen.getByRole('button', { name: 'OPEN CONFIRMATION' }));

		expect(screen.getByRole('dialog', { name: 'Submit confirmation' })).toBeVisible();
	});
});
