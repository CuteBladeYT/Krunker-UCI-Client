/*
	name: 		ESC Fix
	author: 	UnitedCatdom
	versoin: 	1.0.0
	desc: 		Tries to "fix" ESC key not working
*/

document.addEventListener("keypress", (event) => {
	let pk = event.key;
	if (pk == "ESC") {
		showWindow(3);
	};
}, false) 