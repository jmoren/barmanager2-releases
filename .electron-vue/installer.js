const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'build/')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'barmanager-app-win32-x64'),
    authors: 'Jairo de Morais & Jorge Moreno',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'electron-tutorial-app.exe',
    setupExe: 'ElectronTutorialAppInstaller.exe',
    setupIcon: path.join(rootPath, 'build', 'icons', 'bar.ico')
  })
}
