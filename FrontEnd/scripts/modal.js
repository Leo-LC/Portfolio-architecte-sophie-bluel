import {
	works,
	urlWorks,
	token,
	categoriesNames,
	categoriesId,
} from "./fetch.js";

// Générer les works dans la modale
const modalGallery = document.querySelector(".modal-gallery");

/* TODO QUESTION : impossible d'exporter depuis modal.js (GET
http://127.0.0.1:5500/FrontEnd/scripts/modal

Le chargement du module à l’adresse « http://127.0.0.1:5500/FrontEnd/scripts/modal » a été bloqué en raison d’un type MIME interdit (« text/html »).
index.html
Échec du chargement pour le module dont la source est « http://127.0.0.1:5500/FrontEnd/scripts/modal ».) */

async function genererModalWorks(works) {
	works.forEach((work) => {
		const figure = document.createElement("figure");
		figure.classList.add("modal-gallery-figure");

		const figcaption = document.createElement("figcaption");
		figcaption.innerText = "éditer";

		const image = document.createElement("img");
		image.src = work.imageUrl;
		image.dataset.id = work.id;

		const deleteIcon = createButtonWithIcon(
			["fa-solid", "fa-trash-can"],
			["modal-picture-delete"],
			() => deleteWork(work.id, false)
		);

		const moveIcon = createButtonWithIcon(
			["fa-solid", "fa-up-down-left-right"],
			["modal-picture-move"],
			() => console.log("move")
		);

		figure.appendChild(image);
		figure.appendChild(figcaption);
		figure.appendChild(deleteIcon);
		// Append moveIcon to figure on mouseover and remove on mouseout
		figure.addEventListener("mouseenter", () => figure.appendChild(moveIcon));
		figure.addEventListener("mouseleave", () => figure.removeChild(moveIcon));

		modalGallery.appendChild(figure);
	});

	// Générer les options de la liste déroulante
	const inputCategorie = document.getElementById("input-categorie");

	for (let i = 0; i < categoriesId.length; i++) {
		const option = document.createElement("option");
		option.value = categoriesId[i];
		option.textContent = categoriesNames[i];
		inputCategorie.appendChild(option);
	}
}
// Function to create icons
function createButtonWithIcon(iconClasses, buttonClasses, clickHandler) {
	const button = document.createElement("button");
	const icon = document.createElement("i");
	icon.classList.add(...iconClasses);
	button.classList.add(...buttonClasses);
	button.appendChild(icon);
	button.addEventListener("click", clickHandler);
	return button;
}

//TODO QUESTION following : comment l'appeler uniquement au moment d'open la modale ? Est-ce nécessaire en terme d'optimisation ?
genererModalWorks(works);

// Delete all works from the API and the DOM
const deleteAllButton = document.getElementById("modal-delete-galerie");
deleteAllButton.addEventListener("click", confirmDeleteAll);

function confirmDeleteAll() {
	const confirmation = confirm(
		"Voulez-vous vraiment supprimer toute votre galerie ?"
	);
	if (confirmation) {
		deleteAllWorks(works);
	}
}
async function deleteAllWorks(works) {
	// If the user confirms, proceed with deletion
	works.forEach((work) => deleteWork(work.id, true));
	alert("Votre galerie a bien été supprimée");
	console.log("All done");
}
// Delete one work from the API and the DOM
async function deleteWork(id, deleteAllWorksCalled) {
	try {
		const res = await fetch(`http://localhost:5678/api/works/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			if (!deleteAllWorksCalled) {
				const confirmation = confirm(
					"Voulez-vous vraiment supprimer cette image ?"
				);
				if (confirmation) {
					const deletedWork = document.querySelector(`[data-id="${id}"]`);
					deletedWork.parentElement.remove();
				}
			} else {
				const deletedWork = document.querySelector(`[data-id="${id}"]`);
				deletedWork ? deletedWork.parentElement.remove() : null;
			}
		}
	} catch (err) {
		console.error(err);
	}
}

/* Add a new work to the API and the DOM */
async function postWorks(formData) {
	try {
		const res = await fetch(urlWorks, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
		if (res.ok) {
			console.log(works);
		}
	} catch (err) {
		console.error(err);
	}
}

const modalForm = document.getElementById("upload-image");

//TODO : prevent le refresh de la page
modalForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const modalData = new FormData();

	const title = document.getElementById("input-titre").value;
	const category = document.getElementById("input-categorie").value;
	modalData.append("title", title);
	modalData.append("category", category);

	// TODO : QUESTION : je me suis cassé la tête pendant 3h en essayant de convertir en "string binary"
	const file = document.getElementById("input-image").files[0];
	modalData.append("image", file);
	await postWorks(modalData);
});

const buttonPublish = document.getElementById("button-publish");
buttonPublish.addEventListener("click", () => {
	event.preventDefault();
	window.location.reload();
});

// Update le preview de l'image dans la modale
const noPreview = document.querySelector(".no-preview");
const preview = document.querySelector(".preview");
const imageInput = document.getElementById("input-image");
imageInput.addEventListener("change", () => {
	const image = imageInput.files[0];
	if (image) {
		noPreview.style.display = "none";
		preview.style.display = "grid";
		console.log(image);
		//TODO : gérer les styles pour que ça ne repousse pas le reste de la modale
		preview.innerHTML = `<img src="${URL.createObjectURL(
			image
		)}" alt="Preview de l'image à uploader" />`;
	}
});
