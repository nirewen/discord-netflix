const {BrowserWindow, app} = require('electron');
const {Client} 			   = require('discord-rpc');
const widevine             = require('electron-widevinecdm');
const moment               = require('moment');
const rpc                  = new Client({transport: 'ipc'});

widevine.load(app);

let appID = '387083698358714368',
    mainWindow,
    smallImageKey,
	smallImageText,
    start, end,
    WindowSettings = {
        backgroundColor: '#FFF',
        useContentSize: false,
        autoHideMenuBar: true,
        resizable: true,
        center: true,
        frame: true,
        alwaysOnTop: false,
        title: 'Netflix',
        icon: __dirname + '/icon.ico',
        webPreferences: {
            nodeIntegration: false,
            plugins: true,
        },
    },
    login = (tries = 0) => {
        if (tries > 10) return mainWindow.webContents.executeJavaScript(connectionNotice);
        tries += 1;
        rpc.login(appID).catch(e => setTimeout(() => login(tries), 10E3));
    },
    getInfos = `(function() {
        let [type, id] = window.location.pathname.split('/').slice(1, 3);
        if (type == 'browse' && type != 'watch') {
            return {
                name  : 'Browsing',
                title : 'In the Catalogs',
                avatar: document.querySelector('img.profile-icon') && document.querySelector('img.profile-icon').getAttribute('src').split('/').pop().split('.')[0].toLowerCase(),
            }
        }
        if (type == 'watch' && document.querySelector(".ellipsize-text")) {
            let name = document.querySelector('.ellipsize-text'),
                span = document.querySelector('.ellipsize-text').querySelectorAll('span'),
                video = document.getElementById(id).getElementsByTagName('video')[0];
            return {
                name             : name.querySelector('h4') ? name.querySelector('h4').innerHTML : name.innerHTML,
                title            : span.length ? span[1].innerHTML : undefined,
                episode          : span.length ? span[0].innerHTML : undefined,
                videoDuration    : video.duration,
                videoCurrentTime : video.currentTime,
                videoPaused      : video.paused,
            }
        }
    })()`,
    connectionNotice = `let notice = document.createElement('div'),
        close_btn = document.createElement('span');
        notice.className = 'error-notice';
        notice.setAttribute('style', 'position: fixed; top: 0px; background: #ef5858; border-bottom: 3px solid #e61616; border-radius: 3px; z-index: 101; color: white; width: 99%; line-height: 2em; text-align: center; margin: 0.5%;');
        close_btn.className = 'close-btn';
        close_btn.innerHTML = '&times;';
        close_btn.setAttribute('style', 'float: right; margin-right: 0.5%; font-size: 20px;');
        notice.innerHTML = 'Failed to connect to Discord IRC. Connection timed out.';
        notice.appendChild(close_btn);
        document.body.appendChild(notice);
        notice.onclick = () => document.body.removeChild(notice);
        setTimeout(() => document.body.removeChild(notice), 15E3);`;
 
async function checkNetflix() {
    if (!rpc || !mainWindow) return;
    
    let infos = await mainWindow.webContents.executeJavaScript(getInfos);
    
    if (infos) { // if !infos don't change presence then.
        let {name, title, episode, avatar, videoDuration, videoCurrentTime, videoPaused} = infos,
            video = episode && title
                ? `${episode} - ${title}` 
                : title,
            curr = parseInt(new Date().getTime().toString().slice(0, 10));
        let endTime = null;
         
        if (avatar) smallImageKey = avatar;

		smallImageText = "Idle"
        if (videoDuration && videoCurrentTime) {
            if (!videoPaused) {
                let now = moment.utc();
                let remaining = moment.duration(videoDuration - videoCurrentTime, 'seconds');
				
				smallImageText = "Playing";
                endTime = now.add(remaining).unix();
            } else if (videoPaused) { smallImageText = "Paused" }
        }
        
        rpc.setActivity({
            details: name,
            state: video,
            largeImageKey: 'netflix',
			largeImageText: 'Netflix',
            smallImageKey,
			smallImageText,
            instance: false,
            endTimestamp: endTime,
        });
    }
}

rpc.on('ready', () => {
    checkNetflix();
    setInterval(() => {
        checkNetflix();
    }, 15E3);
});

app.on('ready', () => {
    mainWindow = new BrowserWindow(WindowSettings);
    mainWindow.maximize();
    mainWindow.loadURL("https://www.netflix.com/");
    login();
});

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});
