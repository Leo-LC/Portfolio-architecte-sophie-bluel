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

// Fonction pour générer la galerie
function getWorks(works) {
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

// On récupère les boutons de filtres
const filtreObjets = document.querySelector(".filtre-objets");

// On ajoute un event listener sur le bouton de filtre "Objets"
filtreObjets.addEventListener("click", () => {
	const gallery = document.querySelector(".gallery");
	const worksFiltres = works.filter((work) => {
		return work.category.name === "Objets";
	});
	// On vide la galerie
	gallery.innerHTML = "";
	// On appelle la fonction pour générer la galerie avec les éléments filtrés
	getWorks(worksFiltres);
});

// Créer une liste de filtres et itérer dessus pour générer les boutons de filtres et les event listeners
const filtres = ["Objets", "Appartements", "Hotels & restaurants"];
filtres.forEach((filtre) => {
	const filtreElement = document.createElement("button");
	filtreElement.innerText = filtre;
	filtreElement.classList.add("filtre");
	filtreElement.addEventListener("click", () => {
		const gallery = document.querySelector(".gallery");
		const worksFiltres = works.filter((work) => {
			return work.category.name === filtre;
		});
		// On vide la galerie
		gallery.innerHTML = "";
		// On appelle la fonction pour générer la galerie avec les éléments filtrés
		getWorks(worksFiltres);
	});
	filtreObjets.after(filtreElement);
});
