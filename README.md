# Krunker UCI Client
## Just a Krunker Client

### Q: Why?
**A:** Since it's the first version there are only a few options, but I'm planning to add much more! In plans there are Custom Scripts and Custom CSS loaders. You can see the **progress** [here](https://github.com/CuteBladeYT/Krunker-UCI-Client/projects/2).

### How to Install
**Make sure you have installed**
- [Node](https://nodejs.org/en/download/) v10.19.0
- [npm](https://www.npmjs.com/) v6.14.4
- [Git](https://git-scm.com/downloads) 2.25.1

<br>

1. Open Terminal / CMD
2. Run 
```
git clone https://github.com/electron/electron-quick-start
cd electron-quick-start
npm install
npm start
```
3. Install **Electron Packager**
```
npm install --save-dev electron-packager // LOCAL INSTALL
npm install -g --save-dev electron-packager // GLOABL INSTALL, NOT RECCOMENDED
```

#### Linux
1. Open Terminal
2. Run `git clone https://github.com/CuteBladeYT/Krunker-UCI-Client`
3. Copy all the files to *Electron Quick Start* directory
4. Press F4 if you're using Dolphin. If not, open Terminal
5. Type `echo $PWD` and copy the output
6. Run `npx electron-packager 'app_directory' 'UCI Krunker' --overwrite --platform=linux --arch=x64 --prune=true --out=build`. **IMPORTANT TO REPLACE `app_directory` WITH OUTPUT FROM POINT 5.**
7. Go to `build` folder
8. Open the only folder inside
9. Open `UCI Krunker` file
10. Done!

#### Windows
1. Open CMD
2. Run `git clone https://github.com/CuteBladeYT/Krunker-UCI-Client`
3. Copy all the files to *Electron Quick Start* directory
4. In CMD type `echo %cd%` and copy the output
5. Run `npx electron-packager 'app_directory' 'UCI Krunker' --overwrite --platform=win32 --arch=x64 --prune=true --out=build`. **IMPORTANT TO REPLACE `app_directory` WITH OUTPUT FROM POINT 4.**
6. Go to `build` folder
7. Open the only folder inside
8. Open `UCI Krunker.exe` file
9. Done!

#### MacOS
**Soon™**
