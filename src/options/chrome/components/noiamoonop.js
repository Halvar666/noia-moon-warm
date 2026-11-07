//from Stylish v1.0.8
//http://userstyles.org
//the below is GPL v3

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function noiaMoonOptions() {}

noiaMoonOptions.prototype = {
  classDescription: "nwmStartup",
  contractID: "@nwmoptions.ext/startup;1",
  classID: Components.ID("{a84d3ac0-28d7-4f39-b035-561b70bf6b90}"),
  QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsISupports,Components.interfaces.nsIObserver]),


  observe: function(aSubject,aTopic,aData) {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService)
        .getBranch("extensions.noiawarmop.");

    // Test fork: legacy Noia Moon options should not affect other themes.
    var skinPrefs = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService).getBranch("");
    var currentSkin = "";
    try { currentSkin = skinPrefs.getCharPref("general.skins.selectedSkin"); }
    catch (e) {}
    if (currentSkin != "noiawarmmoon")
      return;

    // One-time compatibility cleanup: legacy color and obsolete warm-icon
    // booleans are never allowed to change the Default appearance.
    // Keep independent folderColor, toolbar sizing and dropmarker prefs intact.
    // Earlier releases could silently enable solid tabs when forcing Grey.
    // Undo those generated side effects only when upgrading a Grey profile.
    var hadLegacyGrey = false;
    try { hadLegacyGrey = prefs.getBoolPref("grey"); } catch (e) {}
    if (hadLegacyGrey) {
      var generated = ["solid", "tabbar", "tabbar2"];
      for (var t=0; t<generated.length; t++) {
        try { if (prefs.prefHasUserValue(generated[t])) prefs.clearUserPref(generated[t]); }
        catch (e) {}
      }
    }
    var superseded = ["grey", "blue", "light", "dark", "dark2", "grey2",
                      "darker", "darker2", "warm", "red", "red2"];
    for (var q=0; q<superseded.length; q++) {
      try {
        if (prefs.prefHasUserValue(superseded[q]))
          prefs.clearUserPref(superseded[q]);
      } catch (e) {}
    }

    // Apply independent palettes at startup before the legacy-options guard.
    // Default intentionally does not register any alternate color stylesheet.
    var sssStartup = Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService);
    var iosStartup = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    function ensureStartupSheet(file) {
      var uri = iosStartup.newURI("chrome://noiawarmoptions/content/" + file, null, null);
      if (!sssStartup.sheetRegistered(uri, sssStartup.AGENT_SHEET))
        sssStartup.loadAndRegisterSheet(uri, sssStartup.AGENT_SHEET);
    }
    // Remove previously registered legacy colors, including stale sheets from a2.
    var oldStyleNames = ["grey", "blue", "light", "dark", "dark2", "grey2", "darker", "darker2"];
    for (var n=0; n<oldStyleNames.length; n++) {
      var oldUri = iosStartup.newURI("chrome://noiawarmoptions/content/" +
                                   oldStyleNames[n] + ".css", null, null);
      if (sssStartup.sheetRegistered(oldUri, sssStartup.AGENT_SHEET))
        sssStartup.unregisterSheet(oldUri, sssStartup.AGENT_SHEET);
    }
    var palettes = ["bronze", "rose", "sage", "black"];
    var selectedPalette = "default";
    try { selectedPalette = prefs.getCharPref("themeVariant"); } catch (e) {}
    var paletteSheets = ["bronze", "rose", "sage", "black", "black-linux", "black-windows"];
    for (var x=0; x<paletteSheets.length; x++) {
      var pUri = iosStartup.newURI("chrome://noiawarmoptions/content/palettes/"+
                                  paletteSheets[x]+".css", null, null);
      if (sssStartup.sheetRegistered(pUri, sssStartup.AGENT_SHEET))
        sssStartup.unregisterSheet(pUri, sssStartup.AGENT_SHEET);
    }
    if (palettes.indexOf(selectedPalette) >= 0) {
      ensureStartupSheet("palettes/" + selectedPalette + ".css");
      // Curated Black uses small OS-specific layers, as in Noia Epyrus.
      if (selectedPalette == "black") {
        var os = "";
        try {
          os = Components.classes["@mozilla.org/xre/app-info;1"]
            .getService(Components.interfaces.nsIXULRuntime).OS;
        } catch (e) {}
        if (os == "Linux") ensureStartupSheet("palettes/black-linux.css");
        if (os == "WINNT") ensureStartupSheet("palettes/black-windows.css");
      }
    }
    var selectedFolders = "red";
    try { selectedFolders = prefs.getCharPref("folderColor"); } catch (e) {}
    if (["yellow", "violet", "orange", "grey", "green", "cyan", "blue"].indexOf(selectedFolders) >= 0)
      ensureStartupSheet("folders/" + selectedFolders + ".css");

    var watcher = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher);
    var listenOpen = {
      observe : function(aSubject, aTopic) {
        if(aTopic!="domwindowopened")
          return;
        aSubject.addEventListener("load", mainFunction, false);
      }
    };
    watcher.registerNotification(listenOpen);
    var mWindows = watcher.getWindowEnumerator();
    while (mWindows.hasMoreElements()) {
      mainFunction(mWindows.getNext());
    }
    function mainFunction(aWindow) {
      try {
        if(aWindow instanceof Components.interfaces.nsIDOMEvent) {
          aWindow = aWindow.currentTarget;
        }
        if(aWindow.document.documentElement.getAttribute("windowtype")!="navigator:browser")
          return;
      } catch(e) {}
      var doc = aWindow.document;
      aWindow.removeEventListener("load", mainFunction, false);
      // If no legacy styling was explicitly chosen, do not set nm* attributes.
      // In Noia Warm Moon those "false" attributes can themselves activate
      // optional selectors and alter the default theme appearance.
      var legacyKeys = ["solid", "shadow", "closebutton", "noline", "tabbar", "strip", "scrollbars", "tabbottom",
        "normal", "hide", "rdtab", "sqtab",
        "semiroundedtab", "addon", "personalbutton",
        "toolbarbutton", "navbarbutton", "fix", "navbuttons", "forward",
        "bfdrop", "bfdrop2", "bfdrop3", "bookmark", "rdbutton",
        "rdmenubutton", "rdtabbox"];
      var legacyEnabled = false;
      for (var k=0; k<legacyKeys.length; k++) {
        if (prefs.getBoolPref(legacyKeys[k])) { legacyEnabled = true; break; }
      }
      if (!legacyEnabled) return;
      var xulRuntime = Components.classes["@mozilla.org/xre/app-info;1"]
        .getService(Components.interfaces.nsIXULRuntime);

      // Set attribute on #main-window for use by Noia Moon theme.

      switch(xulRuntime.OS) {
        case "Darwin":
          doc.getElementById('main-window').setAttribute('nmdarwin',true);
          break;
        case "Linux":
          doc.getElementById('main-window').setAttribute('nmlinux',true);
          break;
        case "WINNT":
          doc.getElementById('main-window').setAttribute('nmwinnt',true);
          break;
        default:
          doc.getElementById('main-window').setAttribute('nmother',true);
          break;
      }

      if (prefs.getBoolPref("dark") == true) {
        doc.getElementById('main-window').setAttribute('nmblack',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmblack',false);
      }
      if (prefs.getBoolPref("strip") == true) {
        doc.getElementById('main-window').setAttribute('nmstrip',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmstrip',false);
      }
      if (prefs.getBoolPref("solid") == true) {
        doc.getElementById('main-window').setAttribute('nmsolid',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmsolid',false);
      }
      if (prefs.getBoolPref("noline") == true) {
        doc.getElementById('main-window').setAttribute('nmnoline',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmnoline',false);
      }
      if (prefs.getBoolPref("tabbar") == true) {
        doc.getElementById('main-window').setAttribute('nmtabbar',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmtabbar',false);
      }
      if (prefs.getBoolPref("tabbottom") == true) {
        doc.getElementById('main-window').setAttribute('nmbottom',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmbottom',false);
      }
      if (prefs.getBoolPref("blue") == true) {
        doc.getElementById('main-window').setAttribute('nmblue',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmblue',false);
      }
      if (prefs.getBoolPref("light") == true) {
        doc.getElementById('main-window').setAttribute('nmlight',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmlight',false);
      }
      if (prefs.getBoolPref("rdtab") == true) {
        doc.getElementById('main-window').setAttribute('nmrdtab',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmrdtab',false);
      }
      if (prefs.getBoolPref("normal") == true) {
        doc.getElementById('main-window').setAttribute('nmnormal',true);
      } else {
        doc.getElementById('main-window').setAttribute('nmnormal',false);
      }
    }

    //apply the style sheets
    function applyIt(file) {
      var uri = ios.newURI(c + file,null,null);
      if (!sss.sheetRegistered(uri,sss.AGENT_SHEET)) {
        sss.loadAndRegisterSheet(uri,sss.AGENT_SHEET);
      }
    }

    var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService);
    var ios = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    var uri;
    var c = "chrome://noiawarmoptions/content/";

    // Folder color is an independent preference. Red uses unmodified theme assets.
    var folderColor = "red";
    try { folderColor = prefs.getCharPref("folderColor"); } catch (e) {}
    var allowedColors = {yellow:true, violet:true, orange:true, grey:true,
                         green:true, cyan:true, blue:true};
    if (allowedColors[folderColor]) {
      applyIt("folders/" + folderColor + ".css");
    }

    if (prefs.getBoolPref("semiroundedtab") == true) {
      applyIt("semi_rounded_tab.css");
    }

    // NWM: no automatic grey.css or preference rewriting.

    if (prefs.getBoolPref("grey") == true) {
      if (prefs.getBoolPref("blue") == false) {
        if (prefs.getBoolPref("dark") == false) {
          if (prefs.getBoolPref("light") == true) {
            prefs.setBoolPref("grey",false);
          }
        }
      }
    }

    // NWM: no automatic sqtab.css activation.

    // a3: legacy dark palette disabled; select the explicit themeVariant instead.

    if (prefs.getBoolPref("dark") == true) {
      /* retired color stylesheet: dark2 */
    }

    // a3: legacy blue palette disabled; select the explicit themeVariant instead.

    // a3: legacy grey palette disabled; select the explicit themeVariant instead.

    // a3: legacy grey2 palette disabled; select the explicit themeVariant instead.

    // a3: legacy darker palette disabled; select the explicit themeVariant instead.

    // a3: legacy darker2 palette disabled; select the explicit themeVariant instead.

    // a3: legacy light palette disabled; select the explicit themeVariant instead.

    if (prefs.getBoolPref("shadow") == true) {
      applyIt("shadow.css");
    }

    if (prefs.getBoolPref("closebutton") == true) {
      applyIt("closebutton.css");
    }

    if (prefs.getBoolPref("noline") == true) {
      applyIt("noline.css");
    }

    if (prefs.getBoolPref("dark") == false) {
      if (prefs.getBoolPref("noline") == true) {
        applyIt("noline2.css");
      }
    }

    if (prefs.getBoolPref("tabbar") == true) {
      if (prefs.getBoolPref("noline") == true) {
        applyIt("tabbar.css");
      }
    }

    if (prefs.getBoolPref("tabbar") == true) {
      if (prefs.getBoolPref("noline") == false) {
        applyIt("tabbar2.css");
      }
    }

    if (prefs.getBoolPref("strip") == true) {
      applyIt("strip.css");
    }

    if (prefs.getBoolPref("semiroundedtab") == true) {
      applyIt("semi_rounded_tab.css");
    }

    if (prefs.getBoolPref("rdtab") == true) {
      applyIt("rdtab.css");
    }

    if (prefs.getBoolPref("sqtab") == true) {
      applyIt("sqtab.css");
    }

    if (prefs.getBoolPref("dark") == true) {
      if (prefs.getBoolPref("solid") == true) {
        applyIt("solid2.css");
      }
    }

    if (prefs.getBoolPref("dark") == false) {
      if (prefs.getBoolPref("solid") == true) {
        applyIt("solid.css");
      }
    }

    if (prefs.getBoolPref("scrollbars") == true) {
      applyIt("scrollbars.css");
    }

    if (prefs.getBoolPref("tabbottom") == true) {
      applyIt("tabbottom.css");
    }

    if (prefs.getBoolPref("normal") == true) {
      applyIt("normal.css");
    }

    if (prefs.getBoolPref("hide") == true) {
      applyIt("hide.css");
    }

    if (prefs.getBoolPref("rdbutton") == true) {
      applyIt("rdbutton.css");
    }

    if (prefs.getBoolPref("rdmenubutton") == true) {
      applyIt("rdmenubutton.css");
    }

    if (prefs.getBoolPref("rdtabbox") == true) {
      applyIt("rdtabbox.css");
    }

    if (prefs.getBoolPref("warm") == true) {
      /* a3: obsolete icon override warm not applied */
    }

    if (prefs.getBoolPref("red") == true) {
      /* a3: obsolete icon override red not applied */
    }

    if (prefs.getBoolPref("red2") == true) {
      /* a3: obsolete icon override red2 not applied */
    }

    if (prefs.getBoolPref("navbuttons") == true) {
      applyIt("navbuttons.css");
    }

    if (prefs.getBoolPref("forward") == true) {
      applyIt("forward.css");
    }

    if (prefs.getBoolPref("bfdrop") == true) {
      applyIt("bfdrop.css");
    }

    if (prefs.getBoolPref("bfdrop2") == true) {
      applyIt("bfdrop2.css");
    }

    if (prefs.getBoolPref("bfdrop3") == true) {
      applyIt("bfdrop3.css");
    }

    if (prefs.getBoolPref("bookmark") == true) {
      applyIt("bookmark.css");
    }

    if (prefs.getBoolPref("addon") == true) {
      applyIt("addon.css");
    }

    if (prefs.getBoolPref("personalbutton") == true) {
      applyIt("personalbutton.css");
    }

    if (prefs.getBoolPref("toolbarbutton") == true) {
      applyIt("toolbarbutton.css");
    }

    if (prefs.getBoolPref("navbarbutton") == true) {
      applyIt("navbar.css");
    }

    if (prefs.getBoolPref("fix") == true) {
      applyIt("fix.css");
    }
  }
};

if (XPCOMUtils.generateNSGetFactory) {
  var NSGetFactory = XPCOMUtils.generateNSGetFactory([noiaMoonOptions]);
} else {
  var NSGetModule = XPCOMUtils.generateNSGetModule([noiaMoonOptions]);
}
