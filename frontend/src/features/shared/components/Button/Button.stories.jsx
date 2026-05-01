import { expect, within } from 'storybook/test';
import { Icon } from '../Icon';
import { Button } from './Button';

const meta = {
	title: 'Design System/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'SAVE AS DRAFT',
		variant: 'primary',
		color: 'strait-blue-600p',
	},
	argTypes: {
		color: {
			control: 'radio',
			if: { arg: 'variant', eq: 'text' },
			options: [
				'strait-blue-600p',
				'sunset-horizon-500',
				'pacific-deep-950',
				'red-500',
				'strait-blue-100',
				'strait-blue-400',
				'neutral-600',
			],
		},
		icon: {
			control: false,
		},
		variant: {
			control: 'radio',
			options: ['primary', 'secondary', 'special', 'primary-outline', 'secondary-outline', 'text'],
		},
	},
};

export default meta;

export const Primary = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'SAVE AS DRAFT' });

		await expect(button).toBeVisible();
		await expect(button).toHaveClass('body-body-14-bold');
	},
};

export const PrimaryWithIcon = {
	args: {
		children: 'SAVE AS DRAFT',
		icon: <Icon name="spark" decorative />,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'SAVE AS DRAFT' });

		await expect(button.querySelector('svg')).not.toBeNull();
	},
};

export const Secondary = {
	args: {
		children: 'LEARN MORE',
		variant: 'secondary',
	},
};

export const Special = {
	args: {
		children: 'SEE ALL',
		variant: 'special',
		icon: <Icon name="spark" decorative />,
	},
};

export const PrimaryOutline = {
	args: {
		children: 'SAVE AS DRAFT',
		variant: 'primary-outline',
	},
};

export const SecondaryOutline = {
	args: {
		children: 'LEARN MORE',
		variant: 'secondary-outline',
	},
};

export const Disabled = {
	args: {
		children: 'PROCESSING',
		disabled: true,
	},
};

export const Text = {
	args: {
		children: 'Read more',
		variant: 'text',
		color: 'strait-blue-600p',
	},
};
