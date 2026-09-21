/* Recolor embedded Desktop SVG images without replacing their artwork.
 * Standard Solid icons have a colored tile and white glyph; Outline reverses it.
 * CSS-only rules cannot address paths inside an <img>.
 */
(() => {
	function installFilters() {
		if (document.getElementById("novatama-icon-filter-definitions")) return;
		const ns = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(ns, "svg");
		svg.id = "novatama-icon-filter-definitions";
		svg.setAttribute("width", "0");
		svg.setAttribute("height", "0");
		svg.setAttribute("aria-hidden", "true");
		svg.style.position = "absolute";
		svg.style.pointerEvents = "none";
		const defs = document.createElementNS(ns, "defs");
		svg.append(defs);
		// Read the shared CSS palette, so changing the orange token updates images too.
		const hex = getComputedStyle(document.documentElement)
			.getPropertyValue("--novatama-orange").trim();
		const rgb = /^#[0-9a-f]{6}$/i.test(hex)
			? hex.slice(1).match(/../g).map((v) => parseInt(v, 16) / 255)
			: [246 / 255, 107 / 255, 14 / 255];
		for (const variant of ["solid", "outline"]) {
			const filter = document.createElementNS(ns, "filter");
			filter.id = `novatama-${variant}-icon`;
			filter.setAttribute("color-interpolation-filters", "sRGB");
			const gray = document.createElementNS(ns, "feColorMatrix");
			gray.setAttribute("type", "saturate");
			gray.setAttribute("values", "0");
			const transfer = document.createElementNS(ns, "feComponentTransfer");
			for (const channel of ["R", "G", "B"]) {
				const fn = document.createElementNS(ns, `feFunc${channel}`);
				fn.setAttribute("type", "linear");
				fn.setAttribute("slope", variant === "solid" ? "5" : "-5");
				fn.setAttribute("intercept", variant === "solid" ? "-4" : "5");
				transfer.append(fn);
			}
			const palette = document.createElementNS(ns, "feColorMatrix");
			palette.setAttribute("type", "matrix");
			palette.setAttribute("values", [
				`${1-rgb[0]} 0 0 0 ${rgb[0]}`,
				`0 ${1-rgb[1]} 0 0 ${rgb[1]}`,
				`0 0 ${1-rgb[2]} 0 ${rgb[2]}`,
				"0 0 0 1 0",
			].join(" "));
			filter.append(gray, transfer, palette);
			defs.append(filter);
		}
		document.body.append(svg);
		document.documentElement.classList.add("novatama-icon-filters");
	}
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", installFilters, { once: true });
	} else {
		installFilters();
	}
})();
