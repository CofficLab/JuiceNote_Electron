/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    // logs: false,
    themes: [
      {
        cloud: {
          primary: "#bae6fd",
          secondary: "#e0f2fe",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#f3f4f6",
          "base-200": "#bae6fd",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        "cloud-dark": {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "blue",
          "primary-focus": "mediumblue",
        },
      },
      {
        mountain: {
          primary: "#bae6fd",
          secondary: "#e0f2fe",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#d1fae5",
          "base-200": "#bae6fd",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        "mountain-dark": {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "blue",
          "primary-focus": "mediumblue",
        },
      },
      {
        ocean: {
          primary: "#bae6fd",
          secondary: "#e0f2fe",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#0ea5e9",
          "base-200": "#bae6fd",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        "ocean-dark": {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "blue",
          "primary-focus": "mediumblue",
        },
      },
    ],
  },
};
