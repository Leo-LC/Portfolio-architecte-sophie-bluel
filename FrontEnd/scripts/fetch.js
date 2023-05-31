export const token = localStorage.getItem("userToken");
export const urlWorks = "http://localhost:5678/api/works";
export const works = await fetchWorks(urlWorks);

/* Récupération et export des catégories  */

export const categories = [];

works.forEach((work) => {
	const categoryId = work.category.id;
	const categoryName = work.category.name;

	// Check if the category already exists in the array
	const existingCategory = categories.find(
		(category) => category.categoryId === categoryId
	);

	if (!existingCategory) {
		// Category does not exist, add it to the array
		categories.push({ categoryId, categoryName });
	}
});



async function fetchWorks(url) {
	try {
		const response = await fetch(url);
		const works = await response.json();
		return works;
	} catch (err) {
		console.error(err);
	}
}
