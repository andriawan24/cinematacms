import { expect, within } from 'storybook/test';
import { TextAlert } from './TextAlert';

const meta = {
	title: 'Components/Display/Text Alert',
	component: TextAlert,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Inline alert text with a leading `info-circle` icon, `body-body-16-regular` typography, and `sunset-horizon/400p` color. It fills the available container width by default.',
			},
		},
	},
	args: {
		children: 'Uploads are still processing and may take a few minutes to appear.',
	},
	argTypes: {
		children: {
			control: 'text',
			description: 'Alert text content shown to the right of the icon.',
			table: {
				type: { summary: 'ReactNode' },
				defaultValue: { summary: "'Alert message'" },
			},
		},
		iconName: {
			control: false,
			description: 'Shared icon name rendered on the left side of the alert.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'infoCircle'" },
			},
		},
		role: {
			control: 'text',
			description: 'Accessible landmark role announced for the alert container.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'alert'" },
			},
		},
		className: {
			control: 'text',
			description: 'Optional class applied to the outer full-width alert row.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
	},
	render: (args) => (
		<div className="w-full min-w-[320px] max-w-[520px]">
			<TextAlert {...args} />
		</div>
	),
};

export default meta;

export const Default = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const alert = canvas.getByRole('alert');

		await expect(alert).toBeVisible();
		await expect(alert).toHaveTextContent('Uploads are still processing and may take a few minutes to appear.');
		await expect(alert.querySelector('svg[data-icon="infoCircle"]')).not.toBeNull();
	},
};

export const LongMessage = {
	args: {
		children:
			'This media is still being reviewed by the editorial team, so changes to metadata, thumbnails, and publishing settings may not appear immediately across every surface.',
	},
};
