import { create } from "zustand";

type AppState = {
	apps: App[];
	openApp: (app: App) => void;
	closeApp: (processId: string) => void;
};

type App = {
	name: string;
	icon: string;
	processId: string;
};

export const useAppsManager = create<AppState>((set) => ({
	apps: [],
	openApp: (app: App) => {
		const newApp = {
			...app,
			processId: `${app.processId}-${Math.random().toString(36).slice(2)}`,
		};
		return set((state) => ({ apps: [...state.apps, newApp] }));
	},
	closeApp: (processId: string) =>
		set((state) => ({
			apps: state.apps.filter((app) => app.processId !== processId),
		})),
}));
