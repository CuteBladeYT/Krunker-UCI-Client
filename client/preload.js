// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require("fs");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	// Load Custom CSS
	let styles = fs.readdirSync("./styles/")
	for (let i = 0; i < styles.length; i++) {
		let css = styles[i];
		if (css.split(".")[css.split(".").length - 1] == "css") {
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
		let scripts = fs.readdirSync("./scripts/")
		for (let i = 0; i < scripts.length; i++) {
			let scr = scripts[i];
			if (scr.split(".")[scr.split(".").length - 1] == "js") {
				fs.readFile("./scripts/" + scr, "utf-8", (err, data) => {
					if (err) { return };
					if (checkScripts(data) == true) {
						let script = document.createElement("script");
						script.id = "UCI_SCRIPT";
						script.className = scriptCount;
						script.innerHTML = data;
						document.head.append(script);
						if (document.querySelector(`#UCI_SCRIPT.${scriptCount}`)) {
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

	// Anticheat
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
					joinSecret: game.id,
					partyId: game.id
				};
				ipcRenderer.invoke("rpc-handler", rpc);
			}, 1000);
		};
	});

	for (const type of ["chrome", "node", "electron"]) {
		replaceText(`${type}-version`, process.versions[type])
	}
})
