// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require("fs")

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

	// load custom css
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
		}
	}

	// load userscripts
	let scripts = fs.readdirSync("./scripts/")
	for (let i = 0; i < scripts.length; i++) {
		let scr = scripts[i];
		if (scr.split(".")[scr.split(".").length - 1] == "js") {
			fs.readFile("./scripts/" + scr, "utf-8", (err, data) => {
				if (err) { return };
				if (checkScripts(data) == true) {
					let script = document.createElement("script");
					script.id = "UCI_SCRIPT";
					script.innerHTML = data;
					document.head.append(script);
					if (document.querySelector("#UCI_SCRIPT")) {
						console.log("Script './scripts/" + scr + "' loaded properly");
					} else {
						console.error("Couldn't load custom script './scripts/" + scr + "'");
					};
				} else {
					console.warn("You are trying to load suspicious script! Blocked.");
				};
			});
		};
	};

	function checkScripts(script) {
		let scriptTestPass = true;

		let sampleString = "sas";

		let bannedKeywords = [
			"cheat",
			"hack"
		];

		let active = true;

		fs.readFile("anticheat.json", "utf-8", (err, data) => {
			if (err) { console.error("Couldn't find anticheat.json file. Using default database and config"); return };
			data = JSON.parse(data);
			active = data.active;
			bannedKeywords = data.keywords;
		});

		if (active == true) {
			for (let i = 0; i < bannedKeywords.length; i++) {
				if (script.match(bannedKeywords[i])) {
					scriptTestPass = false;
				};
			};
		};
		
		return scriptTestPass;
	}

	let lobbySwitchKey = "F4";
	fs.readFile("config.json", "utf-8", (err, data) => {
		if (err) return;
		data = JSON.parse(data);
		lobbySwitchKey = data.lobbyswitch_key;
	});

	document.addEventListener("keyup", (e) => {
		switch (e.key) {
			case lobbySwitchKey:
				window.location.href = "https://krunker.io";
				break;
			case "Escape":
				document.exitPointerLock();
				break;
			case "F5":
				window.location.reload();
				break;
		};
	});

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
