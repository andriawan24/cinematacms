import { screen } from '@testing-library/react';
import { act } from 'react';
import { renderModernPage } from './renderModernPage';

vi.mock('./components/AppLayout', () => ({
	AppLayout: ({ pageSlotId, ContentComponent }) => (
		<div data-testid="modern-layout" data-page-slot={pageSlotId}>
			<ContentComponent />
		</div>
	),
}));

describe('renderModernPage', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('mounts page content through the modern shell without the legacy helper', async () => {
		document.body.innerHTML = '<div id="app-root"></div>';

		function HomePage() {
			return <div>Modern home</div>;
		}

		let root;
		await act(async () => {
			root = renderModernPage('page-home', HomePage);
		});

		expect(screen.getByTestId('modern-layout')).toHaveAttribute('data-page-slot', 'page-home');
		expect(screen.getByText('Modern home')).toBeInTheDocument();

		await act(async () => root.unmount());
	});

	it('returns null when the modern mount node is absent', () => {
		expect(renderModernPage('page-home', () => null)).toBeNull();
	});
});
