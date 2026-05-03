import { forwardRef, useId } from 'react';

const SHELL_VARIANT_CLASSES = {
	default:
		'bg-cinemata-neutral-50 border-cinemata-pacific-deep-500 hover:bg-cinemata-pacific-deep-50 focus-within:bg-cinemata-neutral-50 focus-within:border-cinemata-coral-reef-400p dark:bg-cinemata-pacific-deep-900 dark:hover:bg-cinemata-pacific-deep-500 dark:focus-within:bg-cinemata-pacific-deep-900 dark:focus-within:border-cinemata-sunset-horizon-400p',
	error:
		'bg-cinemata-neutral-50 border-cinemata-red-500 dark:bg-cinemata-pacific-deep-900 dark:border-cinemata-red-500',
	disabled:
		'bg-cinemata-pacific-deep-50 border-cinemata-coral-reef-400p dark:bg-cinemata-pacific-deep-900 dark:border-cinemata-red-500',
};

const LABEL_VARIANT_CLASSES = {
	default:
		'text-cinemata-pacific-deep-900 group-hover:text-cinemata-pacific-deep-900 group-focus-within:text-cinemata-strait-blue-50 dark:text-cinemata-strait-blue-50 dark:group-hover:text-cinemata-strait-blue-50 dark:group-focus-within:text-cinemata-strait-blue-50',
	error: 'text-cinemata-red-500 dark:text-cinemata-red-50',
	disabled: 'text-cinemata-pacific-deep-400 dark:text-cinemata-pacific-deep-400',
};

const INPUT_VARIANT_CLASSES = {
	default:
		'text-cinemata-pacific-deep-900 group-hover:text-cinemata-strait-blue-50 group-focus-within:text-cinemata-strait-blue-50 dark:text-cinemata-strait-blue-50 dark:group-hover:text-cinemata-strait-blue-50 dark:group-focus-within:text-cinemata-strait-blue-50',
	error: 'text-cinemata-strait-blue-50 dark:text-cinemata-strait-blue-50',
	disabled: 'text-cinemata-pacific-deep-400 dark:text-cinemata-pacific-deep-300',
};

const PLACEHOLDER_VARIANT_CLASSES = {
	default:
		'placeholder:text-cinemata-pacific-deep-400 group-hover:placeholder:text-cinemata-pacific-deep-400 group-focus-within:placeholder:text-cinemata-pacific-deep-300 dark:placeholder:text-cinemata-pacific-deep-300 dark:group-hover:placeholder:text-cinemata-pacific-deep-300 dark:group-focus-within:placeholder:text-cinemata-pacific-deep-300',
	error: 'placeholder:text-cinemata-pacific-deep-300 dark:placeholder:text-cinemata-pacific-deep-300',
	disabled: 'placeholder:text-cinemata-pacific-deep-400 dark:placeholder:text-cinemata-pacific-deep-300',
};

const HELPER_VARIANT_CLASSES = {
	default: 'text-cinemata-sunset-horizon-400p dark:text-cinemata-sunset-horizon-400p',
	error: 'text-cinemata-red-500 dark:text-cinemata-red-500',
	disabled: 'text-cinemata-sunset-horizon-400p dark:text-cinemata-sunset-horizon-400p',
};

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

export const TextField = forwardRef(function TextField(
	{
		className = '',
		disabled = false,
		helperText = '',
		id,
		invalid = false,
		label = '',
		type = 'text',
		'aria-describedby': ariaDescribedBy,
		'aria-invalid': ariaInvalid,
		...props
	},
	ref
) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const variant = disabled ? 'disabled' : invalid ? 'error' : 'default';
	const helperTextId = helperText ? `${inputId}-helper-text` : undefined;
	const describedBy = [ariaDescribedBy, helperTextId].filter(Boolean).join(' ') || undefined;

	return (
		<div className={joinClasses('w-max max-w-full', className)}>
			<div
				className={joinClasses(
					'group w-full border-b px-0 py-[14px] transition-colors duration-200',
					SHELL_VARIANT_CLASSES[variant],
					disabled ? 'cursor-not-allowed' : ''
				)}
			>
				{label ? (
					<label htmlFor={inputId} className={joinClasses('body-body-16-regular mb-2 block', LABEL_VARIANT_CLASSES[variant])}>
						{label}
					</label>
				) : null}

				<input
					{...props}
					ref={ref}
					id={inputId}
					type={type}
					disabled={disabled}
					aria-describedby={describedBy}
					aria-invalid={ariaInvalid ?? (invalid || undefined)}
					className={joinClasses(
						'body-body-16-regular block w-full border-none bg-transparent p-0 outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed',
						INPUT_VARIANT_CLASSES[variant],
						PLACEHOLDER_VARIANT_CLASSES[variant]
					)}
				/>
			</div>

			{helperText ? (
				<p id={helperTextId} className={joinClasses('body-body-12-regular mt-[7.5px]', HELPER_VARIANT_CLASSES[variant])}>
					{helperText}
				</p>
			) : null}
		</div>
	);
});
