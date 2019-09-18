import { app, BrowserWindow, globalShortcut, Tray, Menu } from 'electron';
import path from 'path';
import { readText } from './services/Clipboard'
import * as types from './typings'

let mainWindow: types.BrowserWindow;
let tray: Tray = null;

const ready = (): void => {
  createWindow();
  registerListener();
  createTray();
};

const registerListener = (): void => {
  const hideShowShortcut = <types.Accelerator>'CommandOrControl+X+L';
  globalShortcut.register(hideShowShortcut, (): void => {
    mainWindow.webContents.send('translate', readText());
    showWindow();
  });

  const escapeShortcut = <types.Accelerator>'Escape';
  globalShortcut.register(escapeShortcut, (): void => {
    if(mainWindow.isVisible()) mainWindow.hide();
  });

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    nodeIntegration: true,
    show: false,
    frame: false,
    resizable: false,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
    }
  });

  if(process.env.NODE_ENV === 'development') { mainWindow.webContents.openDevTools()}
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => mainWindow = null);
};


const createTray = (): void => {
    tray = new Tray(path.join(app.getAppPath(), 'assets/translate.png'));
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Quit',
        click() {
          app.quit();
        }
      }
    ]);
    tray.setContextMenu(contextMenu)
};

const showWindow = (): void => {
  mainWindow.show();
  mainWindow.focus();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ready);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
