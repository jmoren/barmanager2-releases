'use strict'

import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function sendStatusToWindow (ev, text) {
  mainWindow.webContents.send('message', { event: ev, message: text })
}

function formatSizeUnits (bytes) {
  if (bytes >= 1073741824) {
    bytes = `${(bytes / 1073741824).toFixed(2)} GB`
  } else if (bytes >= 1048576) {
    bytes = `${(bytes / 1048576).toFixed(2)} MB`
  } else if (bytes >= 1024) {
    bytes = `${(bytes / 1024).toFixed(2)} KB`
  } else if (bytes >= 1) {
    bytes = `${bytes} B`
  }

  return bytes
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('checking', 'Buscando actualizaciones')
})
autoUpdater.on('update-available', info => {
  sendStatusToWindow('available', 'Version disponible')
})
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('notAvailable', 'No hay una nueva version disponible')
})
autoUpdater.on('error', err => {
  sendStatusToWindow('error', 'Error in auto-updater. ' + err)
})
autoUpdater.on('update-downloaded', err => {
  sendStatusToWindow('done')
})

autoUpdater.on('download-progress', progressObj => {
  let percent = `${Math.floor(progressObj.percent)} %`
  let downloaded = formatSizeUnits(progressObj.transferred)
  let total = formatSizeUnits(progressObj.total)
  sendStatusToWindow('Bajando', `${percent} (${downloaded} / ${total})`)
})

function startListenerUpdater () {
  ipcMain.on('ready-to-messages', () => {
    if (process.env.NODE_ENV === 'development') {
      sendStatusToWindow('available', 'Buscando actualizaciones')
    } else {
      autoUpdater.checkForUpdates()
    }
  })
  ipcMain.on('install', () => {
    if (process.env.NODE_ENV === 'development') {
      sendStatusToWindow('available', 'No se puede actualizar en modo dev')
    } else {
      autoUpdater.quitAndInstall()
    }
  })
}

const menuTemplate = [
  {
    label: 'Info',
    submenu: [
      {
        label: 'Actualizaciones',
        click: () => {
          autoUpdater.checkForUpdates()
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Salir',
        role: 'quit'
      }
    ]
  },
  {
    label: 'Dev',
    submenu: [
      {
        label: 'DevTools',
        role: 'toggledevtools'
      }
    ]
  }
]

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  let menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
  mainWindow.setMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  startListenerUpdater()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
