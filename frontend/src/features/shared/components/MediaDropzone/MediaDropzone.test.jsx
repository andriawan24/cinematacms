import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MediaDropzone } from './MediaDropzone';

describe('MediaDropzone', () => {
	it('renders the upload icon, label, and choose-media button with the requested shell classes', () => {
		const { container } = render(<MediaDropzone />);

		const dropzone = container.querySelector('[data-dropzone]');
		const border = container.querySelector('[data-dropzone-border]');
		const button = screen.getByRole('button', { name: 'CHOOSE MEDIA' });
		const icon = container.querySelector('[data-dropzone-icon]');

		expect(dropzone?.className).toContain('w-full');
		expect(dropzone?.className).toContain('rounded-[16px]');
		expect(dropzone?.className).toContain('bg-cinemata-pacific-deep-800');
		expect(dropzone?.className).toContain('py-[60px]');
		expect(border?.className).toContain('rounded-[16px]');
		expect(border?.className).toContain('border-dashed');
		expect(border?.className).toContain('border-cinemata-strait-blue-300');
		expect(screen.getByText('Drag & Drop Files(s) or').className).toContain('body-body-16-regular');
		expect(screen.getByText('Drag & Drop Files(s) or').className).toContain('text-cinemata-strait-blue-50');
		expect(button).toBeVisible();
		expect(icon).not.toBeNull();
	});

	it('clicks the hidden file input when the button is pressed', async () => {
		const user = userEvent.setup();
		const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});

		render(<MediaDropzone />);

		await user.click(screen.getByRole('button', { name: 'CHOOSE MEDIA' }));

		expect(clickSpy).toHaveBeenCalledTimes(1);
		clickSpy.mockRestore();
	});

	it('emits dropped files and resets the dragging state', () => {
		const handleFilesSelected = vi.fn();
		const { container } = render(<MediaDropzone onFilesSelected={handleFilesSelected} />);
		const dropzone = container.querySelector('[data-dropzone]');
		const file = new File(['video'], 'trailer.mp4', { type: 'video/mp4' });

		fireEvent.dragEnter(dropzone, { dataTransfer: { files: [file] } });
		expect(dropzone).toHaveAttribute('data-dragging', 'true');

		fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });

		expect(handleFilesSelected).toHaveBeenCalledWith([file]);
		expect(dropzone).toHaveAttribute('data-dragging', 'false');
	});

	it('emits selected files from the hidden input change event', () => {
		const handleFilesSelected = vi.fn();
		const { container } = render(<MediaDropzone onFilesSelected={handleFilesSelected} />);
		const input = container.querySelector('input[type="file"]');
		const file = new File(['image'], 'poster.png', { type: 'image/png' });

		fireEvent.change(input, { target: { files: [file] } });

		expect(handleFilesSelected).toHaveBeenCalledWith([file]);
	});
});
