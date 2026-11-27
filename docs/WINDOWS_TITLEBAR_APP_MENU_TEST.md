# Windows titlebar app-menu alignment test

Experimental build based on the public Noia Moon Warm 1.0.0b1 release.

## Change under test

Pale Moon places the app-menu button container and caption-button container
as siblings inside `#titlebar-content`. The current theme's Windows rules
left the row content top-aligned and applied a negative bottom margin to the
caption-button box. The test gives the titlebar content a 26px minimum height,
centers its children, and removes the caption box's vertical offset.

The change is limited to Windows titlebars outside tabs-in-titlebar and
fullscreen modes. The existing maximized-window a73 geometry remains in place.

## Test

1. Install the XPI over Noia Moon Warm 1.0.0b1.
2. On Windows, show the app-menu button (hide the classic menu bar if needed).
3. Check both the app-menu button at the left and minimize/maximize/close
   controls at the right, in normal and maximized window states.
4. Confirm the full button graphics are visible and vertically centered.
5. Check menu-bar-visible mode and tabs-on-top if those are part of the setup.
6. Report any change in titlebar height, tabs placement, or window resizing.

This is a test build, not a public release. Do not publish it as 1.0.0b2.
