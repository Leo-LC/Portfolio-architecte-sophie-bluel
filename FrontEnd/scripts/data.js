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
