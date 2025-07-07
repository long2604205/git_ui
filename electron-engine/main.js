import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.once('ready-to-show', () => {
    win.maximize();
    win.show();
  });

  win.on('restore', () => {
    if (!win.isMaximized()) {
      win.setSize(1200, 800);
    }
  });

  win.loadFile(join(__dirname, '../dist/index.html'))
  // win.webContents.openDevTools()

  ipcMain.on('close-app', () => win.close())
  ipcMain.on('minimize', () => win.minimize())
  ipcMain.on('maximize', () => win.maximize())
  ipcMain.on('unmaximize', () => win.unmaximize())

  ipcMain.on('toggle-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  win.on('maximize', () => {
    win.webContents.send('is-maximized')
  })

  win.on('unmaximize', () => {
    win.webContents.send('is-unmaximized')
  })
}

app.whenReady().then(createWindow)
