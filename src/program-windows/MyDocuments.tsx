"use client";
import { Window } from "~/components/Window";

export const MyDocuments = () => {
	return (
		<Window
			initialPosition={{ x: 100, y: 100 }}
			initialSize={{ width: 700, height: 500 }}
			title="My Documents"
			processId="my-documents"
		>
			<div className="flex h-full w-full">My Documents</div>
		</Window>
	);
};
