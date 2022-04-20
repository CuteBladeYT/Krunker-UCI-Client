#!/bin/python3
# if on Linux
import os, sys, subprocess

def main():
    npmVersion = subprocess.run(["npm", "v"], capture_output=True).stdout
    cwd = os.getcwd()
    files = os.listdir(cwd)

    filesVerify = [
        ["package.json", False],    # 0
        ["main.js", False],         # 1
        ["preload.js", False],      # 2
        ["config.json", False],     # 3
        ["anticheat.json", False],  # 4
        ["node_modules", False]     # 5
    ]

    for f in files:
        for v in filesVerify:
            if f == v[0]:
                v[1] = True
    
    for f in filesVerify:
        if f[1] == False:
            if f[0] == filesVerify[5][0]:
                print("Important modules not found. Installing...")
                os.system("npm i")
                break
            else:
                print(f"'{f[0]}' not found. Aborted.")
                sys.exit()
    
    os.system("npm start")

main()