const VARIANT_CLASSES = {
	primary: 'border border-transparent bg-cinemata-strait-blue-600p text-cinemata-white hover:bg-cinemata-strait-blue-800',
	secondary:
		'border border-transparent bg-cinemata-sunset-horizon-500 text-cinemata-white hover:bg-cinemata-sunset-horizon-700',
	special:
		'border border-transparent bg-cinemata-pacific-deep-950 text-cinemata-white hover:bg-cinemata-pacific-deep-900',
	'primary-outline':
		'border border-cinemata-strait-blue-600p bg-transparent text-cinemata-strait-blue-600p hover:bg-cinemata-strait-blue-600p hover:text-cinemata-white',
	'secondary-outline':
		'border border-cinemata-sunset-horizon-500 bg-transparent text-cinemata-sunset-horizon-500 hover:bg-cinemata-sunset-horizon-500 hover:text-cinemata-white',
};

function getVariantClasses(variant) {
	return VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;
}

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

function isRightIconVariant(variant) {
	return variant === 'special';
}

export function Button({ children, className = '', icon = null, type = 'button', variant = 'primary', ...props }) {
	const iconElement = icon ? (
		<span
			aria-hidden="true"
			className="inline-flex shrink-0 items-center justify-center [&_img]:h-full [&_img]:w-full [&_svg]:h-full [&_svg]:w-full"
			style={{ width: 'var(--size-20)', height: 'var(--size-20)' }}
		>
			{icon}
		</span>
	) : null;

	return (
		<button
			type={type}
			className={joinClasses(
				'body-body-14-bold inline-flex items-center justify-center gap-(--space-xs) rounded-(--radius-4) px-(--space-base) py-(--size-10) transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
				getVariantClasses(variant),
				'cursor-pointer',
				className
			)}
			{...props}
		>
			{iconElement && !isRightIconVariant(variant) ? iconElement : null}
			<span>{children}</span>
			{iconElement && isRightIconVariant(variant) ? iconElement : null}
		</button>
	);
}
