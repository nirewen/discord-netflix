# discord-netflix
A Netflix wrapper that uses Discord RPC to show what you're watching using the new Rich Presence

# That's too much! I just want to use it!
You can download a prebuilt installer from [releases](https://github.com/nirewen/discord-netflix/releases) if you want.

# Building yourself

## Prepairing the environment
You will need [Node.js](http://nodejs.org/en/download) installed and added to the PATH, so just download the installer and make sure to select the box to add to PATH.

## Running
You have to install the dependencies. So, just run `npm install` in the repo's folder.
Once it's done, run `npm start` to start the application.

## Building
The app also have a build method, used for distribution. It will generate a NSIS installer for the app, and a packaged version of it.
To build the app for distribution, run `npm run dist`.

# Contributing
If you have a suggestion, an implementation, a fix, you can fork this repo and make all the changes you want.
Then, when you're finished, you can open a pull request here.

# Contributors
* [Nirewen#9011](http://github.com/nirewen)
* [Keyygan#0001](https://github.com/keyygan)
* [Dmfj#0001](https://github.com/dmfj)
* [Wistful__#9063](https://hexaplexsoftware.ga/wist/)

# Errors
If Discord is not opened, or, for some reason, the RPC Client couldn't connect to it, an error will show in the app. It disappears in 15 seconds.
Even if Discord is not opened, you can still use the app as a normal Netflix wrapper.

# Things you should know
The app has support for all the 33 avatars available in Netflix, and shows in the Rich Presence (see previews).

# Planned
Netflix Party support so you and your friends can watch anything together (and show in the Rich Presence, obviously)
Progress bar support, so it shows how much time is remaining in the Rich Presence.

# Previews
![Browsing](https://nirewen.s-ul.eu/i7XVpo6t.png)

![Watching](https://nirewen.s-ul.eu/1p7pev5D.png) 

# Tutorials

### PT-BR
[![](https://i.ytimg.com/vi/8AYBykvOKzo/0.jpg)](https://www.youtube.com/watch?v=8AYBykvOKzo)

Credits: Maicon Alves (Maik`#8097`)
