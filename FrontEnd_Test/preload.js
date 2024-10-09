// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose a method to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // You can define functions here to communicate with the main process
  sendMessage: (channel, data) => {
    // Restrict which channels can be used
    const validChannels = ['toMain', 'fromMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receiveMessage: (channel, func) => {
    const validChannels = ['toMain', 'fromMain'];
    if (validChannels.includes(channel)) {
      // Strip out `event` and just get the data
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
