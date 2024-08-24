# BrutalistPaletteWidget

A minimalist, brutalist-inspired color palette widget that displays colors and allows users to copy their hex values with a single click. The widget is designed to be easy to integrate and customize.
Features

- Displays a color palette with the provided hex values.
- Copies the hex value of a color to the clipboard when clicked.
- Automatically adjusts the text color for light backgrounds.
- Simple and clean design with easy customization using CSS variables.

## Installation

1. Download the palette.js file and include it in your project.
2. Add the widget to your HTML by creating a new BrutalistPaletteWidget instance with your desired colors and palette name.

## Usage Example

Include the following code in your HTML to use the BrutalistPaletteWidget:

```html
<script src="palette.js"></script>
<script>
    new BrutalistPaletteWidget(["acbad5", "2a353b", "506753", "c4d387", "dae8d9", "fdfae9", "e8b6bc"], "Palette Name");
</script>
```

## Customization

You can easily customize the widget’s appearance by modifying the CSS variables defined in the script:

```css
:root {
    --bpw-background-color: #ffffff;
    --bpw-border-color: #000000;
    --bpw-font-size: 14px;
    --bpw-font-color: #000000;
    --bpw-height: 150px;
    --bpw-margin: 2rem auto;
    --bpw-info-padding: 0 15px;
    --bpw-info-height: 36px;
    --bpw-hover-width: 80px;
    --bpw-transition-duration: 0.1s;
    --bpw-font-weight: bold;
    --bpw-light-color: #000000;
    --bpw-dark-color: #ffffff;
}
```

Adjust these variables to match your design needs.

## License

This project is open-source and available under the MIT License.
