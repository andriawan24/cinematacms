import { useEffect, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { GetNotifiedButton } from './GetNotifiedButton';

const meta = {
	title: 'Application/GetNotifiedButton',
	component: GetNotifiedButton,
	tags: ['autodocs'],
	args: {
		notified: false,
	},
	argTypes: {
		notified: {
			control: 'boolean',
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
