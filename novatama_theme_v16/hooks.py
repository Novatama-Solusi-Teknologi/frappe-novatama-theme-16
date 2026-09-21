from novatama_theme_v16 import __version__

app_name = "novatama_theme_v16"
app_title = "Novatama Theme v16"
app_publisher = "Novatama"
app_description = "Novatama sidebar, Desktop launcher and primary buttons"
app_license = "MIT"

# Versioned asset URLs invalidate browser/CDN caches after an app release.
# Desk only. Frappe loads this after its standard Desk styles.
app_include_css = [f"/assets/novatama_theme_v16/css/novatama_theme.css?v={__version__}"]

app_include_js = [f"/assets/novatama_theme_v16/js/novatama_theme.js?v={__version__}"]
