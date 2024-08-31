import { create } from "zustand";

type AppState = {
	apps: App[];
	openApp: (app: NewApp) => void;
	closeApp: (processId: string) => void;
};

type App = {
	name: string;
	icon: string;
	processId: string;
};

type NewApp = {
	name: string;
	icon: string;
	processSlug: string;
};

export const useAppsManager = create<AppState>((set) => ({
	apps: [],
	openApp: (app: NewApp) => {
		const newApp = {
			...app,
			processId: `${app.processSlug}-${Math.random().toString(36).slice(2)}`,
		};
		return set((state) => ({ apps: [...state.apps, newApp] }));
	},
	closeApp: (processId: string) =>
		set((state) => ({
			apps: state.apps.filter((app) => app.processId !== processId),
		})),
}));
