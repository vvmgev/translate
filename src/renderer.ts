// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const url: string = 'https://translate.google.com/#view=home&op=translate&sl=en&tl=ru&text=';
    const webview: Element = document.querySelector('#webview');
    const doLayout = () => {
        webview.src = url;
        const windowWidth: number = document.documentElement.clientWidth;
        const windowHeight: number = document.documentElement.clientHeight;
        webview.style.width = windowWidth - 10 + 'px';
        webview.style.height = windowHeight + 'px';
    };
    window.onresize = doLayout;
    window.onload = doLayout;

    ipcRenderer.on('translate', (event, word) => {
        webview.executeJavaScript(`document.querySelector('#source').value = '${word}'`).then(() => {
            console.log('success');
        }).catch(e => {
            console.log('fail');
        });
    });
});
