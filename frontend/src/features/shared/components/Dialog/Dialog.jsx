import { cloneElement, createContext, isValidElement, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const DialogContext = createContext(null);

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

function callHandler(handler, event) {
	if (typeof handler === 'function') {
		handler(event);
	}
}

function useDialogContext(componentName) {
	const context = useContext(DialogContext);

	if (!context) {
		throw new Error(`${componentName} must be used within Dialog.`);
	}

	return context;
}

export function Dialog({ children, open, defaultOpen = false, onOpenChange }) {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : internalOpen;

	function setOpen(nextOpen) {
		if (!isControlled) {
			setInternalOpen(nextOpen);
		}

		onOpenChange?.(nextOpen);
	}

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		function handleKeyDown(event) {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);

	return <DialogContext.Provider value={{ isOpen, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({ children }) {
	const { isOpen, setOpen } = useDialogContext('DialogTrigger');

	if (!isValidElement(children)) {
		throw new Error('DialogTrigger expects a single valid React element child.');
	}

	return cloneElement(children, {
		'aria-expanded': isOpen,
		'aria-haspopup': 'dialog',
		'data-state': isOpen ? 'open' : 'closed',
		onClick: (event) => {
			callHandler(children.props.onClick, event);

			if (!event.defaultPrevented) {
				setOpen(true);
			}
		},
	});
}

export function DialogClose({ children }) {
	const { isOpen, setOpen } = useDialogContext('DialogClose');

	if (!isValidElement(children)) {
		throw new Error('DialogClose expects a single valid React element child.');
	}

	return cloneElement(children, {
		'aria-expanded': isOpen,
		'data-state': isOpen ? 'open' : 'closed',
		onClick: (event) => {
			callHandler(children.props.onClick, event);

			if (!event.defaultPrevented) {
				setOpen(false);
			}
		},
	});
}

export function DialogContent({
	children,
	className = '',
	overlayClassName = '',
	'aria-label': ariaLabel = 'Dialog',
	closeOnOverlayClick = true,
	...props
}) {
	const { isOpen, setOpen } = useDialogContext('DialogContent');
	const contentRef = useRef(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		contentRef.current?.focus();
	}, [isOpen]);

	if (!isOpen || typeof document === 'undefined') {
		return null;
	}

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				aria-hidden="true"
				className={joinClasses('absolute inset-0 bg-cinemata-pacific-deep-950 opacity-80', overlayClassName)}
				onClick={() => {
					if (closeOnOverlayClick) {
						setOpen(false);
					}
				}}
			/>

			<div
				{...props}
				ref={contentRef}
				role="dialog"
				aria-modal="true"
				aria-label={ariaLabel}
				tabIndex={-1}
				data-state="open"
				className={joinClasses(
					'relative z-10 w-full max-w-[480px] rounded-[8px] bg-cinemata-pacific-deep-800 p-6 text-cinemata-strait-blue-50 outline-none',
					className
				)}
			>
				{children}
			</div>
		</div>,
		document.body
	);
}

Dialog.Trigger = DialogTrigger;
Dialog.Close = DialogClose;
Dialog.Content = DialogContent;
