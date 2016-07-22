const electron = require('electron')

const Menu = electron.Menu

const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 640 + 16, // 16 to disable the scroll bar
    height: 960,
    resizable: false,
    icon: __dirname + '/icon.png',
    webPreferences: {
      overlayScrollbars: false
    }
  })

  // show menu bar
  mainWindow.setMenuBarVisibility(true)
  mainWindow.setAutoHideMenuBar(false)


  const template = [
    {
      label: 'Open',
      submenu: [
        {
          label: 'Catch Desktop (中国)',
          click() {
            mainWindow.loadURL(`https://app.catch.cc`)
            mainWindow.setTitle('Catch Desktop')
          }
        },
        {
          label: 'Catch Desktop (海外)',
          click() {
            mainWindow.loadURL(`https://app.catchcdn.com`)
            mainWindow.setTitle('Catch Desktop (海外)')
          }
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'About Catch',
          click() { require('electron').shell.openExternal('https://catch.cc/'); }
        },
      ]
    },
  ];

  mainWindow.setMenu(Menu.buildFromTemplate(template))

  // devtools
  // mainWindow.webContents.openDevTools({mode: 'detach'})

  // load app
  mainWindow.loadURL(`https://app.catch.cc`)
  mainWindow.setTitle('Catch Desktop')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('page-title-updated', (e) => e.preventDefault())
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