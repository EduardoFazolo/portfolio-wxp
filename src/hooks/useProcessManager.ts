import { create } from "zustand";

type App = {
	name: string;
	icon: string;
	processId: string;
	zIndex: number;
	order: number;
	isMinimized?: boolean;
};

type NewApp = {
	name: string;
	icon: string;
	processSlug: string;
};

type ProcessManagerState = {
	apps: App[];
	focusedProcessId: string | null;
	openApp: (app: NewApp) => void;
	isAppOpen: (processId: string) => boolean;
	closeApp: (processId: string) => void;
	minimizeApp: (processId: string) => void;
	isAppMaximized: (processId: string) => boolean;
	focusApp: (processId: string) => void;
};

export const useProcessManager = create<ProcessManagerState>((set, get) => ({
	apps: [],
	focusedProcessId: null,

	openApp: (app: NewApp) =>
		set((state) => {
			const newApp: App = {
				icon: app.icon,
				name: app.name,
				processId: `${app.processSlug}-${Math.random().toString(36).slice(2)}`,
				zIndex: state.apps.length + 1,
				order: state.apps.length,
				isMinimized: false,
			};
			return {
				apps: [...state.apps, newApp],
				focusedProcessId: newApp.processId,
			};
		}),

	isAppOpen: (processId: string) =>
		get().apps.some((app) => app.processId === processId),

	closeApp: (processId: string) =>
		set((state) => ({
			apps: state.apps.filter((app) => app.processId !== processId),
			focusedProcessId:
				state.focusedProcessId === processId
					? null
					: state.focusedProcessId,
		})),

	minimizeApp: (processId: string) =>
		set((state) => {
			const app = state.apps.find((app) => app.processId === processId);

			// get the app with the highest zIndex after this one
			let appWithHigestZIndex: App | null = null;
			const validApps = state.apps
				.filter((a) => a.processId !== processId)
				.filter((a) => !a.isMinimized);

			console.log("validApps", validApps);
			for (const a of validApps) {
				if (!appWithHigestZIndex) appWithHigestZIndex = a;
				if (a.zIndex > appWithHigestZIndex.zIndex) {
					appWithHigestZIndex = a;
				}
			}

			if (app) {
				const newAppsState = [...state.apps];

				const appIndex = newAppsState.findIndex(
					(a) => a.processId === app.processId,
				);
				newAppsState[appIndex] = {
					...app,
					isMinimized: true,
				};

				return {
					apps: newAppsState,
					focusedProcessId: appWithHigestZIndex?.processId ?? null,
				};
			}
			return state;
		}),

	isAppMaximized: (processId: string) =>
		get().apps.some(
			(app) => app.processId === processId && !app.isMinimized,
		),

	focusApp: (processId: string) =>
		set((state) => {
			const newApps = state.apps
				.map((app) => ({
					...app,
					zIndex:
						app.processId === processId
							? state.apps.length
							: app.zIndex - 1,
				}))
				.sort((a, b) => a.zIndex - b.zIndex)
				.map((app, index) => ({ ...app, zIndex: index + 1 }))
				.map((app) => {
					return app.processId === processId
						? { ...app, isMinimized: false, isFocused: true }
						: app;
				});

			return { apps: newApps, focusedProcessId: processId };
		}),
}));
