const { app, clipboard, globalShortcut, ipcMain } = require('electron');
const fetch = require('node-fetch');

const URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&hl=en-US&dt=t&dt=bd&dj=1&source=icon&tk=1407.1407&q=';

let data = 'aaa';

const qq = async () => {
    globalShortcut.register('CommandOrControl+X+L', async () => {
        console.log('CommandOrControl+X+L')
        const text = clipboard.readText('selection');
        data = await getTranslation(text);
        console.log(data);

      })
};

app.on('ready', () => {
    console.log('ready');
    qq();
});

ipcMain.on('translate', (event, arg) => {
    console.log('onTranslate')
    console.log(arg)
    // event.returnValue = data;
    event.reply('translate', data)
});

const getTranslation = async (text) => {
    const url = `${URL}${text}`;
    return await fetch(url)
            .then(data => data.json())
            .catch(e => console.log(e))
};

export default win => {
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('ping', 'whoooooooh!')
    })
};
