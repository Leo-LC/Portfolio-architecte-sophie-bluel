export const token = localStorage.getItem("userToken");
export const urlWorks = "http://localhost:5678/api/works";
export const works = await fetchWorks(urlWorks);

/* Récupération et export des catégories  */
export const categories = works.map((work) => work.category);
export const categoriesNames = [
	...new Set(categories.map((category) => category.name)),
];
export const categoriesId = [
	...new Set(categories.map((category) => category.id)),
];

async function fetchWorks(url) {
	try {
		const response = await fetch(url);
		const works = await response.json();
		return works;
	} catch (err) {
		console.error(err);
	}
}
