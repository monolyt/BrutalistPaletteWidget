"use strict";
// Constructor function for BrutalistPaletteWidget
var BrutalistPaletteWidget = function (colors, name, description) {
    this.colors = colors; // Array of color hex values
    this.name = name; // Name of the palette
    this.description = description; // Optional description
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
        // Assign an ID for sharing/highlighting based on the palette name
        f.id = "palette-" + this.name.toLowerCase().replace(/\s+/g, '-');
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
            e.innerHTML = "#" + color.toUpperCase();
            // Add click event to copy the color code
            v.onclick = function () {
                e.innerHTML = "Copied!";
                d.copyText("#" + color);
            };
            // Revert text after mouse leaves
            v.onmouseleave = function () {
                setTimeout(function () {
                    e.innerHTML = "#" + color.toUpperCase();
                }, 200);
            };
            // Append the span to the color div and the color div to the container
            v.appendChild(e);
            P.appendChild(v);
        });

        // Create a container for the palette info (name and share button)
        var e = document.createElement("div");
        e.classList.add("brutalist-palette-widget_info");
        // Create and append the palette name
        var q = document.createElement("div");
        q.classList.add("brutalist-palette-widget_info_name");
        if (this.name) q.innerHTML = this.name;
        e.appendChild(q);

        // Create the share button
        var s = document.createElement("a");
        s.href = "#";
        s.classList.add("brutalist-palette-widget_share");
        s.innerHTML = "↙";
        s.onclick = function (event) {
            event.preventDefault();
            var url = window.location.origin + window.location.pathname + "?palette=" + encodeURIComponent(d.name);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(function () {
                    s.innerHTML = "Link Copied!";
                    setTimeout(function () {
                        s.innerHTML = "↙";
                    }, 2000);
                });
            } else {
                // Fallback if clipboard API is not available
                d.copyText(url);
                s.innerHTML = "✔ Link Copied!";
                s.style.color = "green";
                setTimeout(function () {
                    s.innerHTML = "🔗 Share";
                    s.style.color = "";
                }, 2000);
            }
        };
        e.appendChild(s);

        f.appendChild(P);
        f.appendChild(e);

        // If a description is provided, add it underneath
        if (this.description) {
            var dBox = document.createElement("div");
            dBox.classList.add("brutalist-palette-widget_description");
            dBox.innerHTML = this.description;
            f.appendChild(dBox);
            // Allow container to expand so the description is visible
            f.style.height = "auto";
        }

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
                .brutalist-palette-widget_share {
                    text-decoration: none;
                    color: var(--bpw-font-color);
                    font-size: 14px;
                    font-weight: bold;
                    transition: color 0.2s ease-in-out;
                    margin-left: auto;
                }
                .brutalist-palette-widget_share:hover {
                    color: var(--bpw-border-color);
                }
                .brutalist-palette-widget_description {
                    font-size: 12px;
                    padding: 10px 15px;
                    color: var(--bpw-font-color);
                    border-top: 1px solid var(--bpw-border-color);
                }
            `;
            document.head.appendChild(u);
        }
    },
    copyText: function (color) {
        var v = document.createElement("textarea");
        v.style.cssText = "position:absolute;left:-9999px";
        v.value = color;
        document.body.appendChild(v);
        v.select();
        try {
            document.execCommand("copy");
        } catch (e) {
            console.error("Failed to copy text", e);
        }
        window.getSelection().removeAllRanges();
        v.remove();
    },
    isLight: function (color) {
        var v = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color),
            e = parseInt(v[1], 16),
            d = parseInt(v[2], 16),
            P = parseInt(v[3], 16);
        return 160 <= Math.round((299 * e + 587 * d + 114 * P) / 1000);
    }
};

// --- Blinking highlight for a linked palette ---
// When the URL contains ?palette=Palette+Name, this code scrolls to and blinks the palette's info elements.
document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var selectedPalette = urlParams.get("palette");
    if (selectedPalette) {
        var paletteId = "palette-" + selectedPalette.toLowerCase().replace(/\s+/g, '-');
        var widget = document.getElementById(paletteId);
        if (widget) {
            widget.scrollIntoView({ behavior: "smooth", block: "center" });
            var infoName = widget.querySelector(".brutalist-palette-widget_info");
            var shareLink = widget.querySelector(".brutalist-palette-widget_share");
            var blinkCount = 0;
            var blinkInterval = setInterval(function () {
                if (blinkCount >= 6) {
                    clearInterval(blinkInterval);
                    infoName.style.backgroundColor = "";
                    infoName.style.color = "";
                    infoName.style.padding = "";
                    infoName.style.borderRadius = "";
                    shareLink.style.color = "";
                    return;
                }
                if (blinkCount % 2 === 0) {
                    infoName.style.backgroundColor = "black";
                    infoName.style.color = "white";
                    shareLink.style.color = "white";
                } else {
                    infoName.style.backgroundColor = "";
                    infoName.style.color = "";
                    infoName.style.padding = "";
                    infoName.style.borderRadius = "";
                    shareLink.style.color = "";
                }
                blinkCount++;
            }, 500);
        }
    }
});
