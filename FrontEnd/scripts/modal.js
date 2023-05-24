import { works, token, categories } from "./fetch.js";

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
			() => deleteWork(work.id)
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

async function deleteWork(id) {
	try {
		const res = await fetch(`http://localhost:5678/api/works/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			const confirmation = confirm(
				"Voulez-vous vraiment supprimer cette image ?"
			);
			if (confirmation) {
				const deletedWork = document.querySelector(`[data-id="${id}"]`);
				deletedWork.parentElement.remove();
			}
		}
	} catch (err) {
		console.error(err);
	}
}

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
	works.forEach((work) => deleteWork(work.id));
	console.log("All done");
}

/* TODO : 
-1 - Activer le bouton si tous les champs sont remplis
2 - les envoyer à l'API
3 - récupérer la réponse de l'API
4 - ajouter la nouvelle image à la galerie -> call genererModalWorks ? 
5 - afficher un message de succès ou d'erreur
6 - revenir à la première modale
*/

// ADD WORKS TO THE API

const modalForm = document.getElementById("upload-image");
const inputImage = document.getElementById("input-image");
const inputTitre = document.getElementById("input-titre");
const inputCategorie = document.getElementById("input-categorie");

const images = inputImage.files;
const imageName = images[0].name;
const titre = inputTitre.value;
const categorie = inputCategorie.value;

//TODO : use formData instead
const modalData = () => {
	const newWork = {
		image: imageName,
		titre: titre,
		categorie: categorie,
	};
	console.log(newWork);
	return newWork;
};

const addPictureButton = document.getElementById("modal-validate-add-picture");
addPictureButton.addEventListener("click", (e) => {
	e.preventDefault();
	modalData();
});

// Générer les options de la liste déroulante
categories.forEach((categorie) => {
	// TODO : value : categorie.id de la catégorie
	inputCategorie.innerHTML += `<option value="${categorie}">${categorie}</option>`;
});

// TODO : Update le preview de l'image dans la modale
inputImage.addEventListener("change", () => {
	const loadedImage = inputImage.files[0];
	const imagePreview = document.querySelector(".drop-container");

	if (loadedImage) {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			const preview = document.createElement("img");
			preview.src = reader.result;
			imagePreview.innerHTML = "";
			imagePreview.innerHTML = `<img src="${preview.src}"> <input type="file" name="input-image" id="input-image" accept=".jpg, .jpeg, .png">`;
		});
		reader.readAsDataURL(loadedImage);
	}
});

//TODO : warning sur "supprimer la galerie"
//TODO : drag n drop

// TODO : formdata => name similaire à l'API
