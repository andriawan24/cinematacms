import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { TabContent, TabView } from './TabView';

const sampleTabs = [
	{ value: 'single', label: 'Single Film Upload' },
	{ value: 'bulk', label: 'Bulk Upload' },
	{ value: 'review', label: 'Review Settings', disabled: true },
];

function renderTabContent(tab) {
	const content = {
		single: 'Upload one title.',
		bulk: 'Upload many titles.',
		review: 'Review the selected settings.',
	};

	return <p>{content[tab.value]}</p>;
}

describe('TabView', () => {
	it('renders the generated tab list with the initial active tab', () => {
		render(
			<TabView defaultValue="single-film-upload" aria-label="Upload mode">
				<TabContent title="Single Film Upload" content={<p>Upload one title.</p>} />
				<TabContent title="Bulk Upload" content={<p>Upload many titles.</p>} />
			</TabView>
		);

		const selectedTab = screen.getByRole('tab', { name: 'Single Film Upload' });

		expect(screen.getByRole('tablist', { name: 'Upload mode' })).toBeInTheDocument();
		expect(selectedTab).toHaveAttribute('aria-selected', 'true');
	});

	it('supports wrap-content tab sizing mode', () => {
		render(
			<TabView defaultValue="single-film-upload" aria-label="Upload mode" tabMode="wrap">
				<TabContent title="Single Film Upload" content={<p>Upload one title.</p>} />
				<TabContent title="Bulk Upload" content={<p>Upload many titles.</p>} />
			</TabView>
		);

		const selectedTab = screen.getByRole('tab', { name: 'Single Film Upload' });

		expect(screen.getByRole('tablist', { name: 'Upload mode' })).toBeInTheDocument();
		expect(selectedTab).toHaveAttribute('aria-selected', 'true');
	});

	it('switches panels in the simple TabContent API when a tab is clicked', async () => {
		const user = userEvent.setup();
		render(
			<TabView defaultValue="single-film-upload" aria-label="Upload mode">
				<TabContent title="Single Film Upload" content={<p>Upload one title.</p>} />
				<TabContent title="Bulk Upload" content={<p>Upload many titles.</p>} />
			</TabView>
		);

		const bulkTab = screen.getByRole('tab', { name: 'Bulk Upload' });

		await user.click(bulkTab);

		expect(bulkTab).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('tabpanel')).toHaveTextContent('Upload many titles.');
	});

	it('supports controlled selection changes in the simple TabContent API', async () => {
		const user = userEvent.setup();

		function ControlledExample() {
			const [selectedTab, setSelectedTab] = useState('single');
			return (
				<TabView selectedTab={selectedTab} onSelectedTabChange={setSelectedTab} aria-label="Upload mode">
					<TabContent value="single" title="Single Film Upload" content={<p>Upload one title.</p>} />
					<TabContent value="bulk" title="Bulk Upload" content={<p>Upload many titles.</p>} />
				</TabView>
			);
		}

		render(<ControlledExample />);

		const bulkTab = screen.getByRole('tab', { name: 'Bulk Upload' });

		await user.click(bulkTab);

		expect(bulkTab).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('tabpanel')).toHaveTextContent('Upload many titles.');
	});

	it('supports defaultSelectedTab for the simple TabContent API', () => {
		render(
			<TabView defaultSelectedTab="bulk" aria-label="Upload mode">
				<TabContent value="single" title="Single Film Upload" content={<p>Upload one title.</p>} />
				<TabContent value="bulk" title="Bulk Upload" content={<p>Upload many titles.</p>} />
			</TabView>
		);

		expect(screen.getByRole('tab', { name: 'Bulk Upload' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('tabpanel')).toHaveTextContent('Upload many titles.');
	});

	it('does not change tabs when ArrowRight is pressed', async () => {
		const user = userEvent.setup();
		render(
			<TabView defaultValue="single-film-upload" aria-label="Upload mode">
				<TabContent title="Single Film Upload" content={<p>Upload one title.</p>} />
				<TabContent title="Bulk Upload" content={<p>Upload many titles.</p>} />
			</TabView>
		);

		const selectedTab = screen.getByRole('tab', { name: 'Single Film Upload' });

		selectedTab.focus();
		await user.keyboard('{ArrowRight}');

		expect(screen.getByRole('tab', { name: 'Single Film Upload' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('tab', { name: 'Single Film Upload' })).toHaveFocus();
		expect(screen.getByRole('tabpanel')).toHaveTextContent('Upload one title.');
	});

	it('supports Home and End keyboard navigation across generated tabs', async () => {
		const user = userEvent.setup();
		render(
			<TabView defaultValue="single-film-upload" aria-label="Upload mode">
				<TabContent title="Single Film Upload" content={<p>Upload one title.</p>} />
				<TabContent title="Bulk Upload" content={<p>Upload many titles.</p>} />
			</TabView>
		);

		const selectedTab = screen.getByRole('tab', { name: 'Single Film Upload' });

		selectedTab.focus();
		await user.keyboard('{End}');
		await waitFor(() => expect(screen.getByRole('tab', { name: 'Bulk Upload' })).toHaveFocus());
		expect(screen.getByRole('tab', { name: 'Bulk Upload' })).toHaveAttribute('aria-selected', 'true');

		await user.keyboard('{Home}');
		await waitFor(() => expect(screen.getByRole('tab', { name: 'Single Film Upload' })).toHaveFocus());
		expect(screen.getByRole('tab', { name: 'Single Film Upload' })).toHaveAttribute('aria-selected', 'true');
	});

	it('still supports the array API with dynamic content', async () => {
		const user = userEvent.setup();
		render(
			<TabView
				tabs={sampleTabs}
				defaultValue="single"
				aria-label="Upload mode"
				renderContent={renderTabContent}
			/>
		);

		await user.click(screen.getByRole('tab', { name: 'Bulk Upload' }));

		expect(screen.getByRole('tabpanel')).toHaveTextContent('Upload many titles.');
	});

	it('still supports the lower-level compound API with TabView.Content', async () => {
		const user = userEvent.setup();

		render(
			<TabView defaultValue="single" aria-label="Upload mode">
				<TabView.List>
					<TabView.Trigger value="single">Single Film Upload</TabView.Trigger>
					<TabView.Trigger value="bulk">Bulk Upload</TabView.Trigger>
				</TabView.List>

				<TabView.Content value="single">
					<p>Compound single upload panel.</p>
				</TabView.Content>

				<TabView.Content value="bulk">
					<p>Compound bulk upload panel.</p>
				</TabView.Content>
			</TabView>
		);

		expect(screen.getByRole('tabpanel')).toHaveTextContent('Compound single upload panel.');

		await user.click(screen.getByRole('tab', { name: 'Bulk Upload' }));

		expect(screen.getByRole('tabpanel')).toHaveTextContent('Compound bulk upload panel.');
	});
});
