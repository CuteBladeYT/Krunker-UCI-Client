// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { ipcRenderer } = require("electron");
const fs = require("fs");

window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	// Load Custom CSS
	fs.readdir("./styles/", (err, files) => {
		if (err) return;
		for (let i = 0; i < files.length; i++) {
			let css = files[i];
			if (css.endsWith(".css")) {
				fs.readFile("./styles/" + css, "utf-8", (err, data) => {
					if (err) return;
					let style = document.createElement("style");
					style.id = "UCI_CSS";
					style.innerHTML = data;
					document.head.append(style);
					if (document.querySelector("#UCI_CSS")) {
						console.log("CSS './styles/" + css + "' loaded properly");
					} else console.error("Couldn't load custom CSS './styles/" + css + "'");
				});
			};
		};
	});

	let ac_bannedKeywords = [
		"cheat",
		"hack"
	];

	let ac_active = true;

	fs.readFile("anticheat.json", "utf-8", (err, data) => {
		if (err) { console.error("Couldn't find anticheat.json file. Using default database and config"); return };
		data = JSON.parse(data);

		ac_active = data.active;

		ac_bannedKeywords = data.keywords;

		let scriptCount = 0;

		// Load userscripts
		fs.readdir("./scripts/", (err, files) => {
			if (err) return;
			for (let i = 0; i < files.length; i++) {
				let scr = files[i];
				if (scr.endsWith(".js")) {
					fs.readFile("./scripts/" + scr, "utf-8", (err, data) => {
						if (err) { return };
						if (checkScripts(data) == true) {
							let script = document.createElement("script");
							script.id = `UCI_SCRIPT_${i}`;
							script.className = scriptCount;
							script.innerHTML = data;
							document.head.append(script);
							if (document.querySelector(`#UCI_SCRIPT_${i}`)) {
								console.log("Script './scripts/" + scr + "' loaded properly");
								scriptCount += 1;
							} else {
								console.error("Couldn't load custom script './scripts/" + scr + "'");
							};
						} else {
							console.warn("You are trying to load suspicious script! Blocked.");
						};
					});
				};
			};
		});
	});

	// Anticheat XDD
	function checkScripts(script) {
		if (ac_active == true) {
			for (let i = 0; i < ac_bannedKeywords.length; i++) {
				if (script.match(ac_bannedKeywords[i])) {
					return false;
				};
			};
		};
		return true
	}

	// Screenshots
	let screenshot_key = "F3";
	fs.readFile("config.json", "utf-8", (err, data) => {
		if (err) return;
		data = JSON.parse(data);
		screenshot_key = data.screenshot_key;
	});
	document.addEventListener("keyup", (e) => {
		if (e.key == screenshot_key) {
			ipcRenderer.invoke("takeScreenshot");
		};
	});
	
	// obviously Lobby Switch
	let lobbySwitchKey = "F4";
	fs.readFile("config.json", "utf-8", (err, data) => {
		if (err) return;
		data = JSON.parse(data);
		lobbySwitchKey = data.lobbyswitch_key;
	});

	// Fix ESC key
	document.addEventListener("keyup", (e) => {
		switch (e.key) {
			case lobbySwitchKey:
				window.location.href = "https://krunker.io";
				break;
			case "Escape":
				document.exitPointerLock();
				break;
		};
	});

	// Discord RPC
	fs.readFile("config.json", "utf-8", (err, data) => {
		if (err) return;
		data = JSON.parse(data);
		let enabled = data.discord_rpc;
		if (enabled == true) {
			setInterval(() => {
				let game = window.getGameActivity();
				let rpc = {
					details: game.map,
					state: game.mode,
					endTimestamp: Date.now() + game.time * 1e3,
					largeImageKey: "icon",
					largeImageText: game.user,
					smallImageKey: `${game.class.index}`,
					smallImageText: game.class.name,
					buttons: [
						{
							label: "Join my game!",
							url: `https://krunker.io/${game.id}`
						},
						{
							label: "My profile!",
							url: `https://krunker.io/social.html?p=profile&q=${game.user}`
						}
					]
				};
				ipcRenderer.invoke("rpc-handler", rpc);
			}, 1000);
		};
	});

	for (const type of ["chrome", "node", "electron"]) {
		replaceText(`${type}-version`, process.versions[type])
	}
})