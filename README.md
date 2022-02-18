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
