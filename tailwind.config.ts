import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        mobS: "375px", // Mobile S+
        mobM: "390px", // Mobile M+
        mobL: "430px", // Mobile L+
        tablet: "768px",
        laptop: "1024px",
        desktop: "1440px",
        desktopXL: "1920px",
      },
    },
  },
  plugins: [],
} satisfies Config;
