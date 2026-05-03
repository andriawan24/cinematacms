import { expect, userEvent, within } from 'storybook/test';
import { TextField } from './TextField';

const meta = {
	title: 'Design System/TextField',
	component: TextField,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Atomic text input with Cinemata tokens for default, hover, focus, error, and disabled states. Active styling is driven by native focus, not a separate prop.',
			},
		},
	},
	args: {
		label: 'Enter Title',
		placeholder: 'The Blue Boat',
		helperText: '',
		invalid: false,
		disabled: false,
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Title text shown above input.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		placeholder: {
			control: 'text',
			description: 'Hint text shown when input value is empty.',
			table: {
				type: { summary: 'string' },
			},
		},
		helperText: {
			control: 'text',
			description: 'Optional supporting text shown below field.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		invalid: {
			control: 'boolean',
			description: 'Turns field into error variant and marks input with `aria-invalid`.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disables input and applies disabled token colors.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		className: {
			control: 'text',
			description: 'Optional class for outer container only.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		id: {
			control: 'text',
			description: 'Optional input id. Generated automatically when omitted.',
			table: {
				type: { summary: 'string' },
			},
		},
		type: {
			control: 'text',
			description: 'Native input type forwarded to `<input>`.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'text'" },
			},
		},
		defaultValue: {
			control: 'text',
			description: 'Initial uncontrolled input value.',
			table: {
				type: { summary: 'string' },
			},
		},
		value: {
			control: 'text',
			description: 'Controlled input value.',
			table: {
				type: { summary: 'string' },
			},
		},
		onChange: {
			action: 'changed',
			description: 'Native input change handler.',
			table: {
				type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
			},
		},
		'aria-describedby': {
			control: 'text',
			description: 'Extra description id merged with helper text id when helper exists.',
			table: {
				type: { summary: 'string' },
			},
		},
		'aria-invalid': {
			control: 'boolean',
			description: 'Optional explicit override for native `aria-invalid`.',
			table: {
				type: { summary: 'boolean' },
			},
		},
	},
};

export default meta;

export const Default = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText('Enter Title');

		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute('placeholder', 'The Blue Boat');
	},
};

export const WithHelperText = {
	args: {
		helperText: 'This title appears on cards and detail pages.',
	},
};

export const Focused = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText('Enter Title');

		await userEvent.click(input);
		await expect(input).toHaveFocus();
	},
};

export const Error = {
	args: {
		invalid: true,
		helperText: 'Title is required.',
	},
};

export const Disabled = {
	args: {
		disabled: true,
		defaultValue: 'The Blue Boat',
		helperText: 'Editing unavailable right now.',
	},
};

export const WithHorizontalPadding = {
	args: {
		className: 'px-4',
		helperText: 'Horizontal padding comes from className overrides.',
	},
};
