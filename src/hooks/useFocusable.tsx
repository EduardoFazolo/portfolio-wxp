import { useEffect } from "react";
import { useWindowManager } from "./useWindowManager";

export const useFocusable = (processId: string) => {
	const {
		windows,
		focusWindow,
		registerWindow,
		unregisterWindow,
		focusedWindowId,
	} = useWindowManager();

	useEffect(() => {
		registerWindow(processId);
		return () => unregisterWindow(processId);
	}, [processId, registerWindow, unregisterWindow]);

	const focus = () => focusWindow(processId);

	const zIndex = windows.find((w) => w.processId === processId)?.zIndex ?? 1;

	return { isFocused: focusedWindowId === processId, zIndex, focus };
};
