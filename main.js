require('dotenv').config();
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
process.env.ELECTRON_DISABLE_GPU = true;
const { app, BrowserWindow, Tray, Menu, ipcMain, screen } = require('electron');
const path = require('path');
const os = require('os');

let mainWindow;
let tray;

app.setPath('userData', path.join(os.tmpdir(), 'weather-app-electron'));

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const windowWidth = 500;
  const relativeYPosition = 0.2778;
  const y = Math.floor(height * relativeYPosition);

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: 760,
    x: width - windowWidth - 20,
    y: y,
    resizable: false,
    transparent: true,
    frame: false,
    titleBarStyle: 'hidden',
    skipTaskbar: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  app.commandLine.appendSwitch('disable-http-cache');
  app.commandLine.appendSwitch('disable-gpu-sandbox');
  app.commandLine.appendSwitch('disable-software-rasterizer');
  app.commandLine.appendSwitch('disable-background-timer-throttling');
  app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
  app.commandLine.appendSwitch('disable-renderer-backgrounding');
  app.commandLine.appendSwitch('disable-features', 'VizDisplayCompositor');

  mainWindow.loadFile('index.html');

  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('minimize-window', () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  tray = new Tray(path.join(__dirname, 'images', 'meteorology.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show Weather App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() },
  ]);

  tray.setToolTip('Weather App');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});