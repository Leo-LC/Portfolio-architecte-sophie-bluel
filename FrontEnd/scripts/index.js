//update the layout when the DOM is loaded
document.addEventListener("DOMContentLoaded", updateLayout);

// check if a token is in the local storage and returns true if it is
export function isLoggedIn() {
	return localStorage.getItem("userToken") !== null;
}

// update the navbar depending on if the user is logged in or not
function updateLayout() {
	const login = document.getElementById("log-in");
	const logout = document.getElementById("log-out");
	const editionTab = document.querySelector(".edition-tab");
	const edit = document.querySelectorAll(".edit");
	// if the user is logged in, show the logout button that will refresh the page and remove the token from the local storage
	if (isLoggedIn()) {
		login.classList.add("display-none");
		logout.classList.remove("display-none");
		editionTab.style.display = "flex";

		edit.forEach((bouton) => {
			bouton.addEventListener("click", openModal);
			bouton.classList.remove("visually-hidden");
		});

		logout.onclick = handleLogout;
	} else {
		login.classList.remove("display-none");
		logout.classList.add("display-none");
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

// TODO : QUESTION : j'essaye de mettre la fonction dans modal.js et de l'importer ici mais ça ne marche pas, pourquoi ?
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

	// Navigate between the two modals
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

const contactForm = document.getElementById("contact-form-validate");
contactForm.addEventListener("click", (e) => {
	e.preventDefault();
});

//TODO : EXTRA : function pour modifier la photo de profil
//TODO : EXTRA : function pour modifier le titre "mes projets"
