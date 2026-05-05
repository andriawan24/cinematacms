import PropTypes from 'prop-types';

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function RadioButton({
	checked = false,
	children,
	className = '',
	disabled = false,
	name,
	onChange,
	value,
	...props
}) {
	return (
		<label
			className={joinClasses(
				'inline-flex cursor-pointer items-center gap-[8px] select-none',
				disabled && 'cursor-not-allowed opacity-60',
				className
			)}
		>
			<input
				type="radio"
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
					'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-200',
					checked ? 'bg-cinemata-sunset-horizon-400p' : 'bg-cinemata-pacific-deep-900'
				)}
				style={{ width: 18, height: 18, padding: 3 }}
				aria-hidden="true"
			>
				<span
					className="block rounded-full transition-transform duration-200 bg-cinemata-pacific-deep-900"
					style={{ width: 8, height: 8 }}
				/>
			</span>

			{children && <span className="body-body-16-regular text-cinemata-strait-blue-50">{children}</span>}
		</label>
	);
}

RadioButton.propTypes = {
	checked: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};
