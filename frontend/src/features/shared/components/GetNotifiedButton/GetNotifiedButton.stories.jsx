import { useEffect, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { GetNotifiedButton } from './GetNotifiedButton';

const meta = {
	title: 'Components/Actions/Get Notified Button',
	component: GetNotifiedButton,
	tags: ['autodocs'],
	args: {
		notified: false,
	},
	argTypes: {
		notified: {
			control: 'boolean',
			description: 'Controls whether the button shows the active notified state.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		className: {
			control: 'text',
			description: 'Optional extra classes applied to the underlying button.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Callback fired when the button is pressed.',
			table: {
				type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
			},
		},
		'aria-label': {
			control: 'text',
			description: 'Optional accessible label override. Defaults to `Get Notified`.',
			table: {
				type: { summary: 'string' },
			},
		},
	},
};

export default meta;

function InteractiveNotifiedStory(args) {
	const [notified, setNotified] = useState(args.notified);

	useEffect(() => {
		setNotified(args.notified);
	}, [args.notified]);

	return <GetNotifiedButton {...args} notified={notified} onClick={() => setNotified((current) => !current)} />;
}

export const Default = {};

export const Active = {
	args: {
		notified: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Get Notified' });

		await expect(button).toHaveAttribute('aria-pressed', 'true');
		await expect(canvas.getByTestId('check-icon')).toBeVisible();
	},
};

export const Interactive = {
	render: (args) => <InteractiveNotifiedStory {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Get Notified' });

		await userEvent.click(button);
		await expect(canvas.getByTestId('check-icon')).toBeVisible();
		await expect(canvas.queryByText('Get Notified')).toBeNull();
	},
};
