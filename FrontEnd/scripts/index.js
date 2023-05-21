//update the navbar when the DOM is loaded
document.addEventListener("DOMContentLoaded", updateLayout);

// check if a token is in the local storage and returns true if it is
function isLoggedIn() {
	return localStorage.getItem("userToken") !== null;
}

// update the navbar depending on if the user is logged in or not
function updateLayout() {
	const login = document.getElementById("login-logout");
	const editionTab = document.querySelector(".edition-tab");
	const edit = document.querySelectorAll(".edit");
	const boutonsModifier = document.querySelectorAll(".modifier");
	// if the user is logged in, show the logout button that will refresh the page and remove the token from the local storage
	if (isLoggedIn()) {
		login.innerHTML = `<a>logout</a>`;
		editionTab.style.display = "flex";
		boutonsModifier.forEach((bouton) => {
			bouton.classList.remove("visually-hidden");
		});

		edit.forEach((bouton) => {
			bouton.addEventListener("click", openModal);
		});

		login.onclick = handleLogout;
	} else {
		login.innerHTML = `<a href="./login.html">login</a>`;
		editionTab.style.display = "none";
		login.onclick = function () {
			// window.location.href = "./login.html";
			window.location.href = "/login.html";
		};
	}
}

function handleLogout() {
	localStorage.removeItem("userToken");
	window.location.reload();
}

function openModal() {
	if (isLoggedIn()) {
		const modal = document.querySelector(".modal");
		const close = document.getElementById("modal-close");
		modal.style.display = "flex";

		//TODO : simplifier le code en utilisant une fonction closeModal.
		close.addEventListener("click", () => {
			modal.style.display = "none";
		});

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				modal.style.display = "none";
				window.removeEventListener("keydown", e);
			}
		});
	}
}
