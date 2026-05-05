import { render, screen } from '@testing-library/react';
import { TextAlert } from './TextAlert';

describe('TextAlert', () => {
	it('renders a full-width alert row with the requested icon, typography, and color classes', () => {
		render(<TextAlert>Uploads are still processing.</TextAlert>);

		const alert = screen.getByRole('alert');
		const icon = alert.querySelector('svg[data-icon="infoCircle"]');

		expect(alert.className).toContain('body-body-16-regular');
		expect(alert.className).toContain('flex');
		expect(alert.className).toContain('items-center');
		expect(alert.className).toContain('w-full');
		expect(alert.className).toContain('text-cinemata-sunset-horizon-400p');
		expect(alert).toHaveTextContent('Uploads are still processing.');
		expect(icon).not.toBeNull();
		expect(icon).toHaveStyle({ width: '24px', height: '24px' });
	});

	it('supports className overrides while keeping the base layout', () => {
		render(<TextAlert className="max-w-[420px]">Uploads are still processing.</TextAlert>);

		const alert = screen.getByRole('alert');

		expect(alert.className).toContain('w-full');
		expect(alert.className).toContain('max-w-[420px]');
	});

	it('allows the container role to be customized', () => {
		render(<TextAlert role="status">Uploads are still processing.</TextAlert>);

		expect(screen.getByRole('status')).toHaveTextContent('Uploads are still processing.');
	});
});
