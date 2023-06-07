import { works, categories } from "./fetch.js";

async function genererGalerie(works) {
	const worksId = [];
	const worksImageUrl = [];
	const worksTitle = [];

	for (const work of works) {
		worksId.push(work.id);
		worksImageUrl.push(work.imageUrl);
		worksTitle.push(work.title);
	}

	// Generate the gallery with all the works
	for (let i = 0; i < worksId.length; i++) {
		const gallery = document.querySelector(".gallery");
		const work = document.createElement("figure");
		const workImage = document.createElement("img");
		const workTitle = document.createElement("figcaption");

		// Add attributes and append elements to the DOM ( -> Could be done with css instead) //
		workImage.style.width = "100%";
		workImage.style.aspectRatio = "3/4";
		workImage.style.objectFit = "cover";
		workImage.src = worksImageUrl[i];
		workTitle.innerText = worksTitle[i];

		work.appendChild(workImage);
		work.appendChild(workTitle);
		gallery.appendChild(work);
	}
}

genererGalerie(works);
ajouterBoutonsFiltrer();

async function ajouterBoutonsFiltrer() {
	/* Iterate over  categories and create a button for each category */
	categories.unshift({ categoryId: 0, categoryName: "Tous" });
	const sectionFiltres = document.querySelector(".filtres");

	categories.map(({ categoryId, categoryName }) => {
		const filtreElement = document.createElement("button");
		filtreElement.innerText = categoryName;
		filtreElement.classList.add("filtre");
		sectionFiltres.appendChild(filtreElement);
		ajouterEventListener(filtreElement, categoryName);
	});
}
function ajouterEventListener(filtreElement, categorie) {
	filtreElement.addEventListener("click", (e) => {
		const gallery = document.querySelector(".gallery");
		// Highlight the clicked button
		const filtres = document.querySelectorAll(".filtre");
		filtres.forEach((filtre) => {
			filtre.dataset.actif = "false";
		});
		e.target.dataset.actif = "true";
		// If the clicked button is the "Tous" button, we display all works, otherwise we filter the works by category
		if (categorie === "Tous") {
			gallery.innerHTML = "";
			genererGalerie(works);
			return;
		} else {
			// Filter works by category and display them
			const worksFiltres = works.filter((work) => {
				return work.category.name === categorie;
			});
			gallery.innerHTML = "";
			genererGalerie(worksFiltres);
		}
	});
}
