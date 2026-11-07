# Noia Moon Options vs. Noia Warm Moon Options — coexistence audit

Date: 2026-11-07  
Reference: Noia Moon Options 2.1.2 (original), Noia Warm Moon Options 2.1.2a7/a8, Noia Warm Moon Theme 2.6.0a74.

## Findings

1. Extension identifiers are distinct: `noia-options@addons.palemoon.org` vs. the Warm fork's independent ID (see both `install.rdf` files). Chromes are named `noiamoonoptions` and `noiawarmoptions`; preference prefixes are `extensions.noiamoonop.` vs. `extensions.noiawarmop.`. These are properly separated.
2. The two overlay files both inject a back/forward dropmarker with ID `noiamoon-back-forward-dropmarker`, toolbar button `noiamoon-toolbar-button`, Tools menu item `noiamoonoptions` and AppMenu item `noiamoonoptions_appmenu_options`. Overlapping IDs cause indeterminate overlay and customization behavior when both are enabled.
3. The original Options registers XUL global AGENT styles through `nsIStyleSheetService` in the `profile-after-change` component without checking `general.skins.selectedSkin`. In particular, when no color style was explicitly selected, it may register `grey.css` and set its `grey` preference. Those styles can affect Warm Moon and other themes.
4. Warm Options has a `general.skins.selectedSkin == "noiawarmmoon"` guard in its startup component. This **does not** prevent effects already applied by original Noia Moon Options; nor does it guarantee that global stylesheet registration is cleared on a theme change without restart.
5. Options a8 does not try to uninstall, disable or change preferences belonging to the original extension. It only supplies an explicit notice (main options tab + Add-ons Manager description).

## Temporary beta policy

Both **complete themes** may stay installed. Only **one of the two Options extensions** may be enabled at a time. Choose the one matching the active complete theme. Disable the other in Add-ons Manager and restart Pale Moon after changing theme or extension enable state. Users may retain both Options extensions installed, with their saved preferences intact.

The current solution is guidance rather than enforced mutual exclusion. If users ignore the notice, UI collisions and unexpected global CSS remain possible.

## Long-term option

A common, theme-aware Options manager could support both complete themes, but is a **separate development project**, not a safe pre-beta patch. It would need theme-specific stylesheet registration/unregistration, distinct XUL overlay IDs, deliberate preference migration and tests across restarts and both theme IDs. It must not silently modify preferences of the original Options manager.

## Change scope in 2.1.2a8

`chrome/content/options.xul`: visible compatibility notice.  
`install.rdf`: version increment and descriptive compatibility notice.  
`NOIA_WARM_OPTIONS_TEST_NOTES.txt`: installation guidance.  
No changed runtime JavaScript, CSS, preferences or graphics.
