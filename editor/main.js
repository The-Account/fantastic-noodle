const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu;
const dialog = electron.dialog;

const path = require('path')
const url = require('url')

const template = [
  {
    label: 'Datei',
    submenu: [
      {
        label: 'Datei öffnen...',
        click () {openFile()}
      },
      {label: 'Speichern'},
      {label: 'Speichern als...'}
    ]
  },
  {
    label: 'Bearbeiten',
    submenu: [
      {role: 'Rückgängig machen'},
      {role: 'Wiederhohlen'},
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Dev tools',
        click () { BrowserWindow.getFocusedWindow().webContents.openDevTools() }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

global.fileToOpen = '';

function openFile() {
  dialog.showOpenDialog({properties: ['openFile']}, filePaths => {
    if (filePaths == undefined) {
      return
    }
    let fileWindow = new BrowserWindow({width: 800, height: 600});

    global.fileToOpen = filePaths[0];

    fileWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'view.html'),
      protocol: 'file:',
      slashes: true
    }));

    fileWindow.on('closed', () => {
      fileWindow = null;
    })
    if(mainWindow != null) {
      mainWindow.close();
    }
  });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'blank.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
