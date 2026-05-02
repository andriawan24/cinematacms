import '../src/static/lib/material-icons/material-icons.css';
import '../src/static/lib/Inter/inter.css';
import '../src/static/lib/BarlowSemiCondensed/barlow-semi-condensed.css';
import '../src/static/lib/Amulya/amulya.css';
import '../src/static/lib/Facultad/Facultad-Regular.css';
import '../src/features/shared/components/storybook-preview.scss';
import '../src/static/css/tailwind.css';

export const parameters = {
	layout: 'centered',
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/i,
		},
	},
};

export const decorators = [
	(storyFn) => {
		if (typeof document !== 'undefined') {
			document.body.classList.add('light_theme');
			document.body.classList.remove('dark_theme');
		}

		return storyFn();
	},
];
