const TabGroup = require("electron-tabs");

let tabGroup = new TabGroup();

let tab = tabGroup.addTab({
    title: "Test",
    src: "./view.html",
    visible: true
});