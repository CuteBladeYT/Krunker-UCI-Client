#!/bin/python3
# if on Linux
import os, sys, subprocess

def main():
    npmVersion = subprocess.run(["npm", "v"], capture_output=True).stdout
    cwd = os.getcwd()
    files = os.listdir(cwd)

    filesVerify = [
        ["package.json", False],
        ["main.js", False],
        ["preload.js", False],
        ["config.json", False],
        ["anticheat.json", False],
        ["node_modules", False]
    ]

    for f in files:
        for v in filesVerify:
            if f == v[0]:
                v[1] = True
    
    for f in filesVerify:
        if f[1] == False:
            print(f"'{f[0]}' not found. Aborted.")
            sys.exit()
    
    os.system("npm start")

main()