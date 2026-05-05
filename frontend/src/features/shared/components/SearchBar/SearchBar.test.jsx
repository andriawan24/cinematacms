import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
	it('renders the search input with the specified token classes and trailing icon', () => {
		render(<SearchBar placeholder="Search movie title" aria-label="Search movie title" />);

		const input = screen.getByRole('searchbox', { name: 'Search movie title' });
		const icon = input.parentElement?.querySelector('svg[data-icon="magnifyingGlass"]');

		expect(input.className).toContain('body-body-14-regular');
		expect(input.className).toContain('bg-cinemata-pacific-deep-800');
		expect(input.className).toContain('placeholder:text-cinemata-pacific-deep-300');
		expect(input.className).toContain('text-cinemata-strait-blue-50');
		expect(input.className).toContain('px-[22px]');
		expect(input.className).toContain('py-[15px]');
		expect(input.className).toContain('rounded-[8px]');
		expect(input.className).toContain('w-full');
		expect(input.className).toContain('focus:border-cinemata-sunset-horizon-400p');
		expect(icon).not.toBeNull();
		expect(icon).toHaveStyle({ width: '22px', height: '22px' });
	});

	it('supports outer container className overrides while keeping full-width layout', () => {
		render(<SearchBar className="max-w-[480px]" aria-label="Search" />);

		const input = screen.getByRole('searchbox', { name: 'Search' });
		const container = input.parentElement;

		expect(container?.className).toContain('relative');
		expect(container?.className).toContain('w-full');
		expect(container?.className).toContain('max-w-[480px]');
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
		expect(input.className).toContain('disabled:opacity-70');
		expect(input.className).toContain('disabled:cursor-not-allowed');
	});
});
