import { useProcessManager } from "./useProcessManager";

export const useFocusable = (processId: string) => {
	const { apps, focusApp, focusedProcessId } = useProcessManager();

	const focus = () => focusApp(processId);

	const zIndex = apps.find((app) => app.processId === processId)?.zIndex ?? 1;

	return {
		isFocused: focusedProcessId === processId,
		zIndex,
		focus,
	};
};
