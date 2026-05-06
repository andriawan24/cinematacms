import PropTypes from 'prop-types';
import { Icon } from '../Icon';

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function CheckboxButton({
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
					'inline-flex shrink-0 items-center justify-center transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-cinemata-sunset-horizon-400p peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cinemata-pacific-deep-900',
					checked ? 'bg-cinemata-sunset-horizon-400p' : 'bg-cinemata-pacific-deep-900'
				)}
				style={{ width: 18, height: 18 }}
				aria-hidden="true"
			>
				<Icon
					name="checklist"
					decorative
					size={14}
					className={joinClasses(
						'transition-opacity duration-200',
						checked ? 'text-cinemata-pacific-deep-900 opacity-100' : 'opacity-0'
					)}
				/>
			</span>

			{children && <span className="body-body-16-regular text-cinemata-strait-blue-50">{children}</span>}
		</label>
	);
}

CheckboxButton.propTypes = {
	checked: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};
