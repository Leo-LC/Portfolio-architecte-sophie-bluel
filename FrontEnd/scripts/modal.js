import { fetchWorks, postWorks, categories, deleteWork } from "./data.js";

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
		const test = document.createElement("button");
		deleteIcon.classList.add("fa-solid", "fa-trash-can");
		test.classList.add("modal-picture-delete");
		test.appendChild(deleteIcon);
		test.addEventListener("click", () => {
			deleteWork(work.id);
		});

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
		figure.appendChild(test);
		// TODO : append le moveicon seulement au survol de la figure
		figure.appendChild(moveIcon);
		modalGallery.appendChild(figure);
	});
}
genererModalWorks(works);

/* TODO : 
-1 - Activer le bouton si tous les champs sont remplis
1 - récupérer les infos du formulaire et les stocker dans une variable
2 - les envoyer à l'API
3 - récupérer la réponse de l'API
0 - Changer le logo dans la modale en fonction de l'image ajoutée.
4 - ajouter la nouvelle image à la galerie -> call genererModalWorks ? 
5 - afficher un message de succès ou d'erreur
6 - revenir à la première modale
*/

const modalData = () => {
	const modalForm = document.getElementById("upload-image");
	const image = document.getElementById("input-image").files;
	const imageName = image[0].name;
	const titre = document.getElementById("input-titre").value;
	const categorie = document.getElementById("input-categorie").value;

	const newWork = {
		image: imageName,
		titre: titre,
		categorie: categorie,
	};
	console.log(imageName);
	console.log(newWork);
	return newWork;
};

const addPictureButton = document.getElementById("modal-validate-add-picture");
addPictureButton.addEventListener("click", (e) => {
	e.preventDefault();
	modalData();
});

const inputCategorie = document.getElementById("input-categorie");
categories.forEach((categorie) => {
	inputCategorie.innerHTML += `<option value="${categorie}">${categorie}</option>`;
});

//TODO : warning sur "supprimer la galerie"
//TODO : export le modal dans son propre fichier ? nécessite d'exporter la fonction fetch et/ou les res.json()
