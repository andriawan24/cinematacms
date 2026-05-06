import { useState } from 'react';
import { expect, within, userEvent } from 'storybook/test';
import { RadioButton } from './RadioButton';

const meta = {
	title: 'Components/Inputs/Radio Button',
	component: RadioButton,
	tags: ['autodocs'],
	args: {
		children: 'Public',
		checked: false,
	},
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'Whether the radio button is selected',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the radio button is disabled',
		},
		children: {
			control: 'text',
			description: 'Label text displayed next to the radio button',
		},
		name: {
			control: 'text',
			description: 'Name attribute for grouping radio buttons',
		},
		value: {
			control: 'text',
			description: 'Value of the radio button',
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'A radio button component with a circular indicator and label text. Uses sunset-horizon/400P for checked state and pacific-deep/900 for unchecked.',
			},
		},
	},
};

export default meta;

export const Unchecked = {
	args: {
		children: 'Private',
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const label = canvas.getByText('Private');

		await expect(label).toBeVisible();
	},
};

export const Checked = {
	args: {
		children: 'Public',
		checked: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const radio = canvas.getByRole('radio');

		await expect(radio).toBeChecked();
	},
};

export const Disabled = {
	args: {
		children: 'Unavailable',
		checked: false,
		disabled: true,
	},
};

export const DisabledChecked = {
	args: {
		children: 'Locked option',
		checked: true,
		disabled: true,
	},
};

export const Group = {
	render: function RadioGroup() {
		const [selected, setSelected] = useState('public');

		return (
			<div className="flex flex-col gap-6">
				<RadioButton
					name="visibility"
					value="public"
					checked={selected === 'public'}
					onChange={() => setSelected('public')}
				>
					Public
				</RadioButton>
				<RadioButton
					name="visibility"
					value="private"
					checked={selected === 'private'}
					onChange={() => setSelected('private')}
				>
					Private
				</RadioButton>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const radios = canvas.getAllByRole('radio');

		await expect(radios).toHaveLength(2);
		await expect(radios[0]).toBeChecked();
		await expect(radios[1]).not.toBeChecked();

		await userEvent.click(radios[1]);
		await expect(radios[1]).toBeChecked();
		await expect(radios[0]).not.toBeChecked();
	},
};
