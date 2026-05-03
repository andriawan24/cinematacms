import { expect, within } from 'storybook/test';
import { Icon } from './Icon';

const meta = {
	title: 'Design System/Icon',
	component: Icon,
	tags: ['autodocs'],
	args: {
		name: 'notificationBell',
		size: 'sm',
		decorative: true,
	},
	argTypes: {
		name: {
			control: 'select',
			options: [
				'notificationBell',
				'followUser',
				'check',
				'spark',
				'exampleIcon',
				'iconCommentBlue',
				'iconAddedFavorite',
				'iconThumbsUpRed',
			],
		},
		size: {
			control: 'radio',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
		label: {
			control: 'text',
		},
		decorative: {
			control: 'boolean',
		},
	},
};

export default meta;

export const Decorative = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const icon = canvas.getByTestId('storybook-icon');

		await expect(icon).toBeVisible();
		await expect(icon).toHaveAttribute('data-icon', 'notificationBell');
	},
	args: {
		'data-testid': 'storybook-icon',
	},
};

export const Accessible = {
	args: {
		name: 'followUser',
		decorative: false,
		label: 'Follow user',
		'data-testid': 'storybook-icon',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const icon = canvas.getByRole('img', { name: 'Follow user' });

		await expect(icon).toBeVisible();
	},
};
