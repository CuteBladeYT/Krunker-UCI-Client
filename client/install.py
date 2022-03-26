import os, platform, subprocess

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
    
    print("\nBuilding Krunker UCI for platform: %s %s" % (currPlatform, currArch))
    input("Press enter to continue...")

    if currPlatform == "win32": os.system("cls")
    else: os.system("clear")


    # +------------+
    # | INSTALLING |
    # +------------+

    cwd = os.getcwd()

    modulesFound = False

    for i in range(len(os.listdir(cwd))):
        f = os.listdir(cwd)[i]
        if f == "node_modules":
            modulesFound = True

    if modulesFound == False:
        print("$ npm i")
        os.system("npm i")
    
    buildCmd = "npx electron-packager '%s' 'Krunker UCI' --arch=%s --platform=%s --prune=true --out=build" % (cwd, currArch, currPlatform)

    print("$ %s" % (buildCmd))
    os.system(buildCmd)

main()