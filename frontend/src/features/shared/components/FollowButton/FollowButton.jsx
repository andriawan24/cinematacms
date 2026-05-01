import { useMemo, useState } from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';

function getLabel(personName, followed) {
	if (followed) {
		return 'Following';
	}

	return personName ? `Follow ${personName}` : 'Follow';
}

export function FollowButton({
	personName = '',
	followed = false,
	className = '',
	onMouseEnter,
	onMouseLeave,
	...props
}) {
	const [hovered, setHovered] = useState(false);
	const label = getLabel(personName, followed);

	const style = useMemo(() => {
		if (followed) {
			return {
				backgroundColor: 'transparent',
				borderColor: 'var(--cinemata-sunset-horizon-500)',
				borderStyle: 'solid',
				borderWidth: '1px',
				color: 'var(--cinemata-sunset-horizon-500)',
			};
		}

		return {
			backgroundColor: hovered ? 'var(--cinemata-sunset-horizon-700)' : 'var(--cinemata-sunset-horizon-500)',
			borderColor: 'transparent',
			borderStyle: 'solid',
			borderWidth: '1px',
			color: 'var(--cinemata-neutral-50)',
		};
	}, [followed, hovered]);

	return (
		<Button
			variant="text"
			icon={<Icon name="followUser" decorative data-testid="follow-icon" size="sm" />}
			className={className}
			aria-label={props['aria-label'] ?? label}
			aria-pressed={followed}
			style={style}
			onMouseEnter={(event) => {
				setHovered(true);
				onMouseEnter?.(event);
			}}
			onMouseLeave={(event) => {
				setHovered(false);
				onMouseLeave?.(event);
			}}
			{...props}
		>
			{label}
		</Button>
	);
}
