import('node-fetch').then(async (module) => {
    const fetch = module.default;
    // Your code that uses fetch goes here
  });  
const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const client = new Client();

// Replace these values with your actual credentials and session ID
const PHONE_NUMBER = '94767707223';
const SESSION_ID = 'B6NWiZwL#zV7V1zi5ffTfrM628DN_sVmHyI0ZLfSJQlTZT_iJ8Jg';
const BOT_NAME = '🅼🆁 🆂🅴🅽🅰🅻';
const BOT_LOGO_URL = 'https://telegra.ph/file/f2be313fe820b56b47748.png';

app.get('/qrcode', async (req, res) => {
    const qrCode = await qrcode.toDataURL(SESSION_ID);
    res.send(`<img src="${qrCode}" alt="QR Code" />`);
});

client.on('message', async message => {
    if (message.body.toLowerCase().startsWith('.song')) {
        sendMessage(message.from, '🎧');
        await downloadSongDetails(message, message.from);
    } else if (message.body.toLowerCase().startsWith('.video')) {
        sendMessage(message.from, '🎬');
        await downloadVideoDetails(message, message.from);
    } else if (message.body.toLowerCase().startsWith('.apk')) {
        sendMessage(message.from, '💾');
        await downloadApkDetails(message, message.from);
    } else if (message.body.toLowerCase().startsWith('.menu')) {
        sendMenuMessage(message.from);
    } else if (message.body.toLowerCase() === '.alive') {
        sendAliveMessage(message.from);
        reactWithEmoji(message.from, '♿');
    } else if (message.body.toLowerCase().startsWith('.sticker')) {
        sendStickerMessage(message.from);
        reactWithEmoji(message.from, '🖼️');
    }
});

async function downloadSongDetails(message, sender) {
    const songName = message.body.split(' ')[1];
    // Use YouTube API to search for the song and get details
    // Send details back to the user
    sendMessage(sender, `Downloading details for song: ${songName}...`);

    // Ask for confirmation
    sendMessage(sender, 'ඔයාට ඕනිද මේක ඩවුන්ලෝඩ් කරන්න 😇🧐  yes or no');
}

async function downloadVideoDetails(message, sender) {
    const videoName = message.body.split(' ')[1];
    // Use YouTube API to search for the video and get details
    // Send details back to the user
    sendMessage(sender, `Downloading details for video: ${videoName}...`);

    // Ask for confirmation
    sendMessage(sender, 'ඔයාට ඕනිද මේක ඩවුන්ලෝඩ් කරන්න 😇🧐  yes or no');
}

async function downloadApkDetails(message, sender) {
    const appName = message.body.split(' ')[1];
    // Use Play Store API to search for the app and get details
    // Send details back to the user
    sendMessage(sender, `Downloading details for app: ${appName}...`);

    // Ask for confirmation
    sendMessage(sender, 'ඔයාට ඕනිද මේක ඩවුන්ලෝඩ් කරන්න 😇🧐  yes or no');
}

function sendMenuMessage(sender) {
    const message = (
        '▂▃▅▇█▓▒░ THIS IS MENU FOR Mr SENAL ░▒▓█▇▅▃▂\n\n' +
        '01 Song Downloader ➡️ .song\n' +
        '02 Video Downloader ➡️ .video\n' +
        '03 App Downloader ➡️ .apk\n' +
        '04 Sticker Downloader ➡️ .sticker\n' +
        '05 Bot Check ➡️ .alive\n\n' +
        'Bot Logo: ' + BOT_LOGO_URL + '\n\n' +
        'ɢᴇɴᴇʀᴀᴛᴇ ʙʏ ᴍʀ ꜱᴇɴᴀʟ'
    );
    sendMessage(sender, message);
}

function sendAliveMessage(sender) {
    sendMessage(sender, 'Mr Senal is alive and working! 🟢');
}

function sendStickerMessage(sender) {
    sendMessage(sender, 'Wait for your download ⬇️');
}

function reactWithEmoji(receiver, emoji) {
    client.sendMessage(receiver, { body: emoji, mentionedJidList: [receiver] });
}

function sendMessage(receiver, message) {
    client.sendMessage(receiver, message);
}

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
