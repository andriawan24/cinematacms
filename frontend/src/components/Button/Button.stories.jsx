import { Button } from './Button';

function SparkIcon() {
	return (
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10 2L11.9 7.1L17 9L11.9 10.9L10 16L8.1 10.9L3 9L8.1 7.1L10 2Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'SAVE AS DRAFT',
		variant: 'primary',
	},
	argTypes: {
		icon: {
			control: false,
		},
		variant: {
			control: 'radio',
			options: ['primary', 'secondary', 'special', 'primary-outline', 'secondary-outline'],
		},
	},
};

export default meta;

export const Primary = {};

export const PrimaryWithIcon = {
	args: {
		children: 'SAVE AS DRAFT',
		icon: <SparkIcon />,
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
		icon: <SparkIcon />,
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
