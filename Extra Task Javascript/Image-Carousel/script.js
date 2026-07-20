// images array;
const images = [
    {

        imgSrc: "https://www.w3schools.com/howto/img_nature_wide.jpg",

    },
    {

        imgSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    },
    {

        imgSrc: "https://www.w3schools.com/howto/img_mountains_wide.jpg"
    },
    {

        imgSrc: "https://www.highreshdwallpapers.com/wp-content/uploads/2013/08/Lion-Space-Wallpaper1-1920x1080.jpg"
    },
    {

        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2OZzO2FFFIKDGyYnV4hgWJ5-bhdNZ4Fo-EQGfWCKH3A&s=10"
    }
];

const imageBox = document.getElementById("image-box");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const indexNumber = document.getElementById("index-number");

nextButton.addEventListener("click", nextImg);
prevButton.addEventListener("click", prevImg);
let i = 0;


let timeId = null;

// set Timer
function setTimer() {


    timeId = setInterval(() => {
        // console.log("time 4 second");
        nextImg();
    }, 4000);

}

//cancel Timer when click next 
function cancelTimer() {
    clearInterval(timeId);
    timeId = null;
}


// show image
async function imageChange() {

    imageBox.innerHTML = `<img src="${images[i].imgSrc}" alt="NotFound">`;
    indexNumber.innerHTML = ` ${i + 1} / ${images.length}`;


}

// next img
async function nextImg() {
    if (i >= images.length - 1) {
        i = 0;
    } else {
        i++;
    }


    //    console.log(i);
    cancelTimer();
    setTimer();
    await imageChange();
}

// prev img
async function prevImg() {
    if (i <= 0) {
        i = images.length - 1;

    }
    else {
        i--;
    }
    // console.log(i);

    cancelTimer();
    setTimer();
    await imageChange();
}



// DOM Loaded..
document.addEventListener("DOMContentLoaded", () => {
    imageChange();
    setTimer();
});




