import { useEffect, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { FollowButton } from './FollowButton';

const meta = {
	title: 'Components/Actions/Follow Button',
	component: FollowButton,
	tags: ['autodocs'],
	args: {
		personName: 'Alexandra',
		followed: false,
	},
	argTypes: {
		personName: {
			control: 'text',
			description: 'Person name inserted into the default follow label when the button is not active.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		followed: {
			control: 'boolean',
			description: 'Toggles the button between follow and following states.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		className: {
			control: 'text',
			description: 'Optional extra classes applied to the underlying button.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Callback fired when the button is pressed.',
			table: {
				type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
			},
		},
		'aria-label': {
			control: 'text',
			description: 'Optional accessible label override. Defaults to the generated follow/following label.',
			table: {
				type: { summary: 'string' },
			},
		},
	},
};

export default meta;

function InteractiveFollowStory(args) {
	const [followed, setFollowed] = useState(args.followed);

	useEffect(() => {
		setFollowed(args.followed);
	}, [args.followed]);

	return <FollowButton {...args} followed={followed} onClick={() => setFollowed((current) => !current)} />;
}

export const Default = {};

export const Followed = {
	args: {
		followed: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Following' });

		await expect(button).toHaveAttribute('aria-pressed', 'true');
	},
};

export const Interactive = {
	render: (args) => <InteractiveFollowStory {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Follow Alexandra' });

		await userEvent.click(button);
		await expect(canvas.getByRole('button', { name: 'Following' })).toHaveAttribute('aria-pressed', 'true');
	},
};
