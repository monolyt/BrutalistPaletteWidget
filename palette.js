"use strict";

// Constructor function for BrutalistPaletteWidget
var BrutalistPaletteWidget = function (colors, name) {
    this.colors = colors; // Array of color hex values
    this.name = name; // Name of the palette
    this.initElements(); // Initialize the widget elements
};

BrutalistPaletteWidget.prototype = {
    // Initialize the widget elements
    initElements: function () {
        var d = this,
            v = document.currentScript; // Get the current script element

        // Create a container for the widget
        var f = document.createElement("div");
        f.classList.add("brutalist-palette-widget");
        v.parentNode.insertBefore(f, v.nextSibling); // Insert the widget after the current script

        // Create a container for the colors
        var P = document.createElement("div");
        P.classList.add("brutalist-palette-widget_colors");

        // Create a div for each color in the palette
        this.colors.forEach(function (color) {
            var v = document.createElement("div");
            v.style.background = "#" + color; // Set the background color
            d.isLight(color) && v.classList.add("is-light"); // Add 'is-light' class if color is light

            // Create a span to display the color code
            var e = document.createElement("span");
            e.innerHTML = color.toUpperCase();

            // Add click event to copy the color code
            v.onclick = function () {
                e.innerHTML = "Copied!";
                d.copyText(color);
            };

            // Revert text after mouse leaves
            v.onmouseleave = function () {
                setTimeout(function () {
                    e.innerHTML = color.toUpperCase();
                }, 200);
            };

            // Append the span to the color div and the color div to the container
            v.appendChild(e);
            P.appendChild(v);
        });

        // Create a container for the palette name
        var e = document.createElement("div");
        e.classList.add("brutalist-palette-widget_info");

        // Create and append the palette name
        var q = document.createElement("div");
        q.classList.add("brutalist-palette-widget_info_name");
        if (this.name) q.innerHTML = this.name;

        e.appendChild(q);
        f.appendChild(P);
        f.appendChild(e);

        // Inject the CSS if it hasn't been added already
        if (document.getElementsByClassName("brutalist-palette-widget-css").length === 0) {
            var u = document.createElement("style");
            u.classList.add("brutalist-palette-widget-css");

            // Using CSS variables to allow easy customization
            u.innerHTML = `
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
                .brutalist-palette-widget {
                    all: unset;
                    background: var(--bpw-background-color);
                    border: 1px solid var(--bpw-border-color);
                    display: block;
                    overflow: hidden;
                    height: var(--bpw-height);
                    margin: var(--bpw-margin);
                    font-size: var(--bpw-font-size);
                    color: var(--bpw-font-color);
                }
                .brutalist-palette-widget_colors {
                    display: flex;
                    width: 100%;
                    height: calc(var(--bpw-height) - var(--bpw-info-height));
                }
                .brutalist-palette-widget_colors div {
                    flex-grow: 1;
                    transition: all var(--bpw-transition-duration) ease-in-out;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    border-right: 1px solid var(--bpw-border-color);
                }
                .brutalist-palette-widget_colors div:last-child {
                    border-right: 0;
                }
                .brutalist-palette-widget_colors div span {
                    width: 100%;
                    text-align: center;
                    display: block;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--bpw-dark-color);
                    opacity: 0;
                    transition: all var(--bpw-transition-duration) ease-in-out;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: var(--bpw-font-weight);
                }
                .brutalist-palette-widget_colors div.is-light span {
                    color: var(--bpw-light-color);
                }
                .brutalist-palette-widget_colors div:hover {
                    flex-basis: var(--bpw-hover-width);
                }
                .brutalist-palette-widget_colors div:hover span {
                    opacity: 1;
                }
                .brutalist-palette-widget_info {
                    position: relative;
                    padding: var(--bpw-info-padding);
                    height: var(--bpw-info-height);
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-top: 1px solid var(--bpw-border-color);
                }
                .brutalist-palette-widget_info_name {
                    font-weight: var(--bpw-font-weight);
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `;
            document.head.appendChild(u);
        }
    },

    // Copy color code to clipboard
    copyText: function (color) {
        var v = document.createElement("textarea");
        v.style.cssText = "position:absolute;left:-9999px";
        v.value = color;
        document.body.appendChild(v);
        v.select();
        try {
            document.execCommand("copy"); // Copy the color code
        } catch (e) {
            console.error("Failed to copy text", e);
        }
        window.getSelection().removeAllRanges();
        v.remove();
    },

    // Check if the color is light (to adjust text color accordingly)
    isLight: function (color) {
        var v = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color),
            e = parseInt(v[1], 16), // Red component
            d = parseInt(v[2], 16), // Green component
            P = parseInt(v[3], 16); // Blue component

        // Calculate brightness using the luminance formula
        return 160 <= Math.round((299 * e + 587 * d + 114 * P) / 1000);
    }
};
