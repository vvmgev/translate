const { clipboard } = require('electron');

export const readText = (type: string = 'selection'): string => {
    return clipboard.readText(type);
};

export const writeText = (text: string = '', type: string = 'selection'): string => {
    return clipboard.writeText(text, type);
};
