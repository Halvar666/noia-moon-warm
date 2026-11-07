if (!noiawarmop) {var noiawarmop = {};}
if (!noiawarmop.options) {noiawarmop.options = {};}

noiawarmop.options = {

  prefs: Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch("extensions.noiawarmop."),

  //get options from prefs for options dialog
  init: function() {
    var prefs = this.prefs,idTmp;

    function set(id,pref) {
      idTmp = document.getElementById(id);
      if (prefs.getBoolPref(pref) == true) {
        idTmp.value = 1;
      } else {
        idTmp.value = 0;
      }
    }
    set("SemiRoundedtabRadio","semiroundedtab");
    set("rdtabRadio","rdtab");
    set("sqtabRadio","sqtab");
    set("rdbuttonRadio","rdbutton");
    set("rdmenubuttonRadio","rdmenubutton");
    set("rdtabboxRadio","rdtabbox");
    set("bookmarkRadio","bookmark");
    set("addonRadio","addon");

    if (prefs.getBoolPref("grey") == false) {
      document.getElementById('grey2Radio').disabled = true;
      document.getElementById('darkerRadio').disabled = true;
      document.getElementById('darker2Radio').disabled = true;
      document.getElementById('tabbarRadio').disabled = true;
    }

    if (prefs.getBoolPref("grey") == true) {
      document.getElementById('grey2Radio').disabled = false;
      document.getElementById('darkerRadio').disabled = false;
      document.getElementById('darker2Radio').disabled = false;
      document.getElementById('tabbarRadio').disabled = false;
    }

    var xulRuntime = Components.classes["@mozilla.org/xre/app-info;1"]
          .getService(Components.interfaces.nsIXULRuntime);

    if ("Darwin" == xulRuntime.OS) {
      document.getElementById('normalRadio').disabled = true;
      document.getElementById('grey2Radio').disabled = true;
    }

    if ("Linux" == xulRuntime.OS) {
      document.getElementById('normalRadio').disabled = true;
      document.getElementById('grey2Radio').disabled = true;
    }

    var picker = document.getElementById("folderColorPicker");
    if (picker) picker.value = this.getFolderColor();
    this.updateFolderColorStatus();
    var themePicker = document.getElementById("themeVariantPicker");
    if (themePicker) themePicker.value = this.getThemeVariant();
    this.updateThemeVariantStatus();
  },
  tOpen: function(url) {

    var wm  = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
    var wmi = wm.QueryInterface(Components.interfaces.nsIWindowMediator);
    var win = wmi.getMostRecentWindow("navigator:browser");
    if (win) {
      let tab = win.gBrowser.addTab(url);
      win.gBrowser.selectedTab = tab;
      return;
    }
  },

  themeVariants: ["default", "bronze", "rose", "sage", "black"],

  getThemeVariant: function() {
    try {
      var variant = this.prefs.getCharPref("themeVariant");
      if (this.themeVariants.indexOf(variant) >= 0) return variant;
    } catch (e) {}
    return "default";
  },

  updateThemeVariantStatus: function() {
    var node = document.getElementById("themeVariantStatus");
    if (!node) return;
    var variant = this.getThemeVariant();
    node.setAttribute("value", variant == "default" ?
      "Default: no alternative appearance stylesheet. Existing folder colors and other options are retained." :
      "Selected " + variant + " palette. Restart Pale Moon to apply the change consistently." );
  },

  // Never implicitly activate a replacement color theme.
  setThemeVariant: function(variant) {
    if (this.themeVariants.indexOf(variant) < 0) return;
    var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService);
    var ios = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    // Clear both the old Noia color styles and all other optional palettes.
    var legacy = ["grey.css", "blue.css", "light.css", "dark.css", "dark2.css",
                  "grey2.css", "darker.css", "darker2.css"];
    for (var i=0; i<legacy.length; i++) {
      var old = ios.newURI("chrome://noiawarmoptions/content/" + legacy[i], null, null);
      if (sss.sheetRegistered(old, sss.AGENT_SHEET))
        sss.unregisterSheet(old, sss.AGENT_SHEET);
    }
    // Always remove ALL opt-in palette layers before changing scheme.
    var paletteLayers = ["bronze", "rose", "sage", "black", "black-linux", "black-windows"];
    for (var j=0; j<paletteLayers.length; j++) {
      var uri = ios.newURI("chrome://noiawarmoptions/content/palettes/" +
                          paletteLayers[j] + ".css", null, null);
      if (sss.sheetRegistered(uri, sss.AGENT_SHEET))
        sss.unregisterSheet(uri, sss.AGENT_SHEET);
    }
    var oldColorPrefs = ["grey", "blue", "light", "dark", "grey2", "darker", "darker2", "dark2"];
    for (var k=0; k<oldColorPrefs.length; k++)
      this.prefs.setBoolPref(oldColorPrefs[k], false);
    this.prefs.setCharPref("themeVariant", variant);
    if (variant != "default" && this.isWarmTheme()) {
      var next = ios.newURI("chrome://noiawarmoptions/content/palettes/" + variant + ".css", null, null);
      if (!sss.sheetRegistered(next, sss.AGENT_SHEET))
        sss.loadAndRegisterSheet(next, sss.AGENT_SHEET);
      if (variant == "black") {
        var os = "";
        try {
          os = Components.classes["@mozilla.org/xre/app-info;1"]
            .getService(Components.interfaces.nsIXULRuntime).OS;
        } catch (e) {}
        var platformSheet = os == "Linux" ? "black-linux" :
                            os == "WINNT" ? "black-windows" : "";
        if (platformSheet) {
          var platformUri = ios.newURI("chrome://noiawarmoptions/content/palettes/" +
                                       platformSheet + ".css", null, null);
          if (!sss.sheetRegistered(platformUri, sss.AGENT_SHEET))
            sss.loadAndRegisterSheet(platformUri, sss.AGENT_SHEET);
        }
      }
    }
    // Remove obsolete theme-state attributes, rather than setting them to "false".
    try {
      var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
        .getService(Components.interfaces.nsIWindowMediator);
      var windows = wm.getEnumerator("navigator:browser");
      while (windows.hasMoreElements()) {
        var root = windows.getNext().document.getElementById("main-window");
        if (root) {
          root.removeAttribute("nmblack");
          root.removeAttribute("nmblue");
          root.removeAttribute("nmlight");
        }
      }
    } catch (e) {}
    this.updateThemeVariantStatus();
  },

  folderColors: ["red", "yellow", "violet", "orange", "grey", "green", "cyan", "blue"],

  getFolderColor: function() {
    try {
      var color = this.prefs.getCharPref("folderColor");
      if (this.folderColors.indexOf(color) >= 0) return color;
    } catch (e) {}
    return "red";
  },

  isWarmTheme: function() {
    try {
      return Components.classes["@mozilla.org/preferences-service;1"]
          .getService(Components.interfaces.nsIPrefService)
          .getBranch("").getCharPref("general.skins.selectedSkin") == "noiawarmmoon";
    } catch (e) { return false; }
  },

  updateFolderColorStatus: function() {
    var info = document.getElementById("folderColorStatus");
    if (info) info.setAttribute("value", this.isWarmTheme() ?
      "Active: Noia Moon Warm. Folder colors apply to Bookmarks Sidebar, Library and Bookmarks Toolbar (restart required)." :
      "Noia Moon Warm must be the active theme. Restart Pale Moon after a theme change.");
  },

  applyFolderColor: function(color) {
    var sheetService = Components.classes["@mozilla.org/content/style-sheet-service;1"]
        .getService(Components.interfaces.nsIStyleSheetService);
    var io = Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);
    // Unregister prior folder variants only, never touch the original Options CSS.
    for (var i=1; i<this.folderColors.length; i++) {
      var old = io.newURI("chrome://noiawarmoptions/content/folders/" +
                          this.folderColors[i] + ".css", null, null);
      if (sheetService.sheetRegistered(old, sheetService.AGENT_SHEET))
        sheetService.unregisterSheet(old, sheetService.AGENT_SHEET);
    }
    if (color != "red" && this.isWarmTheme()) {
      var next = io.newURI("chrome://noiawarmoptions/content/folders/" + color + ".css", null, null);
      sheetService.loadAndRegisterSheet(next, sheetService.AGENT_SHEET);
    }
  },

  setFolderColor: function(color) {
    if (this.folderColors.indexOf(color) < 0) return;
    this.prefs.setCharPref("folderColor", color);
    this.applyFolderColor(color);
    this.updateFolderColorStatus();
  },

  resetnm: function() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch("extensions.noiawarmop.");

    this.prefs.clearUserPref("dark");
    this.prefs.clearUserPref("grey");
    this.prefs.clearUserPref("blue");
    this.prefs.clearUserPref("grey2");
    this.prefs.clearUserPref("semiroundedtab");
    this.prefs.clearUserPref("rdtab");
    this.prefs.clearUserPref("sqtab");
    this.prefs.clearUserPref("shadow");
    this.prefs.clearUserPref("closebutton");
    this.prefs.clearUserPref("noline");
    this.prefs.clearUserPref("tabbar");
    this.prefs.clearUserPref("strip");
    this.prefs.clearUserPref("solid");
    this.prefs.clearUserPref("scrollbars");
    this.prefs.clearUserPref("tabbottom");
    this.prefs.clearUserPref("normal");
    this.prefs.clearUserPref("darker");
    this.prefs.clearUserPref("darker2");
    this.prefs.clearUserPref("light");
    this.prefs.clearUserPref("hide");
    this.prefs.clearUserPref("rdbutton");
    this.prefs.clearUserPref("rdmenubutton");
    this.prefs.clearUserPref("rdtabbox");
    this.prefs.clearUserPref("warm");
    this.prefs.clearUserPref("red");
    this.prefs.clearUserPref("red2");
    this.prefs.clearUserPref("navbuttons");
    this.prefs.clearUserPref("forward");
    this.prefs.clearUserPref("bfdrop");
    this.prefs.clearUserPref("bfdrop2");
    this.prefs.clearUserPref("bfdrop3");
    this.prefs.clearUserPref("bookmark");
    this.prefs.clearUserPref("addon");
    this.prefs.clearUserPref("personalbutton");
    this.prefs.clearUserPref("toolbarbutton");
    this.prefs.clearUserPref("navbarbutton");
    this.prefs.clearUserPref("plain");
    this.prefs.clearUserPref("background");
    this.prefs.clearUserPref("fix");
    this.prefs.clearUserPref("ontop");
    this.prefs.setBoolPref("dark2",false);
    this.prefs.setBoolPref("blue2",false);
    this.prefs.setBoolPref("noline2",false);
    this.prefs.clearUserPref("folderColor");
    this.applyFolderColor("red");
    this.prefs.setBoolPref("tabbar2",false);
    this.setThemeVariant("default");
  },

  //when you press a radio
  radioChange: function(value,which) {

    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch("extensions.noiawarmop.");

    var prefgen = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("");

    this.applyCSS(which,value);
    if (which == "menuicons" || which == "buttonicons") {
      if (value == true) {
        value = false;
      } else {
        value = true;
      }
    }

    this.prefs.setBoolPref(which,value);

    var xulRuntime = Components.classes["@mozilla.org/xre/app-info;1"]
      .getService(Components.interfaces.nsIXULRuntime);

    // Set attribute on #main-window for use by Noia Moon theme.
    this.application = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).
      getMostRecentWindow( "navigator:browser" ).document;
      this.mainWindow = this.application.getElementById("main-window");

    switch(xulRuntime.OS) {
      case "Darwin":
        this.mainWindow.setAttribute('nmdarwin',true);
        break;
      case "Linux":
        this.mainWindow.setAttribute('nmlinux',true);
        break;
      case "WINNT":
        this.mainWindow.setAttribute('nmwinnt',true);
        break;
      default:
        this.mainWindow.setAttribute('nmother',true);
        break;
    }

    if (prefs.getBoolPref("dark") == true) {
      this.mainWindow.setAttribute('nmblack',true);
    } else {
      this.mainWindow.setAttribute('nmblack',false);
    }
    if (prefs.getBoolPref("strip") == true) {
      this.mainWindow.setAttribute('nmstrip',true);
    } else {
      this.mainWindow.setAttribute('nmstrip',false);
    }
    if (prefs.getBoolPref("solid") == true) {
      this.mainWindow.setAttribute('nmsolid',true);
    } else {
      this.mainWindow.setAttribute('nmsolid',false);
    }
    if (prefs.getBoolPref("noline") == true) {
      this.mainWindow.setAttribute('nmnoline',true);
    } else {
      this.mainWindow.setAttribute('nmnoline',false);
    }
    if (prefs.getBoolPref("tabbar") == true) {
      this.mainWindow.setAttribute('nmtabbar',true);
    } else {
      this.mainWindow.setAttribute('nmtabbar',false);
    }
    if (prefs.getBoolPref("tabbottom") == true) {
      this.mainWindow.setAttribute('nmbottom',true);
    } else {
      this.mainWindow.setAttribute('nmbottom',false);
    }
    if (prefs.getBoolPref("blue") == true) {
      this.mainWindow.setAttribute('nmblue',true);
    } else {
      this.mainWindow.setAttribute('nmblue',false);
    }
    if (prefs.getBoolPref("light") == true) {
      this.mainWindow.setAttribute('nmlight',true);
    } else {
      this.mainWindow.setAttribute('nmlight',false);
    }
    if (prefs.getBoolPref("rdtab") == true) {
      this.mainWindow.setAttribute('nmrdtab',true);
    } else {
      this.mainWindow.setAttribute('nmrdtab',false);
    }
    if (prefs.getBoolPref("normal") == true) {
      this.mainWindow.setAttribute('nmnormal',true);
    } else {
      this.mainWindow.setAttribute('nmnormal',false);
    }

    if(which == "tabbottom") {
      if (prefs.getBoolPref("tabbottom") == true) {
        if (prefgen.getBoolPref("browser.tabs.onTop") == true) {
          this.prefs.setBoolPref("ontop",true);
        }
        if (prefgen.getBoolPref("browser.tabs.onTop") == false) {
          this.prefs.setBoolPref("ontop",false);
        }
      }
      prefgen.setBoolPref("browser.tabs.onTop",false);
    }

    if(which == "ontop") {
      if (prefs.getBoolPref("ontop") == true) {
        this.prefs.setBoolPref("tabbottom",false);
        this.applyCSS("tabbottom",false);
      }
    }

    if(which == "tabbottom") {
      if (prefs.getBoolPref("tabbottom") == false) {
        if (prefs.getBoolPref("ontop") == false) {
          prefgen.setBoolPref("browser.tabs.onTop",false);
        }
        if (prefs.getBoolPref("ontop") == true) {
          prefgen.setBoolPref("browser.tabs.onTop",true);
        }
      }
    }

    // a3: old Noia Moon auto-fallback-to-grey was removed deliberately.
    // Default now means exactly zero optional color overrides.

    if(which == "dark") {
      if (prefs.getBoolPref("dark") == true) {
        this.prefs.setBoolPref("dark2",true);
        this.applyCSS("dark2",true);
        if (prefs.getBoolPref("scrollbars") == true) {
          this.applyCSS("scrollbars",true);
        }
        this.prefs.setBoolPref("tabbar",false);
        this.applyCSS("tabbar",false);
        this.prefs.setBoolPref("tabbar2",false);
        this.applyCSS("tabbar2",false);
        this.prefs.setBoolPref("noline",false);
        this.applyCSS("noline",false);
        this.prefs.setBoolPref("grey2",false);
        this.applyCSS("grey2",false);
        this.prefs.setBoolPref("grey",false);
        this.applyCSS("grey",false);
        this.prefs.setBoolPref("darker",false);
        this.applyCSS("darker",false);
        this.prefs.setBoolPref("darker2",false);
        this.applyCSS("darker2",false);
        this.prefs.setBoolPref("light",false);
        this.applyCSS("light",false);
        this.prefs.setBoolPref("blue",false);
        this.applyCSS("blue",false);
        this.mainWindow.setAttribute("nmblue",false);
        this.mainWindow.setAttribute("nmlight",false);
      }
    }

    if(which == "grey") {
      if (prefs.getBoolPref("grey") == true) {
        this.prefs.setBoolPref("dark",false);
        this.applyCSS("dark",false);
        this.prefs.setBoolPref("dark2",false);
        this.applyCSS("dark2",false);
        this.prefs.setBoolPref("blue",false);
        this.applyCSS("blue",false);
        this.prefs.setBoolPref("light",false);
        this.applyCSS("light",false);
        this.prefs.setBoolPref("solid",true);
        this.applyCSS("solid",true);
        this.mainWindow.setAttribute("nmblue",false);
        this.mainWindow.setAttribute("nmblack",false);
        this.mainWindow.setAttribute("nmlight",false);
      }
    }

    if(which == "grey") {
      if (prefs.getBoolPref("grey") == true) {
        if (prefs.getBoolPref("noline") == false) {
          this.prefs.setBoolPref("tabbar",true);
          this.applyCSS("tabbar",true);
        }
      }
    }

    if(which == "grey") {
      if (prefs.getBoolPref("grey") == true) {
        if (prefs.getBoolPref("noline") == true) {
          this.prefs.setBoolPref("tabbar2",true);
          this.applyCSS("tabbar2",true);
          this.prefs.setBoolPref("tabbar",true);
          this.applyCSS("tabbar",false);
        }
      }
    }

    if(which == "blue") {
      if (prefs.getBoolPref("blue") == true) {
        this.prefs.setBoolPref("dark",false);
        this.applyCSS("dark",false);
        this.prefs.setBoolPref("dark2",false);
        this.applyCSS("dark2",false);
        this.prefs.setBoolPref("grey",false);
        this.applyCSS("grey",false);
        this.prefs.setBoolPref("tabbar",false);
        this.applyCSS("tabbar",false);
        this.prefs.setBoolPref("tabbar2",false);
        this.applyCSS("tabbar2",false);
        this.prefs.setBoolPref("grey2",false);
        this.applyCSS("grey2",false);
        this.prefs.setBoolPref("darker",false);
        this.applyCSS("darker",false);
        this.prefs.setBoolPref("darker2",false);
        this.applyCSS("darker2",false);
        this.prefs.setBoolPref("light",false);
        this.applyCSS("light",false);
        this.mainWindow.setAttribute("nmblack",false);
        this.mainWindow.setAttribute("nmlight",false);
      }
    }

    if(which == "grey2") {
      if (prefs.getBoolPref("grey2") == true) {
        if (prefs.getBoolPref("dark") == true) {
          this.prefs.setBoolPref("grey2",false);
          this.applyCSS("grey2",false);
        }
      }
    }

    if(which == "darker") {
      if (prefs.getBoolPref("darker") == true) {
        this.prefs.setBoolPref("darker2",false);
        this.applyCSS("darker2",false);
        if (prefs.getBoolPref("dark") == true) {
          this.prefs.setBoolPref("darker",false);
          this.applyCSS("darker",false);
        }
      }
    }

    if(which == "darker2") {
      if (prefs.getBoolPref("darker2") == true) {
        this.prefs.setBoolPref("darker",false);
        this.applyCSS("darker",false);
        if (prefs.getBoolPref("dark") == true) {
          this.prefs.setBoolPref("darker2",false);
          this.applyCSS("darker2",false);
        }
      }
    }

    if(which == "light") {
      if (prefs.getBoolPref("light") == true) {
        this.prefs.setBoolPref("grey",false);
        this.applyCSS("grey",false);
        this.prefs.setBoolPref("grey2",false);
        this.applyCSS("grey2",false);
        this.prefs.setBoolPref("darker",false);
        this.applyCSS("darker",false);
        this.prefs.setBoolPref("darker2",false);
        this.applyCSS("darker2",false);
        this.prefs.setBoolPref("dark",false);
        this.applyCSS("dark",false);
        this.prefs.setBoolPref("dark2",false);
        this.applyCSS("dark2",false);
        this.prefs.setBoolPref("blue",false);
        this.applyCSS("blue",false);
        this.mainWindow.setAttribute("nmblue",false);
        this.mainWindow.setAttribute("nmblack",false);
        this.prefs.setBoolPref("tabbar",false);
        this.applyCSS("tabbar",false);
        this.prefs.setBoolPref("tabbar2",false);
        this.applyCSS("tabbar2",false);
      }
      if (prefs.getBoolPref("light") == false) {
        if (prefs.getBoolPref("noline") == true) {
          this.prefs.setBoolPref("tabbar2",true);
          this.applyCSS("tabbar2",true);
          this.prefs.setBoolPref("tabbar",true);
          this.applyCSS("tabbar",false);
        }
        if (prefs.getBoolPref("noline") == false) {
          this.prefs.setBoolPref("tabbar",true);
          this.applyCSS("tabbar",true);
        }
      }
    }

    if(which == "normal") {
      if (prefs.getBoolPref("normal") == true) {
        if (prefs.getBoolPref("grey2") == true) {
          this.prefs.setBoolPref("normal",false);
          this.applyCSS("normal",false);
        }
      }
    }

    if(which == "grey2") {
      if (prefs.getBoolPref("grey2") == true) {
        if (prefs.getBoolPref("normal") == true) {
          this.prefs.setBoolPref("grey2",false);
          this.applyCSS("grey2",false);
        }
      }
    }

    if(which == "semiroundedtab") {
      this.prefs.setBoolPref("rdtab",false);
      this.applyCSS("rdtab",false);
      this.prefs.setBoolPref("sqtab",false);
      this.applyCSS("sqtab",false);
    }

    if(which == "rdtab") {
      this.prefs.setBoolPref("semiroundedtab",false);
      this.applyCSS("semiroundedtab",false);
      this.prefs.setBoolPref("sqtab",false);
      this.applyCSS("sqtab",false);
    }

    if(which == "sqtab") {
      this.prefs.setBoolPref("semiroundedtab",false);
      this.applyCSS("semiroundedtab",false);
      this.prefs.setBoolPref("rdtab",false);
      this.applyCSS("rdtab",false);
    }

    if(which == "hide") {
      this.prefs.setBoolPref("tabbottom",false);
      this.applyCSS("tabbottom",false);
    }

    if(which == "tabbottom") {
      this.prefs.setBoolPref("hide",false);
      this.applyCSS("hide",false);
    }

    if(which == "tabbar") {
      if (prefs.getBoolPref("tabbar") == true) {
        if (prefs.getBoolPref("blue") == true) {
          this.prefs.setBoolPref("tabbar",false);
          this.applyCSS("tabbar",false);
        }
        if (prefs.getBoolPref("light") == true) {
          this.prefs.setBoolPref("tabbar",false);
          this.applyCSS("tabbar",false);
        }
        if (prefs.getBoolPref("noline") == true) {
          if (prefs.getBoolPref("dark") == true) {
            this.prefs.setBoolPref("tabbar",false);
            this.applyCSS("tabbar",false);
            this.prefs.setBoolPref("tabbar2",false);
            this.applyCSS("tabbar2",false);
          }
        }
        if (prefs.getBoolPref("noline") == false) {
          if (prefs.getBoolPref("dark") == true) {
            this.prefs.setBoolPref("tabbar",false);
            this.applyCSS("tabbar",false);
            this.prefs.setBoolPref("tabbar2",false);
            this.applyCSS("tabbar2",false);
          }
        }
      }
      if (prefs.getBoolPref("tabbar") == false) {
        this.prefs.setBoolPref("tabbar",false);
        this.applyCSS("tabbar",false);
        this.prefs.setBoolPref("tabbar2",false);
        this.applyCSS("tabbar2",false);
      }
    }

    if(which == "grey2") {
      if (prefs.getBoolPref("grey2") == true) {
        if (prefs.getBoolPref("blue") == true) {
          this.prefs.setBoolPref("grey2",false);
          this.applyCSS("grey2",false);
        }
        if (prefs.getBoolPref("light") == true) {
          this.prefs.setBoolPref("grey2",false);
          this.applyCSS("grey2",false);
        }
      }
    }

    if(which == "darker") {
      if (prefs.getBoolPref("darker") == true) {
        if (prefs.getBoolPref("blue") == true) {
          this.prefs.setBoolPref("darker",false);
          this.applyCSS("darker",false);
        }
        if (prefs.getBoolPref("light") == true) {
          this.prefs.setBoolPref("darker",false);
          this.applyCSS("darker",false);
        }
      }
    }

    if(which == "darker2") {
      if (prefs.getBoolPref("darker2") == true) {
        if (prefs.getBoolPref("blue") == true) {
          this.prefs.setBoolPref("darker2",false);
          this.applyCSS("darker2",false);
        }
        if (prefs.getBoolPref("light") == true) {
          this.prefs.setBoolPref("darker2",false);
          this.applyCSS("darker2",false);
        }
      }
    }

    if(which == "noline") {
      if (prefs.getBoolPref("noline") == true) {
        if (prefs.getBoolPref("tabbar") == true) {
          this.prefs.setBoolPref("tabbar2",false);
          this.applyCSS("tabbar2",false);
          this.prefs.setBoolPref("tabbar",true);
          this.applyCSS("tabbar",true);
        }
        if (prefs.getBoolPref("tabbar") == false) {
          this.prefs.setBoolPref("tabbar2",false);
          this.applyCSS("tabbar2",false);
          this.prefs.setBoolPref("tabbar",false);
          this.applyCSS("tabbar",false);
        }
      }
      if (prefs.getBoolPref("noline") == false) {
        if (prefs.getBoolPref("tabbar") == false) {
          this.prefs.setBoolPref("tabbar2",false);
          this.applyCSS("tabbar2",false);
          this.prefs.setBoolPref("tabbar",false);
          this.applyCSS("tabbar",false);
        }
      }
    }

    if (prefs.getBoolPref("noline") == false) {
      if (prefs.getBoolPref("tabbar") == true) {
        if (prefs.getBoolPref("dark") == false) {
          this.prefs.setBoolPref("tabbar2",true);
          this.applyCSS("tabbar2",true);
          this.applyCSS("tabbar",false);
        }
      }
    }

    if (prefs.getBoolPref("dark") == true) {
      if (prefs.getBoolPref("solid") == true) {
        this.applyCSS("solid",false);
        this.applyCSS("solid2",true);
      }
    }

    if (prefs.getBoolPref("dark") == true) {
      if (prefs.getBoolPref("solid") == false) {
        this.applyCSS("solid",false);
        this.applyCSS("solid2",false);
      }
    }

    if (prefs.getBoolPref("dark") == false) {
      if (prefs.getBoolPref("solid") == true) {
        this.applyCSS("solid",true);
        this.applyCSS("solid2",false);
      }
    }

    if (prefs.getBoolPref("dark") == false) {
      if (prefs.getBoolPref("noline") == true) {
        this.prefs.setBoolPref("noline2",true);
        this.applyCSS("noline2",true);
      }
    }

    if (prefs.getBoolPref("noline") == false) {
      this.prefs.setBoolPref("noline2",false);
      this.applyCSS("noline2",false);
    }

    if(which == "red") {
      if (prefs.getBoolPref("red") == true) {
        this.prefs.setBoolPref("red2",false);
        this.applyCSS("red2",false);
      }
    }

    if(which == "red2") {
      if (prefs.getBoolPref("red2") == true) {
        this.prefs.setBoolPref("red",false);
        this.applyCSS("red",false);
      }
    }

    if(which == "navbuttons") {
      if (prefs.getBoolPref("navbuttons") == true) {
        this.prefs.setBoolPref("forward",false);
        this.applyCSS("forward",false);
      }
    }

    if(which == "forward") {
      if (prefs.getBoolPref("forward") == true) {
        this.prefs.setBoolPref("navbuttons",false);
        this.applyCSS("navbuttons",false);
      }
    }

    if(which == "bfdrop") {
      if (prefs.getBoolPref("bfdrop") == true) {
        this.prefs.setBoolPref("bfdrop2",false);
        this.prefs.setBoolPref("bfdrop3",false);
        this.applyCSS("bfdrop2",false);
        this.applyCSS("bfdrop3",false);
      }
    }

    if(which == "bfdrop2") {
      if (prefs.getBoolPref("bfdrop2") == true) {
        this.prefs.setBoolPref("bfdrop",false);
        this.prefs.setBoolPref("bfdrop3",false);
        this.applyCSS("bfdrop",false);
        this.applyCSS("bfdrop3",false);
      }
    }

    if(which == "bfdrop3") {
      if (prefs.getBoolPref("bfdrop3") == true) {
        this.prefs.setBoolPref("bfdrop",false);
        this.prefs.setBoolPref("bfdrop2",false);
        this.applyCSS("bfdrop",false);
        this.applyCSS("bfdrop2",false);
      }
    }

    this.init();
  },

  applyCSS: function(which,enable) {

    function applyIt(file) {
      var uri = ios.newURI(c + file,null,null);
      if (enable == false) {
        if (sss.sheetRegistered(uri,sss.AGENT_SHEET)) {
          sss.unregisterSheet(uri,sss.AGENT_SHEET);
        }
      } else {
        if (!sss.sheetRegistered(uri,sss.AGENT_SHEET)) {
          sss.loadAndRegisterSheet(uri,sss.AGENT_SHEET);
        }
      }
    }
    var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService);
    var ios = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    var uri;
    var c = "chrome://noiawarmoptions/content/";

    if (which == "semiroundedtab") {
      applyIt("semi_rounded_tab.css");
    }
    if (which == "dark") {
      applyIt("dark.css");
    }
    if (which == "blue") {
      applyIt("blue.css");
    }
    if (which == "grey") {
      applyIt("grey.css");
    }
    if (which == "darker") {
      applyIt("darker.css");
    }
    if (which == "darker2") {
      applyIt("darker2.css");
    }
    if (which == "light") {
      applyIt("light.css");
    }
    if (which == "grey2") {
      applyIt("grey2.css");
    }
    if (which == "dark2") {
      applyIt("dark2.css");
    }
    if (which == "rdtab") {
      applyIt("rdtab.css");
    }
    if (which == "sqtab") {
      applyIt("sqtab.css");
    }
    if (which == "shadow") {
      applyIt("shadow.css");
    }
    if (which == "closebutton") {
      applyIt("closebutton.css");
    }
    if (which == "noline") {
      applyIt("noline.css");
    }
    if (which == "noline2") {
      applyIt("noline2.css");
    }
    if (which == "tabbar") {
      applyIt("tabbar.css");
    }
    if (which == "strip") {
      applyIt("strip.css");
    }
    if (which == "solid") {
      applyIt("solid.css");
    }
    if (which == "solid2") {
      applyIt("solid2.css");
    }
    if (which == "tabbar2") {
      applyIt("tabbar2.css");
    }
    if (which == "scrollbars") {
      applyIt("scrollbars.css");
    }
    if (which == "tabbottom") {
      applyIt("tabbottom.css");
    }
    if (which == "normal") {
      applyIt("normal.css");
    }
    if (which == "hide") {
      applyIt("hide.css");
    }
    if (which == "rdbutton") {
      applyIt("rdbutton.css");
    }
    if (which == "rdmenubutton") {
      applyIt("rdmenubutton.css");
    }
    if (which == "rdtabbox") {
      applyIt("rdtabbox.css");
    }
    if (which == "warm") {
      applyIt("warm.css");
    }
    if (which == "red") {
      applyIt("red.css");
    }
    if (which == "red2") {
      applyIt("red2.css");
    }
    if (which == "navbuttons") {
      applyIt("navbuttons.css");
    }
    if (which == "forward") {
      applyIt("forward.css");
    }
    if (which == "bfdrop") {
      applyIt("bfdrop.css");
    }
    if (which == "bfdrop2") {
      applyIt("bfdrop2.css");
    }
    if (which == "bfdrop3") {
      applyIt("bfdrop3.css");
    }
    if (which == "bookmark") {
      applyIt("bookmark.css");
    }
    if (which == "addon") {
      applyIt("addon.css");
    }
    if (which == "personalbutton") {
      applyIt("personalbutton.css");
    }
    if (which == "toolbarbutton") {
      applyIt("toolbarbutton.css");
    }
    if (which == "navbarbutton") {
      applyIt("navbar.css");
    }
    if (which == "fix") {
      applyIt("fix.css");
    }
  }
}


