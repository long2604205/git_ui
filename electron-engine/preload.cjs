// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-app'),
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  unmaximize: () => ipcRenderer.send('unmaximize'),
  toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
  onMaximize: (cb) => ipcRenderer.on('is-maximized', cb),
  onUnmaximize: (cb) => ipcRenderer.on('is-unmaximized', cb)
})
