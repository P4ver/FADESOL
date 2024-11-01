import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current filename
const __dirname = path.dirname(__filename); // Define __dirname based on the filename

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Path to your preload script
      contextIsolation: true, // Recommended for security
      enableRemoteModule: false, // Recommended for security
    },
  });

  // Load the index.html from the 'dist' folder in production
  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Optional: Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
