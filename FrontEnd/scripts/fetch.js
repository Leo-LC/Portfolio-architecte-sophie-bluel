export const token = localStorage.getItem("userToken");
export const urlWorks = "http://localhost:5678/api/works";
export const works = await fetchWorks(urlWorks);

export const categoriesSet = new Set();
works.map((work) => categoriesSet.add(work.category.name));

export const categories = Array.from(categoriesSet);

async function fetchWorks(url) {
	try {
		const response = await fetch(url);
		const works = await response.json();
		return works;
	} catch (err) {
		console.error(err);
	}
}

export async function postWorks(newWork) {
	try {
		const res = await fetch(urlWorks, {
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
