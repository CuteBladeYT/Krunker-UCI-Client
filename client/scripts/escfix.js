/*
	name: 		ESC Fix
	author: 	UnitedCatdom
	versoin: 	1.0.0
	desc: 		Tries to "fix" ESC key not working
*/

document.addEventListener("keydown", (event) => {
	let pk = event.key;
	if (pk == "Escape") {
		showWindow(3);
	};
}, false) 
