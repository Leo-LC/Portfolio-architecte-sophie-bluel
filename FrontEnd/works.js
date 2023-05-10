// import { ajouterBoutonsFiltrer } from "./filtres.js";

/* Est-ce la bonne méthode pour utiliser "works" en dehors d'une async ? 
let works;
(async () => {
  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  getWorks(works);
})();
*/

// Récupération des données de l'API
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
// Fonctionne en dehors d'une fonction async depuis que j'ai ajouté role : "module" dans le script du HTML
// Fonction pour générer la galerie
async function getWorks(works) {
	const worksId = works.map((work) => work.id);
	const worksImageUrl = works.map((work) => work.imageUrl);
	const worksTitle = works.map((work) => work.title);

	// On génère la galerie en fonction des données de l'API
	for (let i = 0; i < worksId.length; i++) {
		const gallery = document.querySelector(".gallery");
		const work = document.createElement("figure");
		const workImage = document.createElement("img");
		const workTitle = document.createElement("figcaption");

		// On ajoute les attributs nécessaires
		workImage.src = worksImageUrl[i];
		workTitle.innerText = worksTitle[i];

		// On append les éléments à la galerie
		work.appendChild(workImage);
		work.appendChild(workTitle);
		gallery.appendChild(work);
	}
}

// On appelle la fonction une première fois pour générer la galerie avec tous les éléments de l'API
getWorks(works);
// On appelle la fonction pour générer les boutons de filtres
ajouterBoutonsFiltrer();

//TODO : placer les fonctions liées aux filtres dans un fichier à part (comprendre comment passer les variables entre les fichiers)
async function ajouterBoutonsFiltrer() {
	const response = await fetch("http://localhost:5678/api/categories");
	const data = await response.json();

	const categories = data.map((data) => data.name);
	categories.unshift("Tous");

	categories.forEach((categorie) => {
		const filtreElement = document.createElement("button");
		filtreElement.innerText = categorie;

		const sectionFiltres = document.querySelector(".filtres");
		sectionFiltres.appendChild(filtreElement);
		filtreElement.classList.add("filtre");
		// On appelle la fonction pour ajouter un event listener sur chaque bouton de filtre
		ajouterEventListener(filtreElement, categorie);
	});
}

function ajouterEventListener(filtreElement, categorie) {
	// On ajoute un event listener sur chaque bouton de filtre
	filtreElement.addEventListener("click", (e) => {
		const gallery = document.querySelector(".gallery");
		// On retire la classe CSS "actif" de tous les boutons de filtre
		const filtres = document.querySelectorAll(".filtre");
		filtres.forEach((filtre) => {
			filtre.dataset.actif = "false";
		});
		// On ajoute la classe CSS "actif" au bouton de filtre cliqué
		e.target.dataset.actif = "true";

		if (categorie === "Tous") {
			// On vide la galerie
			gallery.innerHTML = "";
			// On appelle la fonction pour générer la galerie avec tous les éléments de l'API
			getWorks(works);
			return;
		} else {
			const worksFiltres = works.filter((work) => {
				return work.category.name === categorie;
			});
			gallery.innerHTML = "";
			// On appelle la fonction pour générer la galerie avec les éléments filtrés
			getWorks(worksFiltres);
		}
	});
}
