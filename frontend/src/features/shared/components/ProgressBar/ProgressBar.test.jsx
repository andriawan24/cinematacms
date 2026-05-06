import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
	it('renders the progressbar and stepped width', () => {
		render(<ProgressBar label="Upload progress" value={20} max={100} />);

		const progressbar = screen.getByRole('progressbar', { name: 'Upload progress' });
		const track = progressbar.firstElementChild;
		const indicator = track?.firstElementChild;

		expect(track).not.toBeNull();
		expect(indicator).not.toBeNull();
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
		expect(indicator).not.toBeNull();
	});

	it('supports custom track and indicator props', () => {
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

		expect(track).not.toBeNull();
		expect(indicator).not.toBeNull();
	});
});
