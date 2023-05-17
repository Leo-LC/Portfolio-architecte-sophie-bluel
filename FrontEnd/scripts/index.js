//update the navbar when the DOM is loaded
document.addEventListener("DOMContentLoaded", updateLayout);

// check if a token is in the local storage and returns true if it is
// TODO : handle token storage in the login.js
function isLoggedIn() {
	// return localStorage.getItem("token") !== null;
	return true;
}

// update the navbar depending on if the user is logged in or not
function updateLayout() {
	const login = document.getElementById("login-logout");
	const editionTab = document.querySelector(".edition-tab");
	const boutonsModifier = document.querySelectorAll(".modifier");
	// if the user is logged in, show the logout button that will refresh the page and remove the token from the local storage
	if (isLoggedIn()) {
		login.innerHTML = `<a href="">logout</a>`;
		editionTab.style.display = "flex";
		boutonsModifier.forEach((bouton) => {
			bouton.classList.toggle("visually-hidden");
		});
		// TODO : créer une fonction handleLogout() qui va gérer le logout ?
		login.onclick = function () {
			localStorage.removeItem("token");
			window.location.reload();
		};
	} else {
		login.innerHTML = `<a href="./login.html">login</a>`;
		editionTab.style.display = "none";
		login.onclick = function () {
			// window.location.href = "./login.html";
			window.location.href = "/login.html";
		};
	}
}
