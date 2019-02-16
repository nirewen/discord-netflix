# discord-netflix [![Build Status](https://api.travis-ci.com/nirewen/discord-netflix.svg?branch=master)](https://travis-ci.com/nirewen/discord-netflix)

A Netflix wrapper that uses the [Discord RPC](https://github.com/discordapp/discord-rpc) (Rich Presence Client) to show what you're watching.

# Prebuilt installers
You can download a prebuilt installer from [releases](https://github.com/nirewen/discord-netflix/releases).

# Building yourself

## Preparing the environment
You will need:
- [Node.js](http://nodejs.org/en/download) (Version > 7.0.0)
- [Git](https://git-scm.com/downloads)

Make sure you add both to the `PATH`.

## Running
Make sure you are in the repo's folder. Then run these commands to install the dependencies and start the application.
```
npm install
npm start
```

## Build and distribution
This application includes various build scripts for distribution on Windows, macOS, and Linux. Upon running a build script, a NSIS installer will be generated along with the app being compiled in 32-bit natively or 64-bit if your machine/the environment the application is being ran on supports it.  
To build the application for distribution, run the build script that fits the environment where the application will be running.
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

# Contributing
If you have a suggestion, new feature or a fix, you can fork this repo and make those updates.  
Afterward, you may open a pull request here.

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/8761479?v=4" width="100px;"/><br /><sub><b>Eduardo Londero</b></sub>](https://github.com/nirewen "Nirewen#9011")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=nirewen "Code") [🎨](#design-nirewen "Design") | [<img src="https://avatars0.githubusercontent.com/u/22089269?v=4" width="100px;"/><br /><sub><b>Wist9063</b></sub>](https://hexaplexsoftware.ga/ "Wistful__#9063")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=Wist9063 "Code") [🎨](#design-Wist9063 "Design") | [<img src="https://avatars1.githubusercontent.com/u/27071605?v=4" width="100px;"/><br /><sub><b>Keegan</b></sub>](https://keyygan.me "Keyygan#0001")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=Keyygan "Code") | [<img src="https://avatars2.githubusercontent.com/u/13137236?v=4" width="100px;"/><br /><sub><b>Dominic Fitch-Jones</b></sub>](https://github.com/dmfj "Dmfj#0001")<br />[💡](# "Support") | [<img src="https://avatars0.githubusercontent.com/u/3434404?v=4" width="100px;"/><br /><sub><b>NovusTheory</b></sub>](https://modulobot.xyz "NovusTheory#2244")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=NovusTheory "Code") | [<img src="https://cdn.discordapp.com/avatars/177405097129672704/eb201db337fc6cfd343a8c90d979e8cd.png?size=1024" width="100px"><br /><sub><b>Maik</b></sub>](# "Maik#8097")<br />[📹](https://www.youtube.com/watch?v=8AYBykvOKzo "Video")[✅](# "Tutorial") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

# Errors
If Discord is not opened or the RPC client couldn't connect to Discord, an error will show in the app. It disappears in 15 seconds.  
Even if Discord is not opened, this app can still function normally as a Netflix wrapper.

# Things you should know
The app has support for most of the avatars available in Netflix and shows in the Rich Presence (see previews).

# Planned
Support for [Netflix Party](https://www.netflixparty.com/) so you and your friends can watch anything together with Rich Presence support.

# Previews

Idle:  
![Browsing](https://nirewen.s-ul.eu/i7XVpo6t.png)

Watching a Show:  
![Watching](https://img.hexaplexsoftware.ga/saved/VRBYhv2q.png) 

Watching a Movie:  
![Watching](https://img.hexaplexsoftware.ga/saved/r2vii1T7.png)


# Tutorials

`PT-BR`  
[![](https://i.ytimg.com/vi/8AYBykvOKzo/0.jpg)](https://www.youtube.com/watch?v=8AYBykvOKzo)<br>
Credits: Maicon Alves (Maik`#8097`)
