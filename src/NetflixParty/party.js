const { ipcMain } = require('electron')

module.exports = class NetflixParty {
    constructor () {
        this.sessionData = {
            id: null,
            partyCount: 0
        }
        this.user = null
    }

    setUserDetails (user) {
        this.user = user
    }

    ipcSetup (mainWindow) {
        ipcMain.on('np', (_sender, data) => {
            // This is just loopback so the renderer can request a specific action be called
            if (data.type === 'loopbackCall') {
                mainWindow.webContents.send('np', {
                    type: data.call,
                    data: data.data
                })
            }

            if (data.type === 'getDiscordUser') {
                if (this.user !== null) {
                    mainWindow.webContents.send('np', {
                        type: 'discordUser',
                        data: this.user
                    })
                }
            }

            if (data.type === 'sessionUpdate') {
                this.sessionData.partyCount = data.partyCount
            }

            // This is a response for an action taken (like a promise return but only async)
            if (data.type === 'response') {
                if (data.response === 'createSession') {
                    this.sessionData.id = data.sessionId
                } else if (data.response === 'leaveSession') {
                    this.sessionData.id = null
                }
            }
        })
    }
}
