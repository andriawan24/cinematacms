import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
	it('renders the default token classes and stepped width', () => {
		render(<ProgressBar label="Upload progress" value={20} max={100} />);

		const progressbar = screen.getByRole('progressbar', { name: 'Upload progress' });
		const track = progressbar.firstElementChild;
		const indicator = track?.firstElementChild;

		expect(progressbar.className).toContain('w-full');
		expect(track?.className).toContain('h-2');
		expect(track?.className).toContain('rounded-full');
		expect(track?.className).toContain('bg-cinemata-coral-reef-900');
		expect(indicator?.className).toContain('bg-cinemata-coral-reef-400p');
		expect(indicator?.className).toContain('rounded-l-full');
		expect(indicator?.className).toContain('rounded-r-none');
		expect(indicator).toHaveStyle({ width: '20%' });
	});

	it('exposes accessible progress semantics from value and max', () => {
		render(<ProgressBar label="Encoding progress" value={45} max={90} />);

		const progressbar = screen.getByRole('progressbar', { name: 'Encoding progress' });

		expect(progressbar).toHaveAttribute('aria-valuemin', '0');
		expect(progressbar).toHaveAttribute('aria-valuemax', '90');
		expect(progressbar).toHaveAttribute('aria-valuenow', '45');
	});

	it('clamps overflowing values to a full indicator', () => {
		render(<ProgressBar label="Clamped progress" value={140} max={100} />);

		const progressbar = screen.getByRole('progressbar', { name: 'Clamped progress' });
		const indicator = progressbar.firstElementChild?.firstElementChild;

		expect(progressbar).toHaveAttribute('aria-valuenow', '100');
		expect(indicator).toHaveStyle({ width: '100%' });
		expect(indicator?.className).toContain('rounded-full');
	});

	it('supports custom track and indicator classes', () => {
		render(
			<ProgressBar
				label="Custom progress"
				trackClassName="bg-cinemata-pacific-deep-900"
				indicatorClassName="bg-cinemata-strait-blue-100"
			/>
		);

		const progressbar = screen.getByRole('progressbar', { name: 'Custom progress' });
		const track = progressbar.firstElementChild;
		const indicator = track?.firstElementChild;

		expect(track?.className).toContain('bg-cinemata-pacific-deep-900');
		expect(indicator?.className).toContain('bg-cinemata-strait-blue-100');
	});
});
