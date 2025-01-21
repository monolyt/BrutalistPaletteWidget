"use strict";
var BrutalistPaletteWidget = function (colors, name, description) {
    this.colors = colors;
    this.name = name;
    this.description = description;
    this.initElements();
};

BrutalistPaletteWidget.prototype = {
    initElements: function () {
        var d = this,
            v = document.currentScript; // Get the current script element

        var f = document.createElement("div");
        f.classList.add("brutalist-palette-widget");
        v.parentNode.insertBefore(f, v.nextSibling);

        var P = document.createElement("div");
        P.classList.add("brutalist-palette-widget_colors");
        this.colors.forEach(function (color) {
            var v = document.createElement("div");
            v.style.background = "#" + color;
            d.isLight(color) && v.classList.add("is-light");
            var e = document.createElement("span");
            e.innerHTML = "#" + color.toUpperCase();
            v.onclick = function () {
                e.innerHTML = "Copied!";
                d.copyText("#" + color);
            };
            v.onmouseleave = function () {
                setTimeout(function () {
                    e.innerHTML = "#" + color.toUpperCase();
                }, 200);
            };
            v.appendChild(e);
            P.appendChild(v);
        });

        var e = document.createElement("div");
        e.classList.add("brutalist-palette-widget_info");

        var q = document.createElement("div");
        q.classList.add("brutalist-palette-widget_info_name");
        if (this.name) q.innerHTML = this.name;

        e.appendChild(q);
        f.appendChild(P);
        f.appendChild(e);

        if (this.description) {
            var dBox = document.createElement("div");
            dBox.classList.add("brutalist-palette-widget_description");
            dBox.innerHTML = this.description;
            f.appendChild(dBox);
        }

        if (document.getElementsByClassName("brutalist-palette-widget-css").length === 0) {
            var u = document.createElement("style");
            u.classList.add("brutalist-palette-widget-css");
            u.innerHTML = `
                .brutalist-palette-widget {
                    all: unset;
                    background: var(--color-background);
                    border: 1px solid var(--color-border);
                    display: block;
                    overflow: hidden;
                    height: auto;
                    margin: 2rem auto;
                    font-size: 14px;
                    color: var(--color-text);
                    transition: background var(--transition-time) ease;
                }
                .brutalist-palette-widget_colors {
                    display: flex;
                    width: 100%;
                    height: 114px;
                }
                .brutalist-palette-widget_colors div {
                    flex-grow: 1;
                    transition: all 0.1s ease-in-out;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    border-right: 1px solid var(--color-border);
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
                    color: #fff;
                    opacity: 0;
                    transition: all 0.1s ease-in-out;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: bold;
                }
                .brutalist-palette-widget_colors div.is-light span {
                    color: #000;
                }
                .brutalist-palette-widget_colors div:hover {
                    flex-basis: 80px;
                }
                .brutalist-palette-widget_colors div:hover span {
                    opacity: 1;
                }
                .brutalist-palette-widget_info {
                    position: relative;
                    padding: 0 15px;
                    height: 36px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-top: 1px solid var(--color-border);
                }
                .brutalist-palette-widget_info_name {
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .brutalist-palette-widget_description {
                    font-size: 12px;
                    padding: 10px 15px;
                    color: var(--color-text-secondary);
                    border-top: 1px solid var(--color-border);
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
        return 160 <= Math.round((299 * e + 587 * d + 114 * P) / 1e3);
    }
};
