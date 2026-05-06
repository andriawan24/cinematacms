import { render, screen } from '@testing-library/react';
import { TextAlert } from './TextAlert';

describe('TextAlert', () => {
	it('renders a full-width alert row with the requested icon, typography, and color classes', () => {
		render(<TextAlert>Uploads are still processing.</TextAlert>);

		const alert = screen.getByRole('alert');
		const icon = alert.querySelector('svg[data-icon="infoCircle"]');

		expect(alert).toHaveTextContent('Uploads are still processing.');
		expect(icon).not.toBeNull();
		expect(icon).toHaveStyle({ width: '24px', height: '24px' });
	});

	it('supports custom wrapper props', () => {
		render(<TextAlert data-testid="text-alert">Uploads are still processing.</TextAlert>);

		expect(screen.getByTestId('text-alert')).toHaveTextContent('Uploads are still processing.');
	});

	it('allows the container role to be customized', () => {
		render(<TextAlert role="status">Uploads are still processing.</TextAlert>);

		expect(screen.getByRole('status')).toHaveTextContent('Uploads are still processing.');
	});
});
