// Modules to control application life and create native browser window
const {app, BrowserWindow} = require("electron")
const path = require("path")
const url = require("url")

function createWindow () {
  // Create the browser window.
  let iconext;
  if (process.platform == "win32") iconext = "ico";
  if (process.platform == "linux") iconext = "png";
  if (process.platform == "darwin") iconext = "icns";
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `icon.${iconext}`,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL("https://krunker.io")
  mainWindow.setMenuBarVisibility(false)
  mainWindow.maximize()
  mainWindow.setFullScreen(true)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on("activate", function () {
    // On macOS it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

let app_vsync = true;

fs.readFile("config.json", "utf-8", (err, data) => {
  if (err) { console.warn("Couldn't find config.json file. Using default config"); return };

  data = JSON.parse(data);
});

if (app_vsync == true) {
  app.commandLine.appendSwitch("disable-frame-rate-limit")
	app.commandLine.appendSwitch('disable-gpu-vsync')
}