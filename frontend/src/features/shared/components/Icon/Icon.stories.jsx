import { expect, within } from 'storybook/test';
import { Icon } from './Icon';

const meta = {
	title: 'Components/Display/Icon',
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
				'example',
				'commentBlue',
				'addedFavorite',
				'thumbsUpRed',
				'magnifyingGlass',
				'infoCircle',
				'info3d',
				'eye',
			],
			description: 'Shared icon name resolved from the SVG registry.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'notificationBell'" },
			},
		},
		size: {
			control: 'radio',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description:
				'Predefined icon size token, or a numeric pixel size when passed directly in code. Token mapping: `xs` = 14px, `sm` = 18px, `md` = 24px, `lg` = 32px, `xl` = 40px.',
			table: {
				type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number" },
				defaultValue: { summary: "'md'" },
			},
		},
		label: {
			control: 'text',
			description: 'Accessible label announced when the icon is not decorative.',
			table: {
				type: { summary: 'string' },
			},
		},
		title: {
			control: 'text',
			description: 'Optional SVG title text for additional accessibility context.',
			table: {
				type: { summary: 'string' },
			},
		},
		decorative: {
			control: 'boolean',
			description: 'Marks the icon as decorative and hides it from assistive technology.',
			table: {
				type: { summary: 'boolean' },
			},
		},
		className: {
			control: 'text',
			description: 'Optional extra classes applied to the SVG element.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
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
