const loginForm = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorText = document.querySelector(".error-text");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	validateEmail();
	validatePassword();
	loginUser();
});

//TODO : add a custom message / styling in case of error
function validateEmail() {
	const validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

	!validEmail.test(email.value)
		? console.log("invalid email")
		: console.log("valid email");
}

function validatePassword() {
	!password.value ? console.log("Password cannot be empty") : null;
}

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
		} else {
			email.classList.remove("invalid-input");
			password.classList.remove("invalid-input");
			email.classList.add("invalid-input");
			password.classList.add("invalid-input");
			errorText.classList.remove("visually-hidden");
		}
	} catch (error) {
		console.error("Error:", error);
	}
}
