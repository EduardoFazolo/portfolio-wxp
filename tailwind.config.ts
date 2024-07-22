import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans],
			},
			backgroundImage: {
				"win-xp-blue":
					"linear-gradient(rgb(0, 88, 238) 0%, rgb(53, 147, 255) 4%, rgb(40, 142, 255) 6%, rgb(18, 125, 255) 8%, rgb(3, 111, 252) 10%, rgb(2, 98, 238) 14%, rgb(0, 87, 229) 20%, rgb(0, 84, 227) 24%, rgb(0, 85, 235) 56%, rgb(0, 91, 245) 66%, rgb(2, 106, 254) 76%, rgb(0, 98, 239) 86%, rgb(0, 82, 214) 92%, rgb(0, 64, 171) 94%, rgb(0, 48, 146) 100%)",
				"win-xp-white":
					"linear-gradient(to right, rgb(237, 237, 229) 0%, rgb(237, 232, 205) 100%)",
				"win-control-blue":
					"radial-gradient(circle at 90% 90%, rgb(0, 84, 233) 0%, rgb(34, 99, 213) 55%, rgb(68, 121, 228) 70%, rgb(163, 187, 236) 90%, white 100%)",
				"win-control-red":
					"radial-gradient(circle at 90% 90%, rgb(204, 70, 0) 0%, rgb(220, 101, 39) 55%, rgb(205, 117, 70) 70%, rgb(255, 204, 178) 90%, white 100%)",
			},
			colors: {
				"hard-blue": "#0831d9",
				"xp-white": "#ece9d8",
			},
		},
	},
	plugins: [],
} satisfies Config;
