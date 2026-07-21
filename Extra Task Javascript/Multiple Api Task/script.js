const apis = [
    { albumApi: "https://jsonplaceholder.typicode.com/albums?_limit=20" },
    { todoApi: "https://jsonplaceholder.typicode.com/todos?_limit=20" },
    { postApi: "https://jsonplaceholder.typicode.com/posts?_limit=20" }

];

const displayData = document.getElementById("display-data");

//script that fetches data 
async function getData() {

    Promise.all([
        fetch(apis[0].albumApi),
        fetch(apis[1].todoApi),
        fetch(apis[2].postApi)
    ])
        .then(
            res => {
                console.log(res);
                const allStatus = res.map(r => r.ok);
                //    console.log(allStatus);
                //    console.log(allStatus.includes(false));

                if (allStatus.includes(false)) {
                    throw new Error("One or more requests failed");
                }

                res = Promise.all(res.map(r => r.json()));
                return res;
            }
        )
        .then(
            data => {
                console.log(data);

                const [albums, todos, posts] = data;
                //   console.log(albums);
                //   console.log(todos);
                //   console.log(posts);

                const allData = {
                    albums: albums,
                    todos: todos,
                    posts: posts
                }
                console.log(allData);
                ShowData(allData);

            }
        )
        .catch(
            err => {
                console.log(err);
                ErrorMessage();
            }
        )


}

async function ShowData(allData) {

    // console.log(allData);
    displayData.innerHTML = '';

    for (let i = 0; i < allData.albums.length; i++) {

        displayData.innerHTML += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${allData.albums[i].title}</td>
                            <td>${allData.todos[i].title}</td>
                            <td>${allData.posts[i].title} <br> ${allData.posts[i].body}</td>
                        </tr>
                `
    }
}

async function ErrorMessage() {
    displayData.innerHTML = '';
    displayData.innerHTML = `
                <tr>
                    <td colspan="4">No data available</td>
                </tr>
            `
}

document.addEventListener("DOMContentLoaded", () => {
    getData();
    ErrorMessage();
});
