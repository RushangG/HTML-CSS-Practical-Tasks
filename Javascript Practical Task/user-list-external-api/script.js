const apiUrl = 'https://jsonplaceholder.typicode.com/users';

async function fetchUserData() {
    try {

        await notFound();
        const res = await fetch(apiUrl);
        if (!res.ok) {

            throw new Error(`HTTP error status: ${res.status}`);

        }
        const data = await res.json();

        await showUserData(data);

        return data;

    }
    catch (error) {
        console.error('Error (fetching user data) :', error);
    }
}

async function showUserData(users) {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td> 
                <td>${user.address.suite} , ${user.address.street} , ${user.address.city}, ${user.address.zipcode}</td>
                 `;
        tableBody.appendChild(row);
    });
}

async function notFound() {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';

    const row = document.createElement('tr');
    row.innerHTML = `
            <td colspan="4" style="text-align: center;"> User not found </td>
            `;

    tableBody.appendChild(row);
}

async function searchUser() {
    const searchBox = document.getElementById('search-box');
    const term = searchBox.value.toLowerCase();

    if (term.trim() == '') {
        await fetchUserData();
        const messageElement = document.querySelector('.message');
        messageElement.textContent = 'enter a valid search term';
        messageElement.style.color = 'red';
        messageElement.style.fontSize = '16px';

        setTimeout(() => {
            document.querySelector('.message').textContent = '';
        }, 2000);
        return;
    }

    const users = await fetchUserData();

    const filterUsers = users.filter(user => {
        return user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
    }
    );

    if (filterUsers.length > 0) {
        await showUserData(filterUsers);
    } else {
        await notFound();
    }
}


const searchButton = document.getElementById('search-button');
const searchBox = document.getElementById('search-box');
searchBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchUser();
    }
});
searchButton.addEventListener('click', searchUser);

document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
});

