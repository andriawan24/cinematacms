import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';

describe('Dialog', () => {
	it('opens the dialog content from the trigger and renders it in a centered overlay', async () => {
		const user = userEvent.setup();

		render(
			<Dialog>
				<DialogTrigger>
					<Button>OPEN DIALOG</Button>
				</DialogTrigger>
				<DialogContent aria-label="Upload dialog">
					<div>
						<h2>Upload confirmation</h2>
						<p>Your media is ready to be reviewed before publishing.</p>
					</div>
				</DialogContent>
			</Dialog>
		);

		await user.click(screen.getByRole('button', { name: 'OPEN DIALOG' }));

		const dialog = screen.getByRole('dialog', { name: 'Upload dialog' });

		expect(dialog).toBeVisible();
		expect(dialog.className).toContain('max-w-[480px]');
		expect(dialog.className).toContain('bg-cinemata-pacific-deep-800');
		expect(dialog.parentElement?.className).toContain('fixed');
		expect(dialog.parentElement?.className).toContain('items-center');
		expect(dialog.parentElement?.className).toContain('justify-center');
		expect(document.body.querySelector('.bg-cinemata-pacific-deep-950')).not.toBeNull();
	});

	it('closes when the overlay is clicked', async () => {
		const user = userEvent.setup();

		render(
			<Dialog defaultOpen>
				<DialogContent aria-label="Upload dialog">Dialog body</DialogContent>
			</Dialog>
		);

		const overlay = document.body.querySelector('.bg-cinemata-pacific-deep-950');
		expect(screen.getByRole('dialog', { name: 'Upload dialog' })).toBeVisible();

		await user.click(overlay);

		expect(screen.queryByRole('dialog', { name: 'Upload dialog' })).toBeNull();
	});

	it('supports controlled open state changes', async () => {
		const user = userEvent.setup();
		const handleOpenChange = vi.fn();

		function ControlledDialog() {
			return (
				<Dialog open={true} onOpenChange={handleOpenChange}>
					<DialogTrigger>
						<Button>OPEN DIALOG</Button>
					</DialogTrigger>
					<DialogContent aria-label="Controlled dialog">Dialog body</DialogContent>
				</Dialog>
			);
		}

		render(<ControlledDialog />);

		const overlay = document.body.querySelector('.bg-cinemata-pacific-deep-950');
		await user.click(overlay);

		expect(handleOpenChange).toHaveBeenCalledWith(false);
		expect(screen.getByRole('dialog', { name: 'Controlled dialog' })).toBeVisible();
	});

	it('closes when escape is pressed', async () => {
		const user = userEvent.setup();

		render(
			<Dialog defaultOpen>
				<DialogContent aria-label="Escape dialog">Dialog body</DialogContent>
			</Dialog>
		);

		expect(screen.getByRole('dialog', { name: 'Escape dialog' })).toBeVisible();

		await user.keyboard('{Escape}');

		expect(screen.queryByRole('dialog', { name: 'Escape dialog' })).toBeNull();
	});
});
