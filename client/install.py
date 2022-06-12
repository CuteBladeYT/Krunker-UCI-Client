#!/bin/python3
# if on Linux
import os, platform, subprocess, shutil

currPlatform = ""
currArch = ""

def main():
    # +--------------+
    # | PRE CHECKING |
    # +--------------+

    npmVersion = subprocess.run(["npm", "v"], capture_output=True).stdout

    # +------+
    # | MAIN |
    # +------+
    print("Choose Operating System:\n1. Windows\n2. Linux\n3. MacOS\n")
    try: currPlatform = str(input("> "))
    except: pass

    print("\nChoose Arch:\n1. x64 (64 bit)\n2. x86 (32 bit)\n")
    try: currArch = str(input("> "))
    except: pass

    currPlatform = int(currPlatform)
    currArch = int(currArch)

    if currPlatform == 1:
        currPlatform = "win32"
    elif currPlatform == 2:
        currPlatform = "linux"
    else:
        urrPlatform = "darwin"
    
    if currArch == 2:
        currArch = "x86"
    else:
        currArch = "x64"
    
    print(f"\nBuilding Krunker UCI for platform: {currPlatform} {currArch}")
    input("Press enter to continue...")

    # if currPlatform == "win32": os.system("cls")
    # else: os.system("clear")


    # +------------+
    # | INSTALLING |
    # +------------+

    cwd = os.getcwd()

    modulesFound = False

    for i in range(len(os.listdir(cwd))):
        f = os.listdir(cwd)[i]
        if f == "node_modules":
            modulesFound = True

    print("\n\n")

    if modulesFound == False:
        print("$ npm i")
        os.system("npm i")
    
    buildCmd = f"npx electron-packager '{cwd}' 'Krunker UCI' --arch={currArch} --platform={currPlatform} --prune=true --overwrite=true --out=build"

    print(f"$ {buildCmd}")
    os.system(buildCmd)




    builtPath = f"./build/Krunker UCI-{currPlatform}-{currArch}"

    scriptsArr = []
    stylesArr = []
    for i in os.listdir(cwd):
        if i == "scripts":
            for f in os.listdir(f"{cwd}/scripts"):
                scriptsArr.append(f)
        elif i == "styles":
            for f in os.listdir(f"{cwd}/styles"):
                stylesArr.append(f)
    
    shutil.copy(f"{cwd}/anticheat.json", f"{builtPath}/anticheat.json")
    shutil.copy(f"{cwd}/config.json", f"{builtPath}/config.json")

    os.mkdir(f"{builtPath}/scripts")
    os.mkdir(f"{builtPath}/styles")

    for i in scriptsArr:
        shutil.copy(f"{cwd}/scripts/{i}", f"{builtPath}/scripts/{i}")

    for i in stylesArr:
        shutil.copy(f"{cwd}/styles/{i}", f"{builtPath}/styles/{i}")

    os.chdir(builtPath)

    print("\Styles and scripts copied to built client")

main()
