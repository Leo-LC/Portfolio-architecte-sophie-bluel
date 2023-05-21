import { fetchWorks } from "./data.js";

const works = await fetchWorks();

// Générer les works dans la modale
const modalGallery = document.querySelector(".modal-gallery");

async function genererModalWorks(works) {
	works.forEach((work) => {
		const figure = document.createElement("figure");
		figure.classList.add("modal-gallery-figure");

		// TODO : transformer le figcaption en bouton interactif pour event listener
		const figcaption = document.createElement("figcaption");
		figcaption.innerText = "éditer";

		// TODO : transformer les i en bouton interactif pour event listener
		const deleteIcon = document.createElement("i");
		deleteIcon.classList.add(
			"modal-picture-delete",
			"fa-solid",
			"fa-trash-can"
		);

		const moveIcon = document.createElement("i");
		moveIcon.classList.add(
			"modal-picture-move",
			"fa-solid",
			"fa-up-down-left-right"
		);

		const image = document.createElement("img");
		image.src = work.imageUrl;
		image.dataset.id = work.id;

		figure.appendChild(image);
		figure.appendChild(figcaption);
		figure.appendChild(deleteIcon);
		// TODO : append le moveicon seulement au survol de la figure
		figure.appendChild(moveIcon);
		modalGallery.appendChild(figure);
	});
}

genererModalWorks(works);


//TODO : comment export / import ? 

//TODO : warning sur "supprimer la galerie"

//TODO : export le modal dans son propre fichier ? nécessite d'exporter la fonction fetch et/ou les res.json()
