import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';

export function GetNotifiedButton({
	notified = false,
	className = '',
	onMouseEnter,
	onMouseLeave,
	...props
}) {
	const [hovered, setHovered] = useState(false);
	const bellIconRef = useRef(null);
	const previousNotifiedRef = useRef(notified);

	useEffect(() => {
		if (notified && !previousNotifiedRef.current) {
			bellIconRef.current?.animate?.(
				[
					{ transform: 'translateX(0)' },
					{ transform: 'translateX(-2px)' },
					{ transform: 'translateX(2px)' },
					{ transform: 'translateX(-2px)' },
					{ transform: 'translateX(0)' },
				],
				{
					duration: 220,
					easing: 'ease-in-out',
				}
			);
		}

		previousNotifiedRef.current = notified;
	}, [notified]);

	const style = useMemo(() => {
		return {
			backgroundColor: hovered ? 'var(--cinemata-strait-blue-800)' : 'var(--cinemata-strait-blue-700)',
			borderColor: 'transparent',
			borderStyle: 'solid',
			borderWidth: '1px',
			color: 'var(--cinemata-neutral-50)',
		};
	}, [hovered]);

	return (
		<Button
			variant="text"
			className={className}
			aria-label={props['aria-label'] ?? 'Get Notified'}
			aria-pressed={notified}
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
			<span className="inline-flex items-center justify-center gap-(--space-xs) leading-none">
				<span
					ref={bellIconRef}
					aria-hidden="true"
					className="inline-flex shrink-0 items-center justify-center leading-none [&_svg]:h-full [&_svg]:w-full"
					style={{ width: 'var(--size-20)', height: 'var(--size-20)' }}
				>
					<Icon name="notificationBell" decorative data-testid="bell-icon" size="sm" />
				</span>
				{notified ? (
					<span
						aria-hidden="true"
						className="inline-flex shrink-0 items-center justify-center leading-none [&_svg]:h-full [&_svg]:w-full"
						style={{ width: 'var(--size-20)', height: 'var(--size-20)' }}
					>
						<Icon name="check" decorative data-testid="check-icon" size="sm" />
					</span>
				) : (
					<span>Get Notified</span>
				)}
			</span>
		</Button>
	);
}
