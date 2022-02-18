// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require("fs")

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

	// load custom css
	fs.readFile("main_custom.css", "utf-8", (err, data) => {
		if (err) return;
		let css = document.createElement("style");
		css.id = "UCI_CSS";
		css.innerHTML = data;
		document.head.append(css);
		if (document.querySelector("#UCI_CSS")) {
			console.log("Custom CSS Loaded Properly");
		} else {
			console.error("Couldn't load custom CSS");
		};
	})

	// load userscripts
	let scripts = fs.readdirSync("./scripts/")
	for (let i = 0; i < scripts.length; i++) {
		let scr = scripts[i];
		if (scr.split(".")[scr.split(".").length - 1] == "js") {
				fs.readFile("./scripts/" + scr, "utf-8", (err, data) => {
				if (err) return;
				let script = document.createElement("script");
				script.id = "UCI_SCRIPT";
				script.innerHTML = data;
				document.head.append(script);
				if (document.querySelector("#UCI_SCRIPT")) {
					console.log("Script " + scr + " Loaded Properly");
				} else {
					console.error("Couldn't load custom script " + scr);
				};
			});
		}
	}


  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
