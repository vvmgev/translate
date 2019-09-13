// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const { ipcRenderer } = require('electron');





window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('translate', (event, arg) => {
        console.log(arg) // prints "pong"
    })
})
