/* Node.js mocks: structural startup regression checks, not a browser runtime. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const source=fs.readFileSync(path.resolve(__dirname,"../src/options/chrome/components/noiamoonop.js"),"utf8");
let passed=0;
function test(label,opt,run){
 const initial=Object.assign({},opt.prefValues||{}),values=Object.assign({},initial);
 const touched=[],loaded=[],removed=[],listeners=[],active=new Set(opt.activeSheets||[]);
 const css={AGENT_SHEET:0,sheetRegistered(u){return active.has(u);},loadAndRegisterSheet(u){assert(!active.has(u));active.add(u);loaded.push(u);},unregisterSheet(u){assert(active.has(u));active.delete(u);removed.push(u);}};
 const branches={"":{getCharPref(k){if(k==="general.skins.selectedSkin")return opt.skin||"noiawarmmoon";throw Error(k);}},
 "extensions.noiawarmop.":{getBoolPref(k){return !!values[k];},getCharPref(k){if(k in values)return values[k];throw Error(k);},prefHasUserValue(k){return Object.hasOwn(values,k);},clearUserPref(k){touched.push(k);delete values[k];}}};
 const svc={"@mozilla.org/preferences-service;1":{getBranch(k){assert(k in branches);return branches[k];}},
 "@mozilla.org/network/io-service;1":{newURI(u){return u;}},
 "@mozilla.org/content/style-sheet-service;1":css,
 "@mozilla.org/xre/app-info;1":{OS:opt.platform||"Linux"},
 "@mozilla.org/embedcomp/window-watcher;1":{registerNotification(l){listeners.push(l);},getWindowEnumerator(){let i=0;const a=opt.windows||[];return{hasMoreElements(){return i<a.length;},getNext(){return a[i++];}};}}};
 const context={Components:{utils:{import(){}},ID(s){return s;},interfaces:{nsIPrefService:{},nsIIOService:{},nsIStyleSheetService:{},nsIXULRuntime:{},nsIWindowWatcher:{},nsISupports:{},nsIObserver:{}},classes:Object.fromEntries(Object.entries(svc).map(([k,v])=>[k,{getService(){return v;}}]))},XPCOMUtils:{generateQI(){return()=>{};},generateNSGetFactory(){return()=>{};}}};
 vm.createContext(context);vm.runInContext(source,context);const startup=new context.NoiaWarmStartup();startup.observe(null,"profile-after-change",null);
 run({initial,values,touched,loaded,removed,listeners,startup});console.log("PASS",++passed,label);
}
const uri=f=>"chrome://noiawarmoptions/content/"+f;
function win(type="navigator:browser"){const attrs={};let onload=null;const root={setAttribute(k,v){attrs[k]=v;}};return{attrs,document:{documentElement:{getAttribute(k){return k==="windowtype"?type:"";}},getElementById(id){return id==="main-window"?root:null;}},addEventListener(t,cb){assert.equal(t,"load");onload=cb;},removeEventListener(t,cb){assert.equal(t,"load");assert.equal(cb,onload);onload=null;},triggerLoad(){assert(onload);onload({currentTarget:this});}};}
test("Inactive theme has no effects",{skin:"classic/1.0",prefValues:{grey:true,solid:true,themeVariant:"rose"}},r=>{assert.deepEqual(r.values,r.initial);assert.equal(r.loaded.length,0);assert.equal(r.touched.length,0);assert.equal(r.listeners.length,0);});
test("Default adds no optional CSS",{windows:[win()]},r=>{assert.deepEqual(r.loaded,[]);assert.equal(r.listeners.length,1);});
test("Palette/folder independent",{prefValues:{themeVariant:"rose",folderColor:"cyan"}},r=>assert.deepEqual(r.loaded,[uri("palettes/rose.css"),uri("folders/cyan.css")]));
test("Linux Black layer",{prefValues:{themeVariant:"black"}},r=>assert.deepEqual(r.loaded,[uri("palettes/black.css"),uri("palettes/black-linux.css")]));
test("Windows Black layer",{prefValues:{themeVariant:"black"},platform:"WINNT"},r=>assert.deepEqual(r.loaded,[uri("palettes/black.css"),uri("palettes/black-windows.css")]));
test("Reject traversal values",{prefValues:{themeVariant:"../evil",folderColor:"../../evil"}},r=>assert.deepEqual(r.loaded,[]));
test("Legacy CSS order",{prefValues:{noline:true,tabbar:true,solid:true,sqtab:true}},r=>assert.deepEqual(r.loaded,[uri("noline.css"),uri("noline2.css"),uri("tabbar.css"),uri("sqtab.css"),uri("solid.css")]));
test("Other tabbar branch",{prefValues:{tabbar:true,solid:true}},r=>assert.deepEqual(r.loaded,[uri("tabbar2.css"),uri("solid.css")]));
test("Retired keys cleared",{prefValues:{grey:true,solid:true,tabbar:true,tabbar2:true,warm:true,red:true,folderColor:"yellow",themeVariant:"bronze",bfdrop:true}},r=>{for(const k of["grey","solid","tabbar","tabbar2","warm","red"])assert(!Object.hasOwn(r.values,k));for(const k of["bfdrop","themeVariant","folderColor"])assert(Object.hasOwn(r.values,k));assert.deepEqual(r.loaded,[uri("palettes/bronze.css"),uri("folders/yellow.css"),uri("bfdrop.css")]);});
test("Retired sheets removed",{prefValues:{themeVariant:"rose"},activeSheets:[uri("grey.css"),uri("palettes/black.css"),uri("palettes/black-linux.css")]},r=>{assert.deepEqual(r.removed,[uri("grey.css"),uri("palettes/black.css"),uri("palettes/black-linux.css")]);assert.deepEqual(r.loaded,[uri("palettes/rose.css")]);});
test("New windows get opt-in attributes",{prefValues:{tabbottom:true,strip:true},windows:[win()]},r=>{let next=win();r.listeners[0].observe(next,"domwindowopened");next.triggerLoad();assert.equal(next.attrs.nmlinux,"true");assert.equal(next.attrs.nmbottom,"true");assert.equal(next.attrs.nmstrip,"true");assert.equal(next.attrs.nmblack,"false");});
test("Ignore non-browser windows",{prefValues:{strip:true},windows:[win("Browser:Preferences")]},r=>{let next=win("navigator:mail");r.listeners[0].observe(next,"domwindowopened");next.triggerLoad();assert.deepEqual(next.attrs,{});});
test("Idempotent observer",{prefValues:{folderColor:"yellow"}},r=>{r.startup.observe(null,"profile-after-change",null);assert.equal(r.listeners.length,1);assert.equal(r.loaded.length,1);});
assert(!/Stylish v1\.0\.8|userstyles\.org|GPL v3/i.test(source));
console.log("All",passed,"mock tests passed");
