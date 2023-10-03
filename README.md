# Tailwind schemes
Here is a plugin that can help you configure colors for both lightmode and darkmode if you have too many colors but don't want to use tailwind's built-in "dark:" keyword.

## Usage

```ts
module.exports = {
  ...
  darkMode: ["class", '[data-theme="dark"]'],
  ...
}
```

```ts
module.exports = {
  ...
  plugins: [
    require("tailwind-schemes")({
      light: {
        selector: "[data-theme='light']", // specify your css light selector
        color1: "red",
        color2: {
          100: "#00ff00",
          200: "#0000ff",
          DEFAULT: "#ff0000",
        },
        rgbColor: "rgb(0, 0, 255)",
        rgbaColor: "rgba(255, 255, 255, 0.5)"
      },
      dark: {
        selector: "[data-theme='dark']", // specify your css dark selector
        color1: "blue",
        color2: {
          100: "#00ff00",
          200: "#0000ff",
          DEFAULT: "#ff0000",
        },
          rgbColor: "rgb(255, 0, 255)",
          rgbaColor: "rgba(255, 255, 255, 0.5)"
      },
    }),

  ],
}
```

```ts 
<p className="text-color1">Hello</p>
<p className="text-color2">Hello</p>
<p className="text-color2-100">Hello</p>
<p className="text-color2-200">Hello</p>
<p className="text-rgbColor">Hello</p>
<p className="text-rgbaColor">Hello</p>

```