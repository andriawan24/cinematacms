export default {
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false,
					cleanupIds: false,
				},
			},
		},
		{
			name: 'prefixIds',
		},
		'removeDimensions',
		'removeScriptElement',
		'removeStyleElement',
		'removeXMLNS',
		'sortAttrs',
	],
};
