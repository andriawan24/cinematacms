import { useState } from 'react';
import { expect, within, userEvent } from 'storybook/test';
import { CheckboxButton } from './CheckboxButton';

const meta = {
	title: 'Components/Inputs/Checkbox Button',
	component: CheckboxButton,
	tags: ['autodocs'],
	args: {
		children: 'Require Password',
		checked: false,
	},
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'Whether the checkbox is selected',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the checkbox is disabled',
		},
		children: {
			control: 'text',
			description: 'Label text displayed next to the checkbox',
		},
		name: {
			control: 'text',
			description: 'Name attribute for the checkbox',
		},
		value: {
			control: 'text',
			description: 'Value of the checkbox',
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					'A checkbox component with a square indicator and checklist icon. Uses sunset-horizon/400P for checked state and pacific-deep/900 for unchecked.',
			},
		},
	},
};

export default meta;

export const Unchecked = {
	args: {
		children: 'Require Password',
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const label = canvas.getByText('Require Password');

		await expect(label).toBeVisible();
	},
};

export const Checked = {
	args: {
		children: 'Require Password',
		checked: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');

		await expect(checkbox).toBeChecked();
	},
};

export const Disabled = {
	args: {
		children: 'Unavailable option',
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

export const Interactive = {
	render: function InteractiveCheckbox() {
		const [checked, setChecked] = useState(false);

		return (
			<CheckboxButton
				name="password"
				checked={checked}
				onChange={(e) => setChecked(e.target.checked)}
			>
				Require Password
			</CheckboxButton>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');

		await expect(checkbox).not.toBeChecked();

		await userEvent.click(checkbox);
		await expect(checkbox).toBeChecked();

		await userEvent.click(checkbox);
		await expect(checkbox).not.toBeChecked();
	},
};

export const MultipleCheckboxes = {
	render: function MultipleCheckboxesExample() {
		const [values, setValues] = useState({ password: true, notify: false, archive: false });

		const toggle = (key) =>
			setValues((prev) => ({ ...prev, [key]: !prev[key] }));

		return (
			<div className="flex flex-col gap-6">
				<CheckboxButton
					name="password"
					checked={values.password}
					onChange={() => toggle('password')}
				>
					Require Password
				</CheckboxButton>
				<CheckboxButton
					name="notify"
					checked={values.notify}
					onChange={() => toggle('notify')}
				>
					Send Notifications
				</CheckboxButton>
				<CheckboxButton
					name="archive"
					checked={values.archive}
					onChange={() => toggle('archive')}
				>
					Auto Archive
				</CheckboxButton>
			</div>
		);
	},
};
