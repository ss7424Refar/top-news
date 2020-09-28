// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // zoomFactor: 0.75
            // devTools: false
        },

        alwaysOnTop: true,
        frame: false,
        resizable: false
    })

    mainWindow.removeMenu()

    // and load the index.html of the app.
    mainWindow.loadFile('./dist/index.html')
    // mainWindow.loadFile('index.html')
    const options = {extraHeaders: 'pragma: no-cache\n'}
    // mainWindow.loadURL('http://localhost:8080/', options);

    // Open the DevTools.
    mainWindow.webContents.openDevTools({mode: 'bottom'})

    mainWindow.on('resize', function () {
        console.log(JSON.stringify(mainWindow.getContentBounds()));
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

require('./server.js')

ipcMain.on('open-window', (event, arg) => {
    console.log(arg) // prints "ping"



})
