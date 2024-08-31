"use client";
import { Window } from "../components/Window";

export const ContactMe = () => {
	return (
		<Window
			initialPosition={{ x: 200, y: 200 }}
			title="Contact me"
			processId="contact-me"
		>
			<div className="flex h-full w-full">Contact me</div>
		</Window>
	);
};

export const InternetExplorer = () => {
	return (
		<Window
			initialPosition={{ x: 300, y: 300 }}
			title="Internet Explorer"
			processId="internet-explorer"
		>
			<div className="flex h-full w-full">Internet Explorer</div>
		</Window>
	);
};
