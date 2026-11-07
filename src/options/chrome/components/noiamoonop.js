/*
 * Noia Moon Warm Options — startup stylesheet and window state controller.
 *
 * Independent implementation for Noia Moon Warm.
 * SPDX-License-Identifier: MPL-2.0
 *
 * The component is deliberately limited to this theme and its own
 * preferences; it does not change the original Noia Moon Options add-on.
 */

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

var NWM = {
  skin: "noiawarmmoon",
  preferences: "extensions.noiawarmop.",
  baseURI: "chrome://noiawarmoptions/content/",

  // Only these optional color variants are supported by the Warm theme.
  palettes: ["bronze", "rose", "sage", "black"],
  folders: ["yellow", "violet", "orange", "grey", "green", "cyan", "blue"],
  retiredColors: ["grey", "blue", "light", "dark", "dark2", "grey2",
                  "darker", "darker2", "warm", "red", "red2"],
  retiredSheets: ["grey", "blue", "light", "dark", "dark2", "grey2",
                  "darker", "darker2"],
  paletteLayers: ["bronze", "rose", "sage", "black", "black-linux", "black-windows"],

  // The preference names and CSS filenames form part of the existing UI API.
  // Their order preserves the intended stylesheet cascade.
  legacySheets: [
    ["semiroundedtab", "semi_rounded_tab.css"],
    ["shadow", "shadow.css"],
    ["closebutton", "closebutton.css"],
    ["noline", "noline.css"],
    ["noline", "noline2.css", "noDark"],
    ["tabbar", "tabbar.css", "withNoLine"],
    ["tabbar", "tabbar2.css", "withoutNoLine"],
    ["strip", "strip.css"],
    ["rdtab", "rdtab.css"],
    ["sqtab", "sqtab.css"],
    ["solid", "solid2.css", "withDark"],
    ["solid", "solid.css", "noDark"],
    ["scrollbars", "scrollbars.css"],
    ["tabbottom", "tabbottom.css"],
    ["normal", "normal.css"],
    ["hide", "hide.css"],
    ["rdbutton", "rdbutton.css"],
    ["rdmenubutton", "rdmenubutton.css"],
    ["rdtabbox", "rdtabbox.css"],
    ["navbuttons", "navbuttons.css"],
    ["forward", "forward.css"],
    ["bfdrop", "bfdrop.css"],
    ["bfdrop2", "bfdrop2.css"],
    ["bfdrop3", "bfdrop3.css"],
    ["bookmark", "bookmark.css"],
    ["addon", "addon.css"],
    ["personalbutton", "personalbutton.css"],
    ["toolbarbutton", "toolbarbutton.css"],
    ["navbarbutton", "navbar.css"],
    ["fix", "fix.css"]
  ],

  // These preferences control a DOM attribute, but do not always load CSS.
  windowFlags: [
    ["dark", "nmblack"],
    ["strip", "nmstrip"],
    ["solid", "nmsolid"],
    ["noline", "nmnoline"],
    ["tabbar", "nmtabbar"],
    ["tabbottom", "nmbottom"],
    ["blue", "nmblue"],
    ["light", "nmlight"],
    ["rdtab", "nmrdtab"],
    ["normal", "nmnormal"]
  ],

  // Controls that opt into the older attribute-based window styling.
  legacyControls: [
    "solid", "shadow", "closebutton", "noline", "tabbar", "strip",
    "scrollbars", "tabbottom", "normal", "hide", "rdtab", "sqtab",
    "semiroundedtab", "addon", "personalbutton", "toolbarbutton",
    "navbarbutton", "fix", "navbuttons", "forward", "bfdrop", "bfdrop2",
    "bfdrop3", "bookmark", "rdbutton", "rdmenubutton", "rdtabbox"
  ]
};

function NoiaWarmStartup() {
  this._ready = false;
  this._windowHook = null;
}

NoiaWarmStartup.prototype = {
  classDescription: "nwmStartup",
  contractID: "@nwmoptions.ext/startup;1",
  classID: Components.ID("{a84d3ac0-28d7-4f39-b035-561b70bf6b90}"),
  QueryInterface: XPCOMUtils.generateQI([
    Components.interfaces.nsISupports,
    Components.interfaces.nsIObserver
  ]),

  observe: function(subject, topic, data) {
    if (topic != "profile-after-change" || this._ready)
      return;
    this._ready = true;

    var service = Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService);
    var selected = "";
    try { selected = service.getBranch("").getCharPref("general.skins.selectedSkin"); }
    catch (e) { /* No skin selected yet. */ }
    if (selected != NWM.skin)
      return;

    this._prefs = service.getBranch(NWM.preferences);
    this._io = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    this._styles = Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService);

    this._discardRetiredPreferences();
    this._loadConfiguredStyles();
    this._watchBrowserWindows();
  },

  _enabled: function(key) {
    try { return this._prefs.getBoolPref(key); }
    catch (e) { return false; }
  },

  _selectedValue: function(key, fallback) {
    try { return this._prefs.getCharPref(key); }
    catch (e) { return fallback; }
  },

  _discardRetiredPreferences: function() {
    // Older releases could silently enable these three flags with Grey.
    if (this._enabled("grey")) {
      var generated = ["solid", "tabbar", "tabbar2"];
      for (var i = 0; i < generated.length; ++i)
        this._clearStoredValue(generated[i]);
    }
    for (var j = 0; j < NWM.retiredColors.length; ++j)
      this._clearStoredValue(NWM.retiredColors[j]);
  },

  _clearStoredValue: function(key) {
    try {
      if (this._prefs.prefHasUserValue(key))
        this._prefs.clearUserPref(key);
    } catch (e) { /* Absent/locked preference: leave it alone. */ }
  },

  _sheetURI: function(relativePath) {
    return this._io.newURI(NWM.baseURI + relativePath, null, null);
  },

  _setSheet: function(relativePath, enabled) {
    var uri = this._sheetURI(relativePath);
    var kind = this._styles.AGENT_SHEET;
    var registered = this._styles.sheetRegistered(uri, kind);
    if (enabled && !registered)
      this._styles.loadAndRegisterSheet(uri, kind);
    else if (!enabled && registered)
      this._styles.unregisterSheet(uri, kind);
  },

  _loadConfiguredStyles: function() {
    var i;
    // Undo stale global sheets from earlier Warm Options generations.
    for (i = 0; i < NWM.retiredSheets.length; ++i)
      this._setSheet(NWM.retiredSheets[i] + ".css", false);
    for (i = 0; i < NWM.paletteLayers.length; ++i)
      this._setSheet("palettes/" + NWM.paletteLayers[i] + ".css", false);

    var palette = this._selectedValue("themeVariant", "default");
    if (NWM.palettes.indexOf(palette) != -1) {
      this._setSheet("palettes/" + palette + ".css", true);
      if (palette == "black") {
        var platform = this._platform();
        if (platform == "Linux")
          this._setSheet("palettes/black-linux.css", true);
        else if (platform == "WINNT")
          this._setSheet("palettes/black-windows.css", true);
      }
    }

    var folder = this._selectedValue("folderColor", "red");
    if (NWM.folders.indexOf(folder) != -1)
      this._setSheet("folders/" + folder + ".css", true);

    // Legacy options are opt-in: the default theme loads no extra styles.
    // Conditional entries remain in the same cascade order as the old UI.
    for (i = 0; i < NWM.legacySheets.length; ++i) {
      var rule = NWM.legacySheets[i];
      if (this._enabled(rule[0]) && this._conditionMet(rule[2]))
        this._setSheet(rule[1], true);
    }
  },

  _conditionMet: function(kind) {
    if (!kind) return true;
    if (kind == "noDark") return !this._enabled("dark");
    if (kind == "withDark") return this._enabled("dark");
    if (kind == "withNoLine") return this._enabled("noline");
    if (kind == "withoutNoLine") return !this._enabled("noline");
    return false;
  },

  _platform: function() {
    try {
      return Components.classes["@mozilla.org/xre/app-info;1"]
        .getService(Components.interfaces.nsIXULRuntime).OS;
    } catch (e) { return ""; }
  },

  _hasLegacyWindowStyling: function() {
    for (var i = 0; i < NWM.legacyControls.length; ++i) {
      if (this._enabled(NWM.legacyControls[i]))
        return true;
    }
    return false;
  },

  _styleWindow: function(win) {
    if (!this._hasLegacyWindowStyling() || !win || !win.document)
      return;
    var doc = win.document;
    if (!doc.documentElement ||
        doc.documentElement.getAttribute("windowtype") != "navigator:browser")
      return;
    var root = doc.getElementById("main-window");
    if (!root)
      return;

    var systems = {Darwin: "nmdarwin", Linux: "nmlinux", WINNT: "nmwinnt"};
    var osAttr = systems[this._platform()] || "nmother";
    root.setAttribute(osAttr, "true");
    for (var i = 0; i < NWM.windowFlags.length; ++i) {
      var rule = NWM.windowFlags[i];
      root.setAttribute(rule[1], this._enabled(rule[0]) ? "true" : "false");
    }
  },

  _watchBrowserWindows: function() {
    var self = this;
    var watcher = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
      .getService(Components.interfaces.nsIWindowWatcher);

    function whenLoaded(evt) {
      var win = evt.currentTarget;
      win.removeEventListener("load", whenLoaded, false);
      self._styleWindow(win);
    }

    // Retain this listener for the lifetime of the XPCOM component.
    this._windowHook = {
      observe: function(win, topic) {
        if (topic == "domwindowopened")
          win.addEventListener("load", whenLoaded, false);
      }
    };
    watcher.registerNotification(this._windowHook);
    var opened = watcher.getWindowEnumerator();
    while (opened.hasMoreElements())
      this._styleWindow(opened.getNext());
  }
};

if (XPCOMUtils.generateNSGetFactory)
  var NSGetFactory = XPCOMUtils.generateNSGetFactory([NoiaWarmStartup]);
else
  var NSGetModule = XPCOMUtils.generateNSGetModule([NoiaWarmStartup]);
