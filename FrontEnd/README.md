**_ NOTES _**

### PROBLEMES RENCONTRES ###

TODO : Pour ajouter un users dans la db, j'ai du ouvrir la route "signup" et tweaker le code une fois pour créer "admin@admin.fr" et "1234"
Mais je n'ai pas attribué ou stocké de token.



### A garder dans un coin pour comprendre le fonctionnement si besoin

```const fetchUrls = [
"http://localhost:5678/api/endpoint1",
"http://localhost:5678/api/endpoint2"
];

const responses = await Promise.all(
fetchUrls.map(url => fetch(url).then(response => response.json()))
);

const [data1, data2] = responses;
```
