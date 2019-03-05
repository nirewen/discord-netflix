# discord-netflix [![Build Status](https://api.travis-ci.com/nirewen/discord-netflix.svg?branch=master)](https://travis-ci.com/nirewen/discord-netflix)

A Netflix wrapper that uses Discord RPC to show what you're watching using the new Rich Presence

# Prebuilt installers
You can download a prebuilt installer from [releases](https://github.com/nirewen/discord-netflix/releases) if you want.

# Building yourself

## Prepairing the environment
You will need: <br>
- [Node.js](http://nodejs.org/en/download) (Version > 7.0.0)<br>
- [Git](https://git-scm.com/downloads)

Make sure you add both to the PATH.

## Running
You have to install the dependencies. So, just run `npm install` in the repo's folder.<br>
Once it's done, run `npm start` to start the application.

## Build and distribution
The app also have a build method, used for distribution. It will generate a NSIS installer for the app, and a packaged version of it. You can build different packages for different operating softwares. <br>

**Windows:**
`npm run dist:win`

**Mac:**
`npm run dist:mac`

**Linux:**
`npm run dist:linux`

# Contributing
If you have a suggestion, an implementation, a fix, you can fork this repo and make all the changes you want.<br>
Then, when you're finished, you can open a pull request here.

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/8761479?v=4" width="100px;"/><br /><sub><b>Eduardo Londero</b></sub>](https://github.com/nirewen "Nirewen#9011")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=nirewen "Code") [🎨](#design-nirewen "Design") | [<img src="https://avatars0.githubusercontent.com/u/22089269?v=4" width="100px;"/><br /><sub><b>Wist9063</b></sub>](https://hexaplexsoftware.ga/ "Wistful__#9063")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=Wist9063 "Code") [🎨](#design-Wist9063 "Design") | [<img src="https://avatars1.githubusercontent.com/u/27071605?v=4" width="100px;"/><br /><sub><b>Keegan</b></sub>](https://keyygan.me "Keyygan#0001")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=Keyygan "Code") | [<img src="https://avatars2.githubusercontent.com/u/13137236?v=4" width="100px;"/><br /><sub><b>Dominic Fitch-Jones</b></sub>](https://github.com/dmfj "Dmfj#0001")<br />[💡](# "Support") | [<img src="https://avatars0.githubusercontent.com/u/3434404?v=4" width="100px;"/><br /><sub><b>NovusTheory</b></sub>](https://modulobot.xyz "NovusTheory#2244")<br />[💻](https://github.com/nirewen/discord-netflix/commits?author=NovusTheory "Code") | [<img src="https://cdn.discordapp.com/avatars/177405097129672704/eb201db337fc6cfd343a8c90d979e8cd.png?size=1024" width="100px"><br /><sub><b>Maik</b></sub>](# "Maik#8097")<br />[📹](https://www.youtube.com/watch?v=8AYBykvOKzo "Video")[✅](# "Tutorial") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

# Errors
If Discord is not opened, or, for some reason, the RPC Client couldn't connect to it, an error will show in the app. It disappears in 15 seconds.<br>
Even if Discord is not opened, you can still use the app as a normal Netflix wrapper.

# Things you should know
The app has support for most of the avatars available in Netflix, and shows in the Rich Presence (see previews).

# Previews

Idle: <br>
![Browsing](https://nirewen.s-ul.eu/i7XVpo6t.png)


Watching a Show: <br> 
![Watching](https://img.hexaplexsoftware.ga/saved/VRBYhv2q.png) 

Watching a Movie: <br>
![Watching](https://img.hexaplexsoftware.ga/saved/r2vii1T7.png)

# Tutorials

`PT-BR`<br>
[![](https://i.ytimg.com/vi/8AYBykvOKzo/0.jpg)](https://www.youtube.com/watch?v=8AYBykvOKzo)<br>
Credits: Maicon Alves (Maik`#8097`)
