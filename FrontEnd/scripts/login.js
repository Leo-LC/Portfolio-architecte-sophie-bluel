const loginForm = document.querySelector(".login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorText = document.querySelector(".error-text");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	errorText.innerHTML = "";
	errorText.classList.remove("visually-hidden");
	const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
	const validEmail = regex.test(email.value) && email.value !== "";
	const validPassword = password.value !== "";

	if (validEmail && validPassword) {
		await loginUser();
	} else if (!validEmail) {
		errorText.innerHTML = "Veuillez entrer une adresse email valide";
	} else if (!validPassword) {
		errorText.innerHTML = "Veuillez entrer un mot de passe";
	}
});

async function loginUser() {
	let user = {
		email: email.value,
		password: password.value,
	};

	// Call the API to check if the combination email/password is valid
	try {
		const response = await fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await response.json();

		// If the login is successful, save the token in the local storage and redirect to the index page
		if (response.ok) {
			localStorage.setItem("userToken", data.token);
			window.location.href = "./index.html";
		} else if (response.status === 404) {
			errorText.innerHTML = "Utilisateur non enregistré";
			shake();
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

function shake() {
	loginForm.classList.add("shake");
	setTimeout(() => {
		loginForm.classList.remove("shake");
	}, 500);
}

//TODO : user non enregistré message personnalisé en fonction faute de frappe ou retour backend
