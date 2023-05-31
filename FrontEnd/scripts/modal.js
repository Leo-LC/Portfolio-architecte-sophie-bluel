import { works, urlWorks, token, categories } from "./fetch.js";

// Générer les works dans la modale
const modalGallery = document.querySelector(".modal-gallery");
async function genererModalWorks(works) {
	works.forEach((work) => {
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
			() => deleteWork(work.id, false)
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

// Delete all works from the API and the DOM
const deleteAllButton = document.getElementById("modal-delete-galerie");
deleteAllButton.addEventListener("click", (e) => {
	e.preventDefault();
	deleteAllWorks(works);
});

async function deleteAllWorks(works) {
	works.forEach((work) => {
		if (work) {
			deleteWork(work.id, true);
		}
	});
	alert("Votre galerie a bien été supprimée");
	console.log("All done");
}
// Delete one work from the API and the DOM
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
			//TODO : QUESTION : générer la galerie à chaque fois ?
		}
	} catch (err) {
		console.error(err);
	}
}

/* Add a new work to the API and the DOM */
//TODO : QUESTION : prevent refresh ?
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
modalForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const modalData = new FormData();

	const title = document.getElementById("input-titre").value;
	const category = document.getElementById("input-categorie").value;
	modalData.append("title", title);
	modalData.append("category", category);

	const file = document.getElementById("input-image").files[0];
	modalData.append("image", file);
	await postWorks(modalData);
	// Reset the form after submission
	modalForm.reset();
});

// Activate the button when the user has filled all the fields
const modal2 = document.querySelector("#modal-2");
modal2.addEventListener("input", function () {
	const button = document.getElementById("modal-validate-add-picture");
	const inputTitle = document.getElementById("input-titre");
	const inputCategory = document.getElementById("input-categorie");
	const inputImage = document.getElementById("input-image");

	function updateDataActive() {
		let hasValues = false;

		if (
			inputTitle.value.trim() !== "" &&
			inputCategory.value.trim() !== "" &&
			inputImage.files.length > 0
		) {
			hasValues = true;
		}

		if (hasValues) {
			button.dataset.active = "true";
		} else {
			button.dataset.active = "false";
		}
	}
	inputTitle.addEventListener("input", updateDataActive);
	inputCategory.addEventListener("input", updateDataActive);
	inputImage.addEventListener("change", updateDataActive);
});

const buttonPublish = document.getElementById("button-publish");
buttonPublish.addEventListener("click", (event) => {
	event.preventDefault();
	window.location.reload();
});

// Update le preview de l'image dans la modale
const noPreview = document.querySelector(".no-preview");
const preview = document.querySelector(".preview");
const imageInput = document.getElementById("input-image");
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
