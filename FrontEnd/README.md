**_ NOTES _**

### A garder dans un coin pour comprendre le fonctionnement si besoin

` const fetchUrls = [
"http://localhost:5678/api/endpoint1",
"http://localhost:5678/api/endpoint2"
];

const responses = await Promise.all(
fetchUrls.map(url => fetch(url).then(response => response.json()))
);

const [data1, data2] = responses;
`
