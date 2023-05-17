const loginForm = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	validateEmail();
	validatePassword();
	loginUser();
});

//TODO : add a custom message / styling in case of error and remove console logs
function validateEmail() {
	const validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
	!validEmail.test(email.value.toLowerCase())
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
		userID: "",
		token: "",
	};

	try {
		const response = await fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		const data = await response.json();

		if (response.ok) {
			//TODO :  Redirect to the homepage if login is successful
			console.log("Login successful");
			// window.location.href = "./index.html";
			console.log(response);
			console.log(data.userId);
			console.log(data.token);
			// TODO : Save the token in local storage
			// TODO : check if the user is saved in local storage, if not : save it with its token and userID
			// I want to save the token in local storage

			/*localStorage.setItem("token", data.token);
			console.log(localStorage.getItem("token"));
			console.log(data.token);
            */
		} else {
			// Show an error message if login fails
			//TODO : call a function to display the error message
			alert("Invalid email or password");
		}
	} catch (error) {
		console.error("Error:", error);
	}
}
