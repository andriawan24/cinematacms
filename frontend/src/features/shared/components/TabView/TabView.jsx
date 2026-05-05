import { Children, createContext, isValidElement, useContext, useEffect, useId, useMemo, useState } from 'react';

const TabViewContext = createContext(null);

function joinClasses(...classes) {
	return classes.filter(Boolean).join(' ');
}

function clampTabsValue(tabs, nextValue) {
	if (!tabs.length) {
		return undefined;
	}

	const resolved = tabs.find((tab) => tab.value === nextValue && !tab.disabled);
	if (resolved) {
		return resolved.value;
	}

	return tabs.find((tab) => !tab.disabled)?.value ?? tabs[0]?.value;
}

function resolveInitialValue(tabs, defaultValue, value) {
	if (value !== undefined) {
		return clampTabsValue(tabs, value);
	}

	if (defaultValue !== undefined) {
		return clampTabsValue(tabs, defaultValue);
	}

	return tabs.find((tab) => !tab.disabled)?.value ?? tabs[0]?.value;
}

function findEnabledTab(tabs, startIndex, direction) {
	const total = tabs.length;

	for (let step = 1; step <= total; step += 1) {
		const index = (startIndex + direction * step + total) % total;
		if (!tabs[index]?.disabled) {
			return tabs[index];
		}
	}

	return tabs[startIndex];
}

function flattenTabsChildren(children, items = []) {
	Children.forEach(children, (child) => {
		if (!isValidElement(child)) {
			return;
		}

		if (child.type === TabViewTrigger) {
			items.push({
				value: child.props.value,
				disabled: !!child.props.disabled,
			});
			return;
		}

		if (child.props?.children) {
			flattenTabsChildren(child.props.children, items);
		}
	});

	return items;
}

function toKebabCase(value) {
	return String(value)
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function extractSimpleTabContentItems(children) {
	return Children.toArray(children)
		.filter((child) => isValidElement(child) && child.type === TabContent)
		.map((child, index) => {
			const resolvedValue = child.props.value ?? toKebabCase(child.props.title) ?? `tab-${index + 1}`;
			return {
				value: resolvedValue || `tab-${index + 1}`,
				label: child.props.title,
				content: child.props.content ?? child.props.children,
				disabled: !!child.props.disabled,
				triggerClassName: child.props.triggerClassName ?? '',
				panelClassName: child.props.panelClassName ?? '',
			};
		});
}

function useTabViewContext(componentName) {
	const context = useContext(TabViewContext);

	if (!context) {
		throw new Error(`${componentName} must be used within TabView.`);
	}

	return context;
}

function TabViewList({ children, className = '' }) {
	const { ariaLabel, tabMode } = useTabViewContext('TabView.List');

	return (
		<div className="w-full overflow-x-auto">
			<div
				role="tablist"
				aria-label={ariaLabel}
				className={joinClasses(
					'flex overflow-hidden rounded-sm bg-cinemata-pacific-deep-800 p-0',
					tabMode === 'wrap' ? 'w-max min-w-0' : 'min-w-full',
					className
				)}
			>
				{children}
			</div>
		</div>
	);
}

function TabViewTrigger({ children, value, disabled = false, className = '' }) {
	const { getPanelId, getTabId, selectedValue, selectValue, triggerItems, tabMode } =
		useTabViewContext('TabView.Trigger');
	const isSelected = selectedValue === value;
	const triggerIndex = triggerItems.findIndex((item) => item.value === value);

	return (
		<button
			type="button"
			role="tab"
			id={getTabId(value)}
			aria-selected={isSelected}
			aria-controls={getPanelId(value)}
			tabIndex={isSelected ? 0 : -1}
			disabled={disabled}
			onClick={() => selectValue(value)}
			onKeyDown={(event) => {
				if (triggerIndex === -1) {
					return;
				}

				if (event.key === 'ArrowRight') {
					event.preventDefault();
					selectValue(findEnabledTab(triggerItems, triggerIndex, 1)?.value);
				}

				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					selectValue(findEnabledTab(triggerItems, triggerIndex, -1)?.value);
				}

				if (event.key === 'Home') {
					event.preventDefault();
					selectValue(triggerItems.find((item) => !item.disabled)?.value);
				}

				if (event.key === 'End') {
					event.preventDefault();
					selectValue([...triggerItems].reverse().find((item) => !item.disabled)?.value);
				}
			}}
			className={joinClasses(
				'body-body-14-bold cursor-pointer whitespace-nowrap border-0 px-4 py-4 text-cinemata-white uppercase tracking-[0.02em] transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				tabMode === 'wrap' ? 'min-w-0 flex-none' : 'min-w-[160px] flex-1',
				isSelected ? 'bg-cinemata-strait-blue-800' : 'bg-transparent',
				className
			)}
		>
			{children}
		</button>
	);
}

function TabViewContent({ children, value, className = '' }) {
	const { getPanelId, getTabId, selectedValue } = useTabViewContext('TabView.Content');

	if (selectedValue !== value) {
		return null;
	}

	return (
		<div
			role="tabpanel"
			id={getPanelId(value)}
			aria-labelledby={getTabId(value)}
			className={joinClasses('mt-4 w-full', className)}
		>
			{children}
		</div>
	);
}

export function TabContent({
	title,
	content,
	children,
	value,
	disabled = false,
	triggerClassName = '',
	panelClassName = '',
}) {
	return null;
}

function LegacyTabsRenderer({ tabs, renderContent, listClassName = '', triggerClassName = '', panelClassName = '' }) {
	const { selectedValue } = useTabViewContext('LegacyTabsRenderer');
	const selectedTab = tabs.find((tab) => tab.value === selectedValue) ?? tabs[0];
	const resolvedPanelContent =
		selectedTab && renderContent
			? renderContent(selectedTab)
			: typeof selectedTab?.content === 'function'
				? selectedTab.content(selectedTab)
				: selectedTab?.content;

	return (
		<>
			<TabViewList className={listClassName}>
				{tabs.map((tab) => (
					<TabViewTrigger
						key={tab.value}
						value={tab.value}
						disabled={tab.disabled}
						className={triggerClassName}
					>
						{tab.label}
					</TabViewTrigger>
				))}
			</TabViewList>

			{selectedTab ? (
				<TabViewContent value={selectedTab.value} className={panelClassName}>
					{resolvedPanelContent}
				</TabViewContent>
			) : null}
		</>
	);
}

function SimpleTabContentRenderer({ items, listClassName = '', triggerClassName = '', panelClassName = '' }) {
	const { selectedValue } = useTabViewContext('SimpleTabContentRenderer');
	const selectedTab = items.find((item) => item.value === selectedValue) ?? items[0];

	return (
		<>
			<TabViewList className={listClassName}>
				{items.map((item) => (
					<TabViewTrigger
						key={item.value}
						value={item.value}
						disabled={item.disabled}
						className={joinClasses(triggerClassName, item.triggerClassName)}
					>
						{item.label}
					</TabViewTrigger>
				))}
			</TabViewList>

			{selectedTab ? (
				<TabViewContent
					value={selectedTab.value}
					className={joinClasses(panelClassName, selectedTab.panelClassName)}
				>
					{selectedTab.content}
				</TabViewContent>
			) : null}
		</>
	);
}

function TabViewRoot({
	tabs = [],
	children,
	selectedTab,
	defaultSelectedTab,
	onSelectedTabChange,
	value,
	defaultValue,
	onValueChange,
	renderContent,
	className = '',
	listClassName = '',
	triggerClassName = '',
	panelClassName = '',
	tabMode = 'fill',
	'aria-label': ariaLabel = 'Tabs',
}) {
	const generatedId = useId();
	const childTriggerItems = useMemo(() => flattenTabsChildren(children), [children]);
	const simpleTabContentItems = useMemo(() => extractSimpleTabContentItems(children), [children]);
	const sourceTabs = tabs.length ? tabs : simpleTabContentItems.length ? simpleTabContentItems : childTriggerItems;
	const controlledValue = selectedTab ?? value;
	const uncontrolledDefaultValue = defaultSelectedTab ?? defaultValue;
	const [internalValue, setInternalValue] = useState(() =>
		resolveInitialValue(sourceTabs, uncontrolledDefaultValue, controlledValue)
	);
	const selectedValue = controlledValue ?? internalValue;
	const safeSelectedValue = clampTabsValue(sourceTabs, selectedValue);

	useEffect(() => {
		if (controlledValue === undefined) {
			setInternalValue((currentValue) => resolveInitialValue(sourceTabs, currentValue, currentValue));
		}
	}, [controlledValue, sourceTabs]);

	function selectValue(nextValue) {
		const resolvedValue = clampTabsValue(sourceTabs, nextValue);

		if (controlledValue === undefined) {
			setInternalValue(resolvedValue);
		}

		if (resolvedValue !== undefined) {
			onSelectedTabChange?.(resolvedValue);
			onValueChange?.(resolvedValue);
		}
	}

	const contextValue = useMemo(
		() => ({
			ariaLabel,
			getPanelId: (tabValue) => `${generatedId}-panel-${tabValue}`,
			getTabId: (tabValue) => `${generatedId}-tab-${tabValue}`,
			selectedValue: safeSelectedValue,
			selectValue,
			tabMode,
			triggerItems: sourceTabs,
		}),
		[ariaLabel, generatedId, safeSelectedValue, sourceTabs, tabMode]
	);

	return (
		<TabViewContext.Provider value={contextValue}>
			<div className={joinClasses('w-full', className)}>
				{tabs.length ? (
					<LegacyTabsRenderer
						tabs={tabs}
						renderContent={renderContent}
						listClassName={listClassName}
						triggerClassName={triggerClassName}
						panelClassName={panelClassName}
					/>
				) : simpleTabContentItems.length ? (
					<SimpleTabContentRenderer
						items={simpleTabContentItems}
						listClassName={listClassName}
						triggerClassName={triggerClassName}
						panelClassName={panelClassName}
					/>
				) : (
					children
				)}
			</div>
		</TabViewContext.Provider>
	);
}

export const TabView = Object.assign(TabViewRoot, {
	List: TabViewList,
	Trigger: TabViewTrigger,
	Content: TabViewContent,
	TabContent,
});
