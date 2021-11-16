// ==UserScript==
// @name         BCX - BCXEditbinds (Loader)
// @namespace    BCX
// @version      1.0.200
// @description  Loader of Jomshir's "Bondage Club Extended" mod
// @author       Jomshir98
// @include      /^https://www\.bondageprojects\.elementfx\.com/R\d+/(BondageClub|\d+)(/(index.html)?)?$/
// @include      /^https://(www\.)?bondage-europe\.com/R\d+/(BondageClub|\d+)(/(index.html)?)?$/
// @run-at       document-end
// @grant        none
// ==/UserScript==

setTimeout(
	function () {
		if (window.BCX_Loaded === undefined) {
			let n = document.createElement("script");
			n.setAttribute("language", "JavaScript");
			n.setAttribute("crossorigin", "anonymous");
			n.setAttribute("src", "https://cdn.jsdelivr.net/gh/VeritySeven/bcxcurseSeven@453c5fd0fbb7b3499ee44b12212a3906d72768d5/bcxedit.js?_=" + Date.now());
			n.onload = () => n.remove();
			document.head.appendChild(n);
		}
	},
	2000
);
