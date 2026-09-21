/* Desktop-only branding. Use Frappe's lifecycle rather than changing core pages. */
(() => {
	function renderDesktopBranding() {
		const frappe = window.frappe;
		if (!frappe?.boot) return;
		const defaults = frappe.defaults;
		let company = defaults?.get_user_default?.("Company");
		if (!company) {
			const globalCompany = defaults?.get_global_default?.("company");
			if (globalCompany && defaults?.in_user_permission?.("Company", globalCompany)) {
				company = globalCompany;
			}
		}
		const fullName = frappe.session?.user_fullname || frappe.boot.user?.full_name
			|| frappe.session?.user || "";
		const title = company || (typeof window.__ === "function" ? window.__("Desktop") : "Desktop");

		document.querySelectorAll(".desktop-wrapper").forEach((wrapper) => {
			const container = wrapper.querySelector(":scope > .desktop-container");
			if (!container) return;
			let heading = wrapper.querySelector(":scope > .novatama-desktop-heading");
			if (!heading) {
				heading = document.createElement("section");
				heading.className = "novatama-desktop-heading";
				heading.append(document.createElement("h1"), document.createElement("h3"));
				container.before(heading);
			}
			// Company/user names are text, never HTML.
			heading.querySelector("h1").textContent = title;
			heading.querySelector("h3").textContent = fullName;
			heading.querySelector("h3").hidden = !fullName;

			if (!wrapper.querySelector(":scope > .novatama-desktop-footer")) {
				const footer = document.createElement("footer");
				footer.className = "novatama-desktop-footer";
				footer.textContent = "Powered by Frappe, implemented by Novatama";
				wrapper.append(footer);
			}
		});
	}

	function setup() {
		// Fired by DesktopPage.setup(), including after layout edits/rebuilds.
		window.jQuery?.(document).on("desktop_screen.novatama", renderDesktopBranding);
		window.frappe?.router?.on("change", () => requestAnimationFrame(renderDesktopBranding));
		renderDesktopBranding();
	}
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setup, { once: true });
	} else {
		setup();
	}
})();
