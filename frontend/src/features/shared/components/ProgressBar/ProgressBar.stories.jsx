import { expect, within } from 'storybook/test';
import { ProgressBar } from './ProgressBar';

const meta = {
	title: 'Components/Display/Progress Bar',
	component: ProgressBar,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Simple shared progress bar with Cinemata coral-reef tokens, an 8px height, and stepped progress based on `value / max`. The track stays rounded while the active fill uses a squared trailing edge until it reaches 100%.',
			},
		},
	},
	args: {
		value: 20,
		max: 100,
		label: 'Upload progress',
	},
	argTypes: {
		value: {
			control: 'number',
			description: 'Current completed amount used to calculate the filled width.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '20' },
			},
		},
		max: {
			control: 'number',
			description: 'Total amount representing 100% progress.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '100' },
			},
		},
		label: {
			control: 'text',
			description: 'Accessible label announced for the progress bar.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "'Progress'" },
			},
		},
		className: {
			control: 'text',
			description: 'Optional extra classes applied to the outer full-width wrapper.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		trackClassName: {
			control: 'text',
			description: 'Optional class overrides for the background track.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		indicatorClassName: {
			control: 'text',
			description: 'Optional class overrides for the filled progress indicator.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
	},
	render: (args) => (
		<div className="w-full min-w-[320px] max-w-[420px]">
			<ProgressBar {...args} />
		</div>
	),
};

export default meta;

export const Default = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const progressbar = canvas.getByRole('progressbar', { name: 'Upload progress' });

		await expect(progressbar).toBeVisible();
		await expect(progressbar).toHaveAttribute('aria-valuenow', '20');
		await expect(progressbar).toHaveAttribute('aria-valuemax', '100');
	},
};

export const Halfway = {
	args: {
		value: 50,
		max: 100,
		label: 'Publishing progress',
	},
};

export const Complete = {
	args: {
		value: 100,
		max: 100,
		label: 'Encoding progress',
	},
};

export const CustomColors = {
	args: {
		value: 65,
		max: 100,
		label: 'Custom progress',
		trackClassName: 'bg-cinemata-pacific-deep-900',
		indicatorClassName: 'bg-cinemata-strait-blue-100',
	},
};
