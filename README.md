# Krunker UCI Client
## Just a Krunker Client

### Features
- Custom CSS loader - Load custom css by pasting source in `main_custom.css` file in the same folder as client
- Scripts Loader - Scripts are stored in `scripts` folder in client dir

### How to Install
**Make sure you have installed**
- [Node](https://nodejs.org/en/download/) v10.19.0
- [npm](https://www.npmjs.com/) v6.14.4
- [Git](https://git-scm.com/downloads) 2.25.1

<br>

How to Install **Electron Packager**
```
npm install --save-dev electron-packager // LOCAL INSTALL
npm install -g --save-dev electron-packager // GLOABL INSTALL, NOT RECCOMENDED
```

1. Open Terminal and run this
```
git clone https://github.com/CuteBladeYT/Krunker-UCI-Client
cd Krunker-UCI-Client
npm i && npm install fs
echo "Current working directory is" && echo $PWD && echo "Copy it for later!"
```
#### OPTIONALLY
you can open `main.js` file with any text editor and change `icon.png` to `icon.ico` (Windows) or `icon.icns` (MacOS)
then if you copied the dir do
```
npx electron-packager "< paste it here between quotes >" "Krunker UCI" --platform=<linux / win32 / darwin> --arch=x64 --prune=true --out=build
```
in `--platform==` instead of `<linux / win32 / darwin>` use your OS:
- win32 - Windows
- linux - Linux
- darwin - MacOS

then
```
cd build/ <press TAB> && ./Krunker\ UCI <press TAB>
```
done!
