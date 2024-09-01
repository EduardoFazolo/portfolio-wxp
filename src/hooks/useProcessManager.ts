import { create } from "zustand";

type App = {
	name: string;
	icon: string;
	processId: string;
	zIndex: number;
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
	closeApp: (processId: string) => void;
	focusApp: (processId: string) => void;
};

export const useProcessManager = create<ProcessManagerState>((set) => ({
	apps: [],
	focusedProcessId: null,

	openApp: (app: NewApp) =>
		set((state) => {
			const newApp: App = {
				icon: app.icon,
				name: app.name,
				processId: `${app.processSlug}-${Math.random().toString(36).slice(2)}`,
				zIndex: state.apps.length + 1,
			};
			return {
				apps: [...state.apps, newApp],
				focusedProcessId: newApp.processId,
			};
		}),

	closeApp: (processId: string) =>
		set((state) => ({
			apps: state.apps.filter((app) => app.processId !== processId),
			focusedProcessId:
				state.focusedProcessId === processId
					? null
					: state.focusedProcessId,
		})),

	focusApp: (processId: string) =>
		set((state) => {
			const newApps = state.apps
				.map((app) => ({
					...app,
					zIndex:
						app.processId === processId
							? state.apps.length
							: app.zIndex,
				}))
				.sort((a, b) => a.zIndex - b.zIndex)
				.map((app, index) => ({ ...app, zIndex: index + 1 }));

			return { apps: newApps, focusedProcessId: processId };
		}),
}));
