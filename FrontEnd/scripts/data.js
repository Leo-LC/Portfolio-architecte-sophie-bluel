const works = await fetchWorks();
const token = localStorage.getItem("userToken");

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
		const res = await fetch(`http://localhost:5678/api/works/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			// TODO : remove the deleted work from the modal and update the gallery
			console.log("success");
		} else {
			console.log("error");
		}
	} catch (err) {
		console.error(err);
	}
}

export const categories = new Set();

works.forEach((work) => {
	categories.add(work.category.name);
});

//TODO : create deleteAll() function to delete all works from the API
