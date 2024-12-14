// hooks/useDoubleClick.ts
import { useRef, useCallback } from "react";

interface UseDoubleClickOptions {
	onSingleClick?: (id: string) => void;
	onDoubleClick?: (id: string) => void;
	delay?: number;
}

export const useDoubleClick = ({
	onSingleClick,
	onDoubleClick,
	delay = 500,
}: UseDoubleClickOptions) => {
	const lastClickTime = useRef<number>(0);
	const lastClickId = useRef<string>("");
	const touchStartTime = useRef<number>(0);

	const handleClick = useCallback(
		(id: string) => {
			const currentTime = new Date().getTime();
			const timeDiff = currentTime - lastClickTime.current;

			if (timeDiff < delay && lastClickId.current === id) {
				onDoubleClick?.(id);
				lastClickTime.current = 0;
				lastClickId.current = "";
			} else {
				onSingleClick?.(id);
				lastClickTime.current = currentTime;
				lastClickId.current = id;
			}
		},
		[delay, onSingleClick, onDoubleClick],
	);

	const handleTouch = useCallback(
		(id: string, isStart: boolean) => {
			if (isStart) {
				const currentTime = new Date().getTime();
				const timeDiff = currentTime - touchStartTime.current;

				if (timeDiff < delay && lastClickId.current === id) {
					onDoubleClick?.(id);
					touchStartTime.current = 0;
					lastClickId.current = "";
				} else {
					onSingleClick?.(id);
					touchStartTime.current = currentTime;
					lastClickId.current = id;
				}
			}
		},
		[delay, onSingleClick, onDoubleClick],
	);

	return { handleClick, handleTouch };
};
