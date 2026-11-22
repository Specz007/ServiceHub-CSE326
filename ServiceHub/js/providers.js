// 1. Starter providers (everyone on any device will see these automatically)
var defaultProviders = [
    {
        name: "Rajesh Sharma",
        category: "Plumbing",
        email: "rajesh.plumbing@gmail.com",
        phone: "9876543210"
    },
    {
        name: "Vikram Verma",
        category: "Electrical Services",
        email: "vikram.electric@gmail.com",
        phone: "9812345678"
    },
    {
        name: "Ankit Patel",
        category: "Home Maintenance",
        email: "ankit.repairs@gmail.com",
        phone: "9988776655"
    },
    {
        name: "Dr. Priya Nair",
        category: "Healthcare",
        email: "priya.clinic@gmail.com",
        phone: "9123456780"
    },
    {
        name: "Suresh Academy",
        category: "Education",
        email: "suresh.tutors@gmail.com",
        phone: "9001122334"
    }
];

// 2. Load saved data from browser storage, OR use the starter data if empty


var providers = JSON.parse(localStorage.getItem("providersList")) || defaultProviders;

// 3. Function to put all data into the HTML table
function showProviders() {
    var tableBody = document.getElementById("provider-list");
    tableBody.innerHTML = "";

    for (var i = 0; i < providers.length; i++) {
        tableBody.innerHTML +=
            "<tr>" +
                "<td>" + providers[i].name + "</td>" +
                "<td>" + providers[i].category + "</td>" +
                "<td>" + providers[i].email + "</td>" +
                "<td>" + providers[i].phone + "</td>" +
                "<td><button class='call-btn' onclick='callProvider(" + i + ")'>📞 Call</button></td>" +
            "</tr>";
    }
}

// 5. Function to pop up the provider's phone number
function callProvider(index) {
    var p = providers[index];
    alert("Contact " + p.name + "\nPhone Number: " + p.phone);
}

// 4. Function to add a new provider from the form
function addProvider(event) {
    event.preventDefault();

    var name = document.getElementById("provider-name").value;
    var category = document.getElementById("provider-category").value;
    var email = document.getElementById("provider-email").value;
    var phone = document.getElementById("provider-phone").value;

    if (name === "" || category === "" || email === "" || phone === "") {
        alert("Please fill in all the fields!");
        return;
    }

    // Create a new object and add it to the list
    var newProvider = {
        name: name,
        category: category,
        email: email,
        phone: phone
    };

    providers.push(newProvider);

    // Save the updated list to browser storage
    localStorage.setItem("providersData", JSON.stringify(providers));

    // Refresh the table and clear the form
    showProviders();
    document.getElementById("provider-name").value = "";
    document.getElementById("provider-category").value = "";
    document.getElementById("provider-email").value = "";
    document.getElementById("provider-phone").value = "";
    document.getElementById("provider-description").value = "";
}

// 5. Function to delete a provider by its position (index)
function deleteProvider(index) {
    providers.splice(index, 1); // Remove 1 item at that index
    localStorage.setItem("providersData", JSON.stringify(providers)); // Save again
    showProviders(); // Refresh the table
}

// 6. Run this automatically as soon as the page loads
showProviders();