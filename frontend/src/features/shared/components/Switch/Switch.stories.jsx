import { useState } from 'react';
import { expect, within, userEvent } from 'storybook/test';
import { Switch } from './Switch';

const meta = {
	title: 'Components/Inputs/Switch',
	component: Switch,
	tags: ['autodocs'],
	args: {
		children: 'AUTOPLAY',
		checked: true,
		width: 30,
		indicatorSize: 14,
		padding: 3,
	},
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'Whether switch is active.',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether switch is disabled.',
		},
		children: {
			control: 'text',
			description: 'Label text shown on left side of switch.',
		},
		indicatorSize: {
			control: 'number',
			description: 'Thumb diameter in pixels.',
		},
		name: {
			control: 'text',
			description: 'Name attribute for underlying checkbox input.',
		},
		padding: {
			control: 'number',
			description: 'Inner track padding in pixels.',
		},
		value: {
			control: 'text',
			description: 'Value attribute for underlying checkbox input.',
		},
		width: {
			control: 'number',
			description: 'Track width in pixels. Clamped to component minimum.',
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'A right-aligned switch control with grey/99 thumb and cyan/80 active track, based on the provided autoplay reference. Size is configurable through width, thumb size, and padding.',
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="inline-flex bg-[#1F1F1F] p-8">
				<Story />
			</div>
		),
	],
};

export default meta;

export const On = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('checkbox', { name: 'AUTOPLAY' });

		await expect(input).toBeChecked();
	},
};

export const Off = {
	args: {
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('checkbox', { name: 'AUTOPLAY' });

		await expect(input).not.toBeChecked();
	},
};

export const Disabled = {
	args: {
		disabled: true,
	},
};

export const Interactive = {
	render: function InteractiveSwitch(args) {
		const [checked, setChecked] = useState(args.checked);

		return <Switch {...args} checked={checked} onChange={(event) => setChecked(event.target.checked)} />;
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('checkbox', { name: 'AUTOPLAY' });

		await expect(input).toBeChecked();
		await userEvent.click(input);
		await expect(input).not.toBeChecked();
		await userEvent.click(input);
		await expect(input).toBeChecked();
	},
};

export const Wider = {
	args: {
		width: 52,
		indicatorSize: 14,
		padding: 3,
	},
};
