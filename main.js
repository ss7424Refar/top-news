// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, shell, dialog} = require('electron')
const Store = require('electron-store');

const path = require('path')

let mainWindow = null;
let secondWindow = null;
const store = new Store();

require('./server.js')

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        // width: 300,
        // height: 330,
        // useContentSize: true,
        icon:'./icon.ico',
        webPreferences: {
            nodeIntegration:true,
            preload: path.join(__dirname, 'preload.js'),
            // zoomFactor: 0.75
            // devTools: true
        },

        alwaysOnTop: true,
        // frame: false,
        // resizable: false
    })
    if ('undefined' !== store.get('window-size')) {
        mainWindow.setBounds(store.get('window-size'))
    } else {
        mainWindow.setBounds({width: 350, height: 350 })
    }

    mainWindow.removeMenu()

    // and load the index.html of the app.
    // mainWindow.loadFile('./dist/index.html')
    mainWindow.loadFile('index.html')
    const options = {extraHeaders: 'pragma: no-cache\n'}
    // mainWindow.loadURL('http://localhost:8080/', options);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools({mode: 'bottom'})

    mainWindow.on('resize', function () {
        console.log('resize ' + JSON.stringify(store.get('window-size')));
        store.set('window-size', mainWindow.getContentBounds())
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('open-window', (event, arg) => {
    console.log(arg) // prints "ping"
    shell.openExternal(arg)
})
