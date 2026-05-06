import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
	it('renders the search input with the specified token classes and trailing icon', () => {
		render(<SearchBar placeholder="Search movie title" aria-label="Search movie title" />);

		const input = screen.getByRole('searchbox', { name: 'Search movie title' });
		const icon = input.parentElement?.querySelector('svg[data-icon="magnifyingGlass"]');

		expect(input).toHaveAttribute('placeholder', 'Search movie title');
		expect(icon).not.toBeNull();
		expect(icon).toHaveStyle({ width: '22px', height: '22px' });
	});

	it('supports custom wrapper props', () => {
		render(<SearchBar data-testid="search-input" aria-label="Search" />);

		expect(screen.getByTestId('search-input')).toHaveAttribute('aria-label', 'Search');
	});

	it('supports uncontrolled defaultValue like TextField', () => {
		render(<SearchBar defaultValue="The Blue Boat" aria-label="Search preset" />);

		const input = screen.getByRole('searchbox', { name: 'Search preset' });

		expect(input).toHaveValue('The Blue Boat');
	});

	it('supports controlled value updates like TextField', async () => {
		const user = userEvent.setup();

		function ControlledSearchBar() {
			const [value, setValue] = useState('The Blue Boat');

			return (
				<SearchBar
					aria-label="Controlled search"
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
			);
		}

		render(<ControlledSearchBar />);

		const input = screen.getByRole('searchbox', { name: 'Controlled search' });

		await user.clear(input);
		await user.type(input, 'Arrival');

		expect(input).toHaveValue('Arrival');
	});

	it('forwards disabled semantics to the search input', () => {
		render(<SearchBar disabled aria-label="Search disabled" />);

		const input = screen.getByRole('searchbox', { name: 'Search disabled' });

		expect(input).toBeDisabled();
	});
});
