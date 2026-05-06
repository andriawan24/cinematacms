function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function Badge({ children = 'Featured', className = '', color = '#111111', style, ...props }) {
	return (
		<span
			{...props}
			className={joinClasses(
				'caption-caption-10-regular inline-flex items-center rounded-[2px] p-1 text-cinemata-neutral-50',
				className
			)}
			style={{
				backgroundColor: color,
				...style,
			}}
		>
			{children}
		</span>
	);
}
