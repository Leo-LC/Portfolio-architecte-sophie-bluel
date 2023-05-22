const works = await fetchWorks();

// Export functions to fetch data from the API

export async function fetchWorks() {
	try {
		const res = await fetch("http://localhost:5678/api/works");
		const works = await res.json();
		return works;
	} catch (err) {
		console.error(err);
	}
}

export async function postWorks(newWork) {
	try {
		const res = await fetch("http://localhost:5678/api/works", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newWork),
		});

		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.error(err);
	}
}

export async function deleteWork(id) {
	try {
		// const res = await fetch(`http://localhost:5678/api/works/${id}`, {
		// 	method: "DELETE",
		// });
		// const data = await res.json();
		// console.log(data);
		console.log(id);
	} catch (err) {
		console.error(err);
	}
}

export const categories = new Set();

works.forEach((work) => {
	categories.add(work.category.name);
});
