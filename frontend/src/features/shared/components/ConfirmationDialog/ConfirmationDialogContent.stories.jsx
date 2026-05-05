import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../Button';
import { Dialog, DialogTrigger } from '../Dialog';
import { ConfirmationDialogContent } from './ConfirmationDialogContent';

const meta = {
	title: 'Components/Overlays/Confirmation Dialog',
	component: ConfirmationDialogContent,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Standardized confirmation dialog content built on top of the shared `Dialog` base. It keeps the layout, typography, decorative corner image, and action row consistent while allowing the title, subtitle, top icon, and button copy to vary.',
			},
		},
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'Primary confirmation title shown beneath the top illustration.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'Submit changes?'" },
			},
		},
		subtitle: {
			control: 'text',
			description: 'Supporting explanation text shown below the title.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'Please review your changes carefully before continuing.'" },
			},
		},
		iconName: {
			control: false,
			description: 'Shared illustration icon displayed above the title.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'info3d'" },
			},
		},
		cancelText: {
			control: 'text',
			description: 'Label used for the left cancel action.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'Cancel'" },
			},
		},
		confirmText: {
			control: 'text',
			description: 'Label used for the right confirmation action.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'Yes, Submit'" },
			},
		},
		closeOnCancel: {
			control: 'boolean',
			description: 'Closes the dialog automatically when the cancel button is clicked.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		closeOnConfirm: {
			control: 'boolean',
			description: 'Closes the dialog automatically when the confirmation button is clicked.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		onCancel: {
			action: 'cancelled',
			description: 'Called when the cancel button is clicked.',
			table: {
				type: { summary: '() => void' },
			},
		},
		onConfirm: {
			action: 'confirmed',
			description: 'Called when the confirmation button is clicked.',
			table: {
				type: { summary: '() => void' },
			},
		},
	},
	args: {
		title: 'Submit changes?',
		subtitle:
			'As a regular user, your video needs to be reviewed by an admin before being published. You will get an email notification after the review.',
		cancelText: 'Cancel',
		confirmText: 'Yes, Submit',
		closeOnCancel: true,
		closeOnConfirm: true,
	},
};

export default meta;

export const Default = {
	render: (args) => (
		<div className="flex min-h-[220px] items-center justify-center">
			<Dialog>
				<DialogTrigger>
					<Button>OPEN CONFIRMATION</Button>
				</DialogTrigger>

				<ConfirmationDialogContent {...args} aria-label="Submit confirmation" />
			</Dialog>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'OPEN CONFIRMATION' }));

		const dialog = within(document.body).getByRole('dialog', { name: 'Submit confirmation' });
		await expect(dialog).toBeVisible();
		await expect(dialog).toHaveTextContent('Submit changes?');
		await expect(dialog.querySelector('svg[data-icon="info3d"]')).not.toBeNull();
	},
};

export const OpenPreview = {
	render: (args) => (
		<Dialog defaultOpen>
			<ConfirmationDialogContent {...args} aria-label="Submit confirmation" />
		</Dialog>
	),
};

export const Controlled = {
	render: (args) => {
		const [open, setOpen] = useState(false);

		return (
			<div className="flex min-h-[220px] items-center justify-center">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger>
						<Button variant="secondary">SHOW CONFIRMATION</Button>
					</DialogTrigger>

					<ConfirmationDialogContent
						{...args}
						aria-label="Controlled confirmation"
						onCancel={() => {
							args.onCancel?.();
						}}
						onConfirm={() => {
							args.onConfirm?.();
						}}
					/>
				</Dialog>
			</div>
		);
	},
};
