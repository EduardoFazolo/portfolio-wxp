import { create } from "zustand";

type WindowState = {
	processId: string;
	zIndex: number;
};

type WindowManagerState = {
	windows: WindowState[];
	focusWindow: (processId: string) => void;
	registerWindow: (processId: string) => void;
	unregisterWindow: (processId: string) => void;
};

export const useWindowManager = create<WindowManagerState>((set) => ({
	windows: [],
	focusWindow: (processId: string) =>
		set((state) => {
			const newWindows = state.windows
				.map((w) => ({
					...w,
					zIndex:
						w.processId === processId
							? state.windows.length
							: w.zIndex - 1,
				}))
				.sort((a, b) => a.zIndex - b.zIndex)
				.map((w, index) => ({ ...w, zIndex: index + 1 }));
			return { windows: newWindows };
		}),
	registerWindow: (processId: string) =>
		set((state) => ({
			windows: [
				...state.windows,
				{ processId, zIndex: state.windows.length + 1 },
			],
		})),
	unregisterWindow: (processId: string) =>
		set((state) => ({
			windows: state.windows.filter((w) => w.processId !== processId),
		})),
}));
