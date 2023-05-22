//update the navbar when the DOM is loaded
document.addEventListener("DOMContentLoaded", updateLayout);

// check if a token is in the local storage and returns true if it is
export function isLoggedIn() {
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
			window.location.href = "/login.html";
		};
	}
}

function handleLogout() {
	localStorage.removeItem("userToken");
	window.location.reload();
}

//TODO : QUESTION : je n'arrive pas à mettre cette fonction dans un fichier à part et l'importer dans index.js
function openModal() {
	const modal = document.querySelector(".modal");
	const modal1 = document.getElementById("modal-1");
	const modal2 = document.getElementById("modal-2");

	const previous = document.querySelectorAll(".modal-back");
	const close = document.querySelectorAll(".modal-close");
	const addPicture = document.getElementById("modal-add-picture");

	modal.style.display = "flex";
	modal1.dataset.active = "true";

	close.forEach((button) => {
		button.addEventListener("click", () => updateModal("close"));
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				updateModal("close");
				window.removeEventListener("keydown", e);
			}
		});
	});
	addPicture.addEventListener("click", () => updateModal("next"));
	previous.forEach((button) => {
		button.addEventListener("click", () => updateModal("previous"));
	});

	function updateModal(param) {
		if (param === "close") {
			modal.style.display = "none";
			modal1.dataset.active = "true";
			modal2.dataset.active = "false";
		} else if (param === "next") {
			modal1.dataset.active = "false";
			modal2.dataset.active = "true";
		} else if (param === "previous") {
			modal1.dataset.active = "true";
			modal2.dataset.active = "false";
		}
	}
}

//TODO : ajouter eventlistener quand on click en dehors de la modale
//TODO : séparer openModal et updateModal / handleModal
