//default gallery image array.
let galleryImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/060/117/855/small/red-rose-is-the-main-focus-of-the-image-with-a-blue-background-and-a-few-other-flowers-in-the-background-the-rose-is-the-most-prominent-and-beautiful-flower-in-the-picture-photo.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYG2_uXFz7i0wGGey5YQqChon5LzImvMEl5C9nU2Nirg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqqE3Dlxgtb7jEprVscJp3ct2FEJyAPPCejfU1SrSXA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7wyb5waXZf-LnxlYOqajAQ42vyC07isV4TgwWa_zeA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bny6poWo43RL0Nf0-9AuM8yOlqGrvkYsf9zJP_8KSQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoq3h17gZAwUBn18rc9RqB88mgCySlEbnAlF_0F9NOxQ&s=10"
];




const uploadButton = document.getElementById('upload-image');
const imageUrlInput = document.getElementById('image-url');
const galleryContainer = document.querySelector('.gallery-container');
const urlForm = document.getElementById('image-form');
const imageModel = document.getElementById('image-model');
const modelContent = document.getElementById('model-contex');
const closeButton = document.querySelector('.close');

const deleteButton = document.getElementById('delete-img');

const imgDelete = document.querySelectorAll('.delete');


// set url in local storage.
async function setImgInLocalStorage() {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
}

// get url from local storage.
async function getImgFromLocalStorage() {
    const storedImages = JSON.parse(localStorage.getItem('galleryImages'));
    // console.log('Stored Images:', storedImages);
    if (storedImages) {
        galleryImages = storedImages;
    }

}

// render gallery images.
async function renderGallery() {
    galleryContainer.innerHTML = '';
    galleryImages.forEach(url => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('gallery-img');
        imgDiv.innerHTML = `
                    <span class="delete">&times;</span>
                    <img src="${url}" alt="Image Not Found">
                `;
        galleryContainer.appendChild(imgDiv);
    });
}


// upload image to local storage.
async function uploadImage() {
    const imageUrl = imageUrlInput.value.trim();

    if (imageUrl === '') {
        alert('Please enter a valid image URL.');
        return;
    }

    // basci url validation.
    if (!/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(imageUrl)) {
        alert('Please enter a valid image URL.');
        return;
    }

    imageUrlInput.value = '';

    galleryImages.push(imageUrl);  // push new image in array.

    await setImgInLocalStorage();
    await renderGallery();


}

// set image in model.
async function setImgInModel(url) {
    imageModel.style.display = 'flex';
    modelContent.innerHTML = `<img src="${url}" alt="Image Not Found" style="width: 100%;">`;
}

// close model.
async function closeModel() {
    imageModel.style.display = 'none';
}

//delete image from gallery and local storage.
async function deleteImage(url) {


    if (!confirm('Are you sure you want to delete this image?')) {
        return;
    }

    if (url) {

        let imageIndex = galleryImages.findIndex(galleryUrl => galleryUrl === url);
        if (imageIndex !== -1) {
            galleryImages.splice(imageIndex, 1);
        }
        else {
            alert('Image not found in gallery.');
        }
        await setImgInLocalStorage();
        await closeModel();
        await renderGallery();

    }


}


urlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    uploadImage();
});



closeButton.addEventListener('click', () => {
    closeModel();
});

deleteButton.addEventListener('click', () => {
    deleteImage(modelContent.querySelector('img').src);
});

document.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target === imageModel) {
        closeModel();
    }
});

galleryContainer.addEventListener('click', (e) => {

    //     console.log(e.target);
    //     console.log(e.target.tagName);
    //    console.log(e.target.classList);
    if (e.target.tagName === 'IMG') {
        setImgInModel(e.target.src);
    }

    if (e.target.classList.contains('delete')) {
        const imgToDelete = e.target.nextElementSibling;

        const imgSrc = imgToDelete.src;
        deleteImage(imgSrc);

    }

})


//dom loaded event listener.
document.addEventListener('DOMContentLoaded', async () => {
    await getImgFromLocalStorage();
    await renderGallery();
})
