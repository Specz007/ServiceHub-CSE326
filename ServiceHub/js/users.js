var defaultUsers = [
    { id: "U101", name: "Aarav Mehta", email: "aarav@gmail.com", role: "Customer" },
    { id: "U102", name: "Sneha Kapoor", email: "sneha@gmail.com", role: "Customer" },
    { id: "U103", name: "Rohan Singh", email: "admin@servicehub.com", role: "Administrator" }
];

var users = JSON.parse(localStorage.getItem("usersList")) || defaultUsers;

function showUsers() {
    var tableBody = document.getElementById("user-list");
    tableBody.innerHTML = "";

    for (var i = 0; i < users.length; i++) {
        var actionCell = (users[i].role === "Administrator")
            ? "—"
            : "<button onclick='removeUser(" + i + ")'>Remove</button>";

        tableBody.innerHTML +=
            "<tr>" +
                "<td>" + users[i].id + "</td>" +
                "<td>" + users[i].name + "</td>" +
                "<td>" + users[i].email + "</td>" +
                "<td>" + users[i].role + "</td>" +
                "<td>" + actionCell + "</td>" +
            "</tr>";
    }
}

function removeUser(index) {
    users.splice(index, 1);
    localStorage.setItem("usersList", JSON.stringify(users));
    showUsers();
}

showUsers();