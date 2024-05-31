# Tailwind Color Schemes Plugin

This Tailwind CSS plugin provides a flexible way to define and use color schemes in your Tailwind CSS project. It allows you to configure global colors, scheme-specific colors, and use these colors throughout your project with optional opacity.

## Installation

1. Install Tailwind CSS if you haven't already:

   ```bash
   npm install tailwindcss -D
   ```

2. Install the plugin:

   ```bash
   npm install tailwind-schemes -D
   ```

## Usage

1. **Configuration**

   Add the plugin to your `tailwind.config.js`:

   ```js
   // tailwind.config.js
   const { schemes, resetCSS } = require('tailwind-schemes')

   module.exports = {
     // ... other configurations
     plugins: [
       schemes({
         selector: 'data-theme', // Optional: "class" or any selector (default is 'data-theme' => [data-theme="dark/light/custom..."])
         prefix: 'tw-schemes', // Optional: default is 'tw-schemes'
         global: {
           primary: '#3490dc',
           secondary: '#ffed4a',
           // More global colors...
         },
         schemes: {
           light: {
             primary: '#ffffff',
             secondary: '#000000',
             // More colors for the light theme...
           },
           dark: {
             primary: '#000000',
             secondary: '#ffffff',
             // More colors for the dark theme...
           },
           customTheme: {
             primary: '#00ff00',
             secondary: '#ffff00',
             // More colors for the custom theme...
           },
         },
       }),
       resetCSS({
         html: 'text-primary', // Defined in schemes
         body: {
           padding: 0,
         },
         // More options...
       }),
     ],
   }
   ```

2. **Using the Colors**

   - **CSS Variables**

     The plugin generates CSS variables for your color schemes. You can use these variables in your CSS files:

     ```css
     .example-class {
       color: var(--tw-schemes-primary);
       background-color: var(--tw-schemes-secondary);
     }
     ```

   - **Tailwind Classes**

     Tailwind classes will be extended with your custom colors. You can use them directly in your HTML:

     ```html
     <div class="text-primary bg-secondary">
       This text uses custom colors defined in the color schemes.
     </div>
     ```

## API

### `schemes`

The main function to configure your color schemes.

- **Parameters:**
  - `config` (optional): An object with the following properties:
    - `selector` (string): The CSS selector for the theme. Default is `'data-theme'`.
    - `prefix` (string): The prefix for the CSS variables. Default is `'tw-schemes'`.
    - `global` (object): A global color scheme.
    - `schemes` (object): An object where keys are theme names and values are color schemes.

### `colorize`

A helper function to manage color objects.

- **Parameters:**

  - `color` (object|string): A color object or a string.
  - `key` (optional, string): The key for the color. Default is `500`.

- **Returns:** A color object with the default and foreground colors set if they are not already defined.

### `shades`

A helper function to generate a color shades.

- **Parameters:**

  - `baseColor` (string): A hex string color.

- **Returns:** A color object with shades generated from 50-950

### `resetCSS`

A helper plugin to add global css

- **Parameters:**

  - `options` (object): define any base options (using tailwind classnames or css-properties).

- **Recommended setting**
  ```json
   "tailwindCSS.experimental.classRegex": [
     ["resetCSS\\((([^()]*|\\([^()]*\\))*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
   ]
  ```

## Contributing

Explain how others can contribute to the development of the plugin.
