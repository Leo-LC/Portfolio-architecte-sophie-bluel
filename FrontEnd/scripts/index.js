document.addEventListener("DOMContentLoaded", updateNavbar);

// check if a token is in the local storage and returns true if it is

function isLoggedIn() {
	return localStorage.getItem("token") !== null;
}

function updateNavbar() {
	const login = document.getElementById("login-logout");
	// if the user is logged in, show the logout button that will refresh the page and remove the token from the local storage
	if (isLoggedIn()) {
		login.innerHTML = "logout";
		login.onclick = function () {
			localStorage.removeItem("token");
			window.location.reload();
		};
	} else {
		login.innerHTML = "login";
		login.onclick = function () {
			// window.location.href = "./login.html";
			login.href = "./login.html";
		};
	}
}
