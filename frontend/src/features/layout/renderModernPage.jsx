import { createRoot } from 'react-dom/client';
import { AppLayout } from './components/AppLayout';

const roots = new WeakMap();

export function renderModernPage(pageSlotId, ContentComponent) {
	const container = document.getElementById('app-root');
	if (!container) {
		return null;
	}

	let root = roots.get(container);
	if (!root) {
		root = createRoot(container);
		roots.set(container, root);
	}

	root.render(<AppLayout pageSlotId={pageSlotId} ContentComponent={ContentComponent} />);
	return root;
}
