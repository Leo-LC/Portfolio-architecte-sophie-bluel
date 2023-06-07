import { works, urlWorks, token, categories } from "./fetch.js";

// Générer les works dans la modale
const modalGallery = document.querySelector(".modal-gallery");
async function genererModalWorks(works) {
	works.forEach((work) => {
		const figure = createModalGalleryFigure(work);
		modalGallery.appendChild(figure);
	});

	// Iterate over the categories array to create options
	const inputCategorie = document.getElementById("input-categorie");
	categories.forEach((category) => {
		const option = document.createElement("option");
		option.value = category.categoryId;
		option.textContent = category.categoryName;
		inputCategorie.appendChild(option);
	});
}

// Function to create and append elements
function createModalGalleryFigure(work) {
	const figure = document.createElement("figure");
	figure.classList.add("modal-gallery-figure");

	const figcaption = document.createElement("figcaption");
	figcaption.innerText = "éditer";

	const image = document.createElement("img");
	image.style.width = "100%";
	image.style.aspectRatio = "3/4";
	image.style.objectFit = "cover";
	image.src = work.imageUrl;
	image.dataset.id = work.id;

	const deleteIcon = createButtonWithIcon(
		["fa-solid", "fa-trash-can"],
		["modal-picture-delete"],
		(e) => {
			e.preventDefault();
			deleteWork(work.id);
		}
	);

	const moveIcon = createButtonWithIcon(
		["fa-solid", "fa-up-down-left-right"],
		["modal-picture-move"],
		() => console.log("move")
	);

	figure.appendChild(image);
	figure.appendChild(figcaption);
	figure.appendChild(deleteIcon);
	// Append moveIcon to figure on mouseover and remove on mouseout
	figure.addEventListener("mouseenter", () => figure.appendChild(moveIcon));
	figure.addEventListener("mouseleave", () => figure.removeChild(moveIcon));

	return figure;
}
// Function to create icons
function createButtonWithIcon(iconClasses, buttonClasses, clickHandler) {
	const button = document.createElement("button");
	const icon = document.createElement("i");
	icon.classList.add(...iconClasses);
	button.classList.add(...buttonClasses);
	button.appendChild(icon);
	button.addEventListener("click", clickHandler);
	return button;
}

// Génère la modale
genererModalWorks(works);

// Calls API to delete works from the API and the DOM
async function deleteWork(id) {
	try {
		const res = await fetch(`http://localhost:5678/api/works/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			const deletedWork = document.querySelector(`[data-id="${id}"]`);
			deletedWork ? deletedWork.parentElement.remove() : null;
		}
	} catch (err) {
		console.error(err);
	}
}

// Delete all works from the API and the DOM
const deleteAllButton = document.getElementById("modal-delete-galerie");
deleteAllButton.addEventListener("click", (e) => {
	e.preventDefault();
	const confirmed = window.confirm(
		"Are you sure you want to delete all works?"
	);
	if (confirmed) {
		deleteAllWorks(works);
	}
});
async function deleteAllWorks(works) {
	await Promise.all(works.map((work) => deleteWork(work.id)));
	alert("Votre galerie a bien été supprimée");
}

/* Add a new work to the API and the DOM */
async function postWorks(formData) {
	try {
		const res = await fetch(urlWorks, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
		if (!res.ok) {
			console.log(res.status);
		}
	} catch (err) {
		console.error(err);
	}
}

const modalForm = document.getElementById("upload-image");
modalForm.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(e) {
	e.preventDefault();

	const modalData = new FormData(modalForm);
	await postWorks(modalData);
	// Reset the form after submission
	modalForm.reset();
}

// Activate the button when the user has filled all the fields
const titleInput = document.getElementById("input-titre");
const categoryInput = document.getElementById("input-categorie");
const imageInput = document.getElementById("input-image");
const submitButton = document.getElementById("modal-validate-add-picture");
const errorMessage = modalForm.querySelector(".error-text");

function checkFormValidity() {
	if (titleInput.value && categoryInput.value && imageInput.files.length > 0) {
		errorMessage.classList.add("visually-hidden");
		submitButton.removeAttribute("disabled");
	} else if (
		titleInput.value &&
		categoryInput.value &&
		imageInput.files.length == 0
	) {
		submitButton.setAttribute("disabled", "");
		errorMessage.classList.remove("visually-hidden");
		errorMessage.innerText = "Ajoutez une image";
	} else if (
		!titleInput.value &&
		categoryInput.value &&
		imageInput.files.length > 0
	) {
		submitButton.setAttribute("disabled", "");
		errorMessage.classList.remove("visually-hidden");
		errorMessage.innerText = "Ajoutez un titre";
	} else {
		submitButton.setAttribute("disabled", "");
		errorMessage.classList.remove("visually-hidden");
		errorMessage.innerText = "Veuillez remplir tous les champs";
	}
}

titleInput.addEventListener("input", checkFormValidity);
categoryInput.addEventListener("input", checkFormValidity);
imageInput.addEventListener("change", checkFormValidity);

const buttonPublish = document.getElementById("button-publish");
buttonPublish.addEventListener("click", (event) => {
	event.preventDefault();
	window.location.reload();
});

// Update le preview de l'image dans la modale
const noPreview = document.querySelector(".no-preview");
const preview = document.querySelector(".preview");
const dropZone = document.getElementById("input-image-label");

const updateImagePreview = (image) => {
	noPreview.style.display = "none";
	preview.style.display = "flex";
	dropZone.style.paddingBlock = "0";
	preview.innerHTML = `<img src="${URL.createObjectURL(
		image
	)}" alt="Preview de l'image à uploader" />`;
};

imageInput.addEventListener("change", () => {
	const image = imageInput.files[0];
	if (image) {
		updateImagePreview(image);
	}
});
// Handle drag and drop of images

dropZone.addEventListener("dragover", (e) => {
	e.preventDefault();
	dropZone.classList.add("dragover");
});
dropZone.addEventListener("dragleave", (e) => {
	e.preventDefault();
	dropZone.classList.remove("dragover");
});
dropZone.addEventListener("drop", (e) => {
	e.preventDefault();
	dropZone.classList.remove("dragover");
	const image = e.dataTransfer.files[0];

	if (image) {
		updateImagePreview(image);
	}
});
