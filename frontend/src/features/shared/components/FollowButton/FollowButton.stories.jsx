import { useEffect, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { FollowButton } from './FollowButton';

const meta = {
	title: 'Application/FollowButton',
	component: FollowButton,
	tags: ['autodocs'],
	args: {
		personName: 'Alexandra',
		followed: false,
	},
	argTypes: {
		personName: {
			control: 'text',
		},
		followed: {
			control: 'boolean',
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
