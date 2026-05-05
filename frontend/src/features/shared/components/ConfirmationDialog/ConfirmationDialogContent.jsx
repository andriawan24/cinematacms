import cornerDecoration from './assets/confirmation-corner.webp';
import { Button } from '../Button';
import { DialogClose, DialogContent } from '../Dialog';
import { Icon } from '../Icon';

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

function renderActionButton(button, shouldClose) {
	return shouldClose ? <DialogClose>{button}</DialogClose> : button;
}

export function ConfirmationDialogContent({
	title = 'Submit changes?',
	subtitle = 'Please review your changes carefully before continuing.',
	iconName = 'info3d',
	cancelText = 'Cancel',
	confirmText = 'Yes, Submit',
	onCancel,
	onConfirm,
	closeOnCancel = true,
	closeOnConfirm = true,
	cancelButtonProps = {},
	confirmButtonProps = {},
	decorationSrc = cornerDecoration,
	decorationAlt = '',
	className = '',
	...props
}) {
	const cancelButton = (
		<Button type="button" variant="primary" onClick={onCancel} {...cancelButtonProps}>
			{cancelText}
		</Button>
	);

	const confirmButton = (
		<Button type="button" variant="secondary" onClick={onConfirm} {...confirmButtonProps}>
			{confirmText}
		</Button>
	);

	return (
		<DialogContent
			{...props}
			className={joinClasses('max-w-[520px] min-w-2xl bg-transparent p-0 text-left shadow-none', className)}
		>
			<div
				className="relative overflow-hidden p-[26px] border-[0.5px] rounded-2xl  border-cinemata-strait-blue-300"
				style={{
					background:
						'linear-gradient(135deg, var(--cinemata-pacific-deep-900) 0%, var(--cinemata-pacific-deep-950) 100%)',
				}}
			>
				{decorationSrc ? (
					<img
						src={decorationSrc}
						alt={decorationAlt}
						aria-hidden={decorationAlt ? undefined : 'true'}
						className="pointer-events-none absolute right-0 bottom-0 w-[160px] max-w-[52%] object-contain"
					/>
				) : null}

				<div className="relative z-10 flex flex-col">
					<div className="flex flex-col items-start text-left">
						<Icon name={iconName} size={68} decorative className="shrink-0" />
						<h2 className="heading-h5-24-medium p-0 m-0 mt-4 text-cinemata-strait-blue-50">{title}</h2>
						<p className="body-body-16-regular p-0 m-0 mt-2 text-cinemata-pacific-deep-300">{subtitle}</p>
					</div>

					<div className="relative z-10 mt-8 flex justify-end gap-4">
						{renderActionButton(cancelButton, closeOnCancel)}
						{renderActionButton(confirmButton, closeOnConfirm)}
					</div>
				</div>
			</div>
		</DialogContent>
	);
}
