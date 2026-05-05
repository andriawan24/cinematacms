import PropTypes from 'prop-types';

const ACTIVE_TRACK_COLOR = '#C7E7EE';
const THUMB_COLOR = '#EEF4F5';

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function Switch({
	checked = false,
	children,
	className = '',
	disabled = false,
	indicatorSize = 14,
	name,
	onChange,
	padding = 3,
	value,
	width = 30,
	...props
}) {
	const resolvedIndicatorSize = Math.max(0, indicatorSize);
	const resolvedPadding = Math.max(0, padding);
	const minWidth = resolvedIndicatorSize + resolvedPadding * 2 + 10;
	const resolvedWidth = Math.max(width, minWidth);
	const trackHeight = resolvedIndicatorSize + resolvedPadding * 2;
	const thumbLeft = checked ? resolvedWidth - resolvedPadding - resolvedIndicatorSize : resolvedPadding;

	return (
		<label
			className={joinClasses(
				'inline-flex cursor-pointer items-center gap-[16px] select-none',
				disabled && 'cursor-not-allowed opacity-60',
				className
			)}
		>
			{children && <span className="body-body-16-regular text-cinemata-neutral-500">{children}</span>}

			<input
				type="checkbox"
				className="peer sr-only"
				checked={checked}
				disabled={disabled}
				name={name}
				value={value}
				onChange={onChange}
				{...props}
			/>

			<span
				className={joinClasses(
					'relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200',
					checked ? '' : 'bg-cinemata-pacific-deep-900'
				)}
				style={{
					width: resolvedWidth,
					height: trackHeight,
					backgroundColor: checked ? ACTIVE_TRACK_COLOR : undefined,
				}}
				data-switch-track=""
				aria-hidden="true"
			>
				<span
					className="absolute block rounded-full transition-[left] duration-200 ease-out"
					style={{
						top: resolvedPadding,
						left: thumbLeft,
						width: resolvedIndicatorSize,
						height: resolvedIndicatorSize,
						backgroundColor: THUMB_COLOR,
					}}
					data-switch-thumb=""
				/>
			</span>
		</label>
	);
}

Switch.propTypes = {
	checked: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	indicatorSize: PropTypes.number,
	name: PropTypes.string,
	onChange: PropTypes.func,
	padding: PropTypes.number,
	value: PropTypes.string,
	width: PropTypes.number,
};
