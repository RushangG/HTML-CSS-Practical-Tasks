const url = "https://dummyjson.com/quotes/random";
const quoteBox = document.getElementById("quote-box-id");

const updateButton = document.getElementById("update-button");

async function getDailyQuotes() {

    try {
        const res = await fetch(url);

        if (!res.ok) {

            throw new Error(`HTTP error status: ${res.status}`);
        }

        const data = await res.json();

        // console.log(data);

        const quote = data.quote;
        const author = data.author;

        // console.log(quote);

        quoteBox.innerHTML = `
           <span style="font-weight:bold"> ${quote}  </span> <br><br>   Author : ${author} 
            `;

    }

    catch (error) {
        quoteBox.innerHTML = `${error}`;
        quoteBox.style.color = 'red';
        console.error(error);
    }


}

// using promise .then .catch
//  function getDailyQuotes(){
//   const promise =  fetch(url);
//   console.log(promise);
//    promise.then( res => {
//     if(!res.ok){
//         throw new Error(`${res.status}`);     
//     }
//     return res.json();
//    })
//    .then(data => {
//      console.log(data);
//     const quote = data.quote;
//     const author = data.author;
//     console.log(quote);
//    quoteBox.innerHTML = `
//    <span style="font-weight:bold"> ${quote}  </span> <br><br>   Author : ${author} 
//     `;
//     }
//    )
//    .catch(error=> {
//         console.error(error);
//     });
// }


document.addEventListener("DOMContentLoaded", getDailyQuotes);

updateButton.addEventListener("click", getDailyQuotes);