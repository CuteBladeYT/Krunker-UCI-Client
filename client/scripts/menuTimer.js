/*
	name: 		Menu Timer
	author: 	UnitedCatdom
	versoin: 	1.0.0
	desc: 		Shows time remaining in menu
*/

document.addEventListener("DOMContentLoaded", () => {
	let timer = document.createElement("span");
	timer.style = `
		position: fixed;
		top: 30vh;
		left: 40vw;
		width: calc(100vw / 2 - (40vw / 2) - (4px / 2));
		height: auto;
		text-align: center;
		color: color;
		font-size: 18px;
		z-index: 99999990;
		background: white;
		border: 3px black solid;
		padding: 4px;
	`;
	timer.id = "MenuTimer";
	document.body.appendChild(timer);

	setInterval(() => {
		let ctime = document.querySelector("#specTimer").textContent;
		let menuvis = document.querySelector("#menuHolder").style.display;
		if (timer) {
			timer.textContent = ctime;
			if (menuvis !== "none") {
				timer.style.display = "unset";
			} else {
				timer.style.display = "none";
			};
		};
	}, 1000)
})